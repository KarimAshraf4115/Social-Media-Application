import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import HeroCollage from "./HeroCollage";

const avatars = [
  { letter: "M", tone: "bg-sage text-canvas" },
  { letter: "O", tone: "bg-clay text-canvas" },
  { letter: "S", tone: "bg-ink text-canvas" },
  { letter: "K", tone: "bg-raised text-ink" },
];

const rotatingWords = ["gather.", "laugh.", "connect.", "belong."];

export default function LandingHero() {
  return (
    <section className="mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-7xl flex-wrap items-center gap-12 px-4 py-16 sm:px-6">
      <div className="min-w-0 flex-[1_1_520px]">
        <div className="inline-flex animate-rise items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-sage [animation-delay:100ms]">
          <span className="size-2 animate-pulse-ring rounded-full bg-sage [--pulse:var(--color-sage)]" />
          Welcome to Social App
        </div>

        <h1 className="mt-7 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl xl:text-8xl">
          <span className="block animate-rise [animation-delay:250ms]">
            Where your
          </span>
          <span className="block animate-rise [animation-delay:400ms]">
            people{" "}
            {/* clipped window, 1 line tall; the inner stack slides up */}
            <span className="inline-block h-[1.2em] overflow-hidden align-top">
              <span className="block animate-words text-clay">
                {[...rotatingWords, rotatingWords[0]].map((word, i) => (
                  <span
                    key={i}
                    aria-hidden={i !== 0}
                    className="block h-[1.2em] italic leading-[1.2em]"
                  >
                    {word}
                  </span>
                ))}
              </span>
            </span>
          </span>
        </h1>

        <p className="mt-7 max-w-md animate-rise text-lg leading-relaxed text-mute [animation-delay:600ms]">
          Share a thought, start a conversation, and watch it grow into
          something bigger than a post.
        </p>

        <div className="mt-9 flex animate-rise flex-wrap items-center gap-3 [animation-delay:750ms]">
          <Link
            to="/register"
            className="group flex items-center gap-2.5 rounded-2xl bg-clay px-7 py-3.5 text-sm font-bold text-canvas transition hover:-translate-y-0.5 hover:bg-clay-hover focus:outline-none focus:ring-4 focus:ring-clay/30 active:scale-95"
          >
            Create your account
            <FiArrowRight className="transition group-hover:translate-x-1" />
          </Link>
          <a
            href="#how"
            className="rounded-2xl border border-line px-7 py-3.5 text-sm font-medium text-ink transition hover:-translate-y-0.5 hover:bg-raised"
          >
            See how it works
          </a>
        </div>

        <div className="mt-10 flex animate-rise items-center gap-3.5 [animation-delay:900ms]">
          <div className="flex">
            {avatars.map((a, i) => (
              <span
                key={a.letter}
                className={`grid size-9 place-items-center rounded-full border-[3px] border-canvas text-xs font-bold ${a.tone} ${i > 0 ? "-ml-2.5" : ""}`}
              >
                {a.letter}
              </span>
            ))}
          </div>
          <p className="max-w-[16rem] text-sm leading-snug text-mute">
            A friendly corner of the internet, built for conversation.
          </p>
        </div>
      </div>

      <HeroCollage />
    </section>
  );
}
