import { FiHeart, FiMessageCircle } from "react-icons/fi";

/* Decorative only: hidden from assistive tech. */
export default function HeroCollage() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto hidden h-[590px] w-full min-w-0 max-w-[540px] flex-[1_1_440px] sm:block"
    >
      {/* Post card */}
      <div className="absolute left-0 top-4 w-4/5 -rotate-3 animate-floaty rounded-3xl border border-line bg-surface p-[18px] [--r:-3deg]">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-sage text-sm font-bold text-canvas">
            M
          </span>
          <div>
            <p className="text-sm font-medium">Maya</p>
            <p className="text-xs text-mute">Just now</p>
          </div>
        </div>
        <p className="mt-3.5 text-[15px] leading-relaxed">
          Sunday market haul. Who wants the recipe?
        </p>
        <div className="mt-3.5 h-[150px] overflow-hidden rounded-2xl bg-gradient-to-br from-sage to-clay">
          <svg
            viewBox="0 0 300 150"
            preserveAspectRatio="none"
            className="size-full"
          >
            <circle cx="232" cy="42" r="22" fill="#e9e4d4" opacity=".85" />
            <path
              d="M0 150 L0 98 Q60 58 120 94 T300 78 L300 150 Z"
              fill="#1c211c"
              opacity=".32"
            />
            <path
              d="M0 150 L0 122 Q80 92 150 120 T300 110 L300 150 Z"
              fill="#1c211c"
              opacity=".55"
            />
          </svg>
        </div>
        <div className="mt-3.5 flex gap-5 text-[13px] text-mute">
          <span className="flex items-center gap-1.5">
            <FiHeart /> Like
          </span>
          <span className="flex items-center gap-1.5">
            <FiMessageCircle /> Comment
          </span>
        </div>
      </div>

      {/* Comments card */}
      <div className="absolute right-0 top-[330px] w-[78%] rotate-2 animate-floaty rounded-3xl border border-line bg-canvas p-4 [--r:2deg] [animation-delay:-3s] [animation-duration:9s]">
        <div className="flex items-start gap-2.5">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-clay text-xs font-bold text-canvas">
            O
          </span>
          <div className="rounded-2xl bg-raised px-3.5 py-2.5">
            <p className="text-[13px] font-medium">Omar</p>
            <p className="mt-0.5 text-sm leading-snug">Yes please, post it!</p>
          </div>
        </div>
        <div className="mt-3 flex items-start gap-2.5">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink text-xs font-bold text-canvas">
            S
          </span>
          <div className="flex items-center gap-1.5 rounded-2xl bg-raised px-4 py-4">
            {[0, 150, 300].map((delay) => (
              <span
                key={delay}
                style={{ animationDelay: `${delay}ms` }}
                className="size-[7px] animate-typing rounded-full bg-mute"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Like pill */}
      <div className="absolute left-[4%] top-[508px] flex -rotate-2 animate-floaty items-center gap-2.5 rounded-full border border-line bg-surface py-2.5 pl-3 pr-[18px] [--r:-2deg] [animation-delay:-5s]">
        <span className="grid size-[30px] animate-beat place-items-center rounded-full bg-clay/20 text-clay">
          <FiHeart className="size-4 fill-current" />
        </span>
        <span className="text-[13px] font-medium">Omar and others liked this</span>
      </div>
    </div>
  );
}
