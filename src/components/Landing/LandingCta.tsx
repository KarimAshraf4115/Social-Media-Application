import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function LandingCta() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-28 sm:px-6">
      <div className="reveal relative overflow-hidden rounded-[40px] border border-line bg-surface px-6 py-24 text-center">
        <div className="pointer-events-none absolute -bottom-28 -right-24 size-96 animate-drift rounded-full bg-clay/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 -top-28 size-80 animate-drift rounded-full bg-sage/15 blur-3xl [animation-delay:-6s] [animation-direction:reverse]" />

        <div className="relative">
          <h2 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
            Come say <span className="italic text-clay">hello.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-mute sm:text-lg">
            Your people are one account away. It is free to join and takes less
            than a minute.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/register"
              className="group flex animate-pulse-ring items-center gap-2.5 rounded-2xl bg-clay px-8 py-4 text-base font-bold text-canvas transition hover:-translate-y-0.5 hover:bg-clay-hover focus:outline-none focus:ring-4 focus:ring-clay/30 active:scale-95"
            >
              Create account
              <FiArrowRight className="transition group-hover:translate-x-1" />
            </Link>
            <Link
              to="/login"
              className="rounded-2xl border border-line px-8 py-4 text-base font-medium text-ink transition hover:-translate-y-0.5 hover:bg-raised"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
