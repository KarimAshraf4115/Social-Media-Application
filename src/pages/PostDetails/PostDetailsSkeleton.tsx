// PostDetailsSkeleton.jsx
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const bar = "animate-pulse rounded-full bg-sage/20";
const blob = "animate-pulse bg-clay/25";

export default function PostDetailsSkeleton() {
  return (
    <main
      role="status"
      aria-busy="true"
      aria-live="polite"
      className="mx-auto w-full max-w-200 px-4 py-6 sm:px-6 sm:py-8 lg:max-w-6xl lg:py-6"
    >
      <span className="sr-only">Loading post…</span>

      <article className="grid overflow-hidden rounded-3xl border border-line bg-surface lg:h-[calc(100vh)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        {/* ───────── Media pane ───────── */}
        <div className="relative flex min-h-[40vh] items-center justify-center bg-canvas">
          <Link
            to="/"
            aria-label="Back to feed"
            className="absolute left-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-canvas/80 text-ink transition hover:bg-canvas"
          >
            <FiArrowLeft className="size-5" />
          </Link>
          <div
            aria-hidden="true"
            className="h-full max-h-[60vh] w-full animate-pulse bg-linear-to-br from-sage/20 to-clay/20 lg:max-h-full"
          />
        </div>

        {/* ───────── Details pane ───────── */}
        <section
          aria-hidden="true"
          className="flex min-h-0 min-w-0 flex-col border-t border-line lg:border-l lg:border-t-0"
        >
          {/* Author */}
          <header className="flex items-center gap-3 px-4 pb-2 pt-4 sm:px-5">
            <div className={`size-10 shrink-0 rounded-full ${blob}`} />
            <div className="space-y-2">
              <div className={`h-3 w-28 ${bar}`} />
              <div className={`h-2.5 w-16 ${bar} opacity-60`} />
            </div>
            <div className={`ml-auto size-9 shrink-0 rounded-full ${bar}`} />
          </header>

          {/* Caption */}
          <div className="space-y-2 px-4 pb-3 pt-1 sm:px-5">
            <div className={`h-3.5 w-full ${bar}`} />
            <div className={`h-3.5 w-3/5 ${bar}`} />
          </div>

          {/* Likes summary */}
          <div className="flex items-center justify-between border-t border-line px-4 py-3 sm:px-5">
            <div className="flex items-center gap-2">
              <span className="flex -space-x-1.5">
                <span
                  className={`size-6 rounded-full ring-2 ring-surface ${blob}`}
                />
                <span className="size-6 animate-pulse rounded-full bg-sage/30 ring-2 ring-surface" />
                <span className="size-6 animate-pulse rounded-full bg-ink/20 ring-2 ring-surface" />
              </span>
              <div className={`h-3 w-32 ${bar}`} />
            </div>
            <div className={`h-3 w-16 ${bar}`} />
          </div>

          {/* Actions */}
          <div className="grid grid-cols-3 gap-1.5 border-t border-line px-4 py-1.5 sm:px-5">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`h-10 rounded-2xl ${blob} opacity-70`} />
            ))}
          </div>

          {/* Comments */}
          <div className="min-h-0 flex-1 space-y-4 border-t border-line p-4 sm:px-5 lg:overflow-hidden">
            {[0, 150, 300].map((delay, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div
                  style={{ animationDelay: `${delay}ms` }}
                  className={`size-8 shrink-0 rounded-full ${blob}`}
                />
                <div className="flex-1 space-y-2 rounded-2xl bg-raised p-3">
                  <div
                    style={{ animationDelay: `${delay}ms` }}
                    className={`h-2.5 w-24 ${bar}`}
                  />
                  <div
                    style={{ animationDelay: `${delay}ms` }}
                    className={`h-2.5 w-4/5 ${bar}`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Composer */}
          <div className="border-t border-line bg-surface p-3 sm:px-5">
            <div className="flex items-center gap-2">
              <div className={`size-8 shrink-0 rounded-full ${blob}`} />
              <div className="h-10 flex-1 animate-pulse rounded-2xl border border-line bg-raised" />
              <div className={`size-10 shrink-0 rounded-full ${blob}`} />
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
