const bar = "animate-pulse rounded-full bg-sage/20";
const blob = "animate-pulse bg-clay/25";

export default function ProfileSkeleton() {
  return (
    <main
      role="status"
      aria-busy="true"
      aria-live="polite"
      className="mx-auto w-full max-w-200 px-4 py-6 sm:px-6 sm:py-8 lg:max-w-6xl lg:py-6"
    >
      <span className="sr-only">Loading profile…</span>

      <section aria-hidden="true" className="overflow-hidden rounded-3xl border border-line bg-surface">
        <div className="h-32 animate-pulse bg-linear-to-br from-sage/20 to-clay/20 sm:h-40" />
        <div className="px-4 pb-4 sm:px-5">
          <div className="-mt-10 flex flex-wrap items-end justify-between gap-3">
            <div className="size-22 animate-pulse rounded-full border-4 border-surface bg-raised" />
            <div className="flex gap-2 pb-1.5">
              <div className={`h-9 w-32 rounded-2xl ${blob}`} />
              <div className={`h-9 w-28 rounded-2xl ${blob}`} />
            </div>
          </div>
          <div className={`mt-4 h-4 w-32 ${bar}`} />
          <div className={`mt-2.5 h-3 w-20 ${bar}`} />
        </div>
        <div className="grid grid-cols-3 divide-x divide-line border-t border-line">
          {[0, 1, 2].map((i) => (
            <div key={i} className="grid place-items-center gap-2 py-3.5">
              <div className={`h-3.5 w-6 ${bar}`} />
              <div className={`h-2.5 w-14 ${bar}`} />
            </div>
          ))}
        </div>
      </section>

      <div aria-hidden="true" className="mt-4 grid items-start gap-4 lg:grid-cols-[17rem_minmax(0,1fr)]">
        <div className="space-y-4 rounded-3xl border border-line bg-surface p-4">
          <div className={`h-3 w-16 ${bar}`} />
          {[36, 16, 28, 24].map((w, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`size-8 shrink-0 rounded-full ${blob}`} />
              <div className={`h-2.5 ${bar}`} style={{ width: `${w * 4}px` }} />
            </div>
          ))}
        </div>

        <div className="space-y-4 rounded-3xl border border-line bg-surface p-4">
          <div className="flex gap-2">
            <div className="h-8 w-18 animate-pulse rounded-2xl bg-canvas" />
            <div className="h-8 w-24 animate-pulse rounded-2xl bg-sage/15" />
          </div>
          <div className="h-24 animate-pulse rounded-2xl bg-linear-to-br from-sage/20 to-clay/20" />
          <div className={`h-2.5 w-2/3 ${bar}`} />
        </div>
      </div>
    </main>
  );
}