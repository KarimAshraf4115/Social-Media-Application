// PostSkeleton.jsx
// Pure UI. No outer positioning, since Home owns the feed layout.
// Palette: #1C211C page · #262D25 card · #E9E4D4 cream · #D9825B clay · #9DB38A moss
const bar = "rounded-full bg-[#9DB38A]/20 animate-pulse";
const clay = "bg-[#D9825B]/25 animate-pulse";

export function PostSkeleton({ withImage = true, delay = "0ms" }) {
  const d = { animationDelay: delay };
  return (
    <article
      aria-hidden="true"
      className="rounded-3xl border border-[#E9E4D4]/10 bg-[#262D25] p-5"
    >
      {/* author row */}
      <div className="flex items-center gap-3">
        <div style={d} className={`h-11 w-11 rounded-[45%_55%_50%_50%] ${clay}`} />
        <div className="flex-1 space-y-2">
          <div style={d} className={`h-3 w-32 ${bar}`} />
          <div style={d} className={`h-2.5 w-20 ${bar} opacity-60`} />
        </div>
      </div>

      {/* caption (above image) */}
      <div className="mt-4 space-y-2">
        <div style={d} className={`h-3 w-full ${bar}`} />
        <div style={d} className={`h-3 w-4/5 ${bar}`} />
      </div>

      {/* optional image */}
      {withImage && (
        <div
          style={d}
          className="mt-4 h-56 w-full rounded-2xl bg-gradient-to-br from-[#9DB38A]/20 to-[#D9825B]/20 animate-pulse"
        />
      )}

      {/* like / comment / share */}
      <div className="mt-4 flex gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} style={d} className={`h-8 w-20 rounded-2xl ${clay}`} />
        ))}
      </div>

      {/* one top comment */}
      <div className="mt-4 flex items-start gap-2.5 rounded-2xl bg-[#1C211C] p-3">
        <div style={d} className={`h-7 w-7 shrink-0 rounded-[50%_45%_55%_50%] ${clay}`} />
        <div className="flex-1 space-y-2">
          <div style={d} className={`h-2.5 w-24 ${bar}`} />
          <div style={d} className={`h-2.5 w-3/4 ${bar}`} />
        </div>
      </div>
    </article>
  );
}

export function ComposerSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center gap-3 rounded-3xl border border-[#E9E4D4]/10 bg-[#262D25] p-4"
    >
      <div className={`h-11 w-11 shrink-0 rounded-[45%_55%_50%_50%] ${clay}`} />
      <div className="h-11 flex-1 rounded-2xl bg-[#1C211C] animate-pulse" />
      <div className={`h-11 w-20 rounded-2xl ${clay}`} />
    </div>
  );
}