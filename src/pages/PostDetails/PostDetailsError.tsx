// PostDetailsError.jsx
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export default function PostDetailsError({
  title = "This post wandered off",
  message = "We couldn't load this post. It may have been removed, or your connection dropped.",
  onRetry,
}: {
  title?: string;
  message?: string;
  onRetry: () => void;
}) {
  return (
    <main className="mx-auto w-full max-w-200 px-4 py-6 sm:px-6 sm:py-8 lg:max-w-6xl lg:py-6">
      <article
        role="alert"
        className="relative grid min-h-[60vh] place-items-center overflow-hidden rounded-3xl border-2 border-dashed border-clay/50 bg-surface px-6 py-16 text-center lg:min-h-[calc(100vh-3rem)]"
      >
        <Link
          to="/"
          aria-label="Back to feed"
          className="absolute left-3 top-3 grid size-9 place-items-center rounded-full bg-canvas/80 text-ink transition hover:bg-canvas"
        >
          <FiArrowLeft className="size-5" />
        </Link>

        {/* <div aria-hidden="true" className="pointer-events-none absolute inset-6 grid gap-6 opacity-10 lg:grid-cols-[1.15fr_1fr]"> */}
        {/* <div className="rounded-2xl bg-sage" />
          <div className="hidden space-y-3 lg:block">
            <div className="h-3 w-1/2 rounded-full bg-sage" />
            <div className="h-3 w-3/4 rounded-full bg-sage" />
            <div className="h-3 w-2/3 rounded-full bg-sage" />
          </div> */}
        {/* </div> */}

        <div className="relative">
          <div className="mx-auto grid size-20 place-items-center rounded-[48%_52%_45%_55%] bg-clay/20">
            <svg
              viewBox="0 0 24 24"
              className="size-9 text-clay"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9.5 14.5l-1 1a3.5 3.5 0 01-5-5l2-2a3.5 3.5 0 015 0" />
              <path d="M14.5 9.5l1-1a3.5 3.5 0 015 5l-2 2a3.5 3.5 0 01-5 0" />
              <path d="M8 8l-1.5-1.5M16 16l1.5 1.5" />
            </svg>
          </div>

          <h2 className="mt-6 text-xl font-semibold text-ink">{title}</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-mute">
            {message}
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onRetry}
              className="rounded-2xl bg-clay px-6 py-2.5 text-sm font-semibold text-canvas transition hover:bg-clay-hover focus:outline-none focus:ring-4 focus:ring-clay/30 active:scale-95"
            >
              Try again
            </button>
            <Link
              to="/"
              className="rounded-2xl border border-line px-6 py-2.5 text-sm font-medium text-ink transition hover:bg-raised"
            >
              Back to feed
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
