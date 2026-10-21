import {
  FiArrowLeft,
  FiChevronRight,
  FiHeart,
  FiImage,
  FiMessageCircle,
  FiMoreHorizontal,
  FiSend,
  FiShare2,
  FiX,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import Comment from './../../components/Comment/Comment';

const actionBase =
  "flex items-center justify-center gap-2 rounded-2xl py-2 text-sm font-medium transition";
const actionIdle = "text-mute hover:bg-raised hover:text-ink";

export default function PostDetails() {
  return (
    <main className="mx-auto w-full max-w-200 px-4 py-6 sm:px-6 sm:py-8 lg:max-w-6xl lg:py-6">
      <article className="grid overflow-hidden rounded-3xl border border-line bg-surface lg:h-[calc(100vh)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        {/* ───────── Media pane ───────── */}
        <div className="relative flex items-center justify-center bg-canvas">
          <Link
            to="/"
            aria-label="Back to feed"
            className="absolute left-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-canvas/80 text-ink transition hover:bg-canvas"
          >
            <FiArrowLeft className="size-5" />
          </Link>
          <img
            src="https://picsum.photos/1000/1200" // placeholder
            alt="Post"
            className="max-h-[60vh] w-full object-fill lg:h-full lg:max-h-full"
          />
        </div>

        {/* ───────── Details pane ───────── */}
        <section className="flex min-h-0 min-w-0 flex-col border-t border-line lg:border-l lg:border-t-0">
          {/* Author */}
          <header className="flex items-center gap-3 px-4 pb-2 pt-4 sm:px-5">
            <div className="grid size-10 shrink-0 place-items-center rounded-full bg-sage font-medium text-canvas">
              S
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-ink">
                Sara Ahmed
              </p>
              <p className="text-xs text-mute">2 hours ago</p>
            </div>
            <button
              type="button"
              aria-label="Post options"
              className="ml-auto grid size-9 shrink-0 place-items-center rounded-full text-mute transition hover:bg-raised hover:text-ink"
            >
              <FiMoreHorizontal className="size-5" />
            </button>
          </header>

          {/* Caption */}
          <p className="whitespace-pre-line wrap-break-words px-4 pb-3 text-[15px] leading-relaxed text-ink sm:px-5">
            Sunday hike up the ridge. Worth every step.
          </p>

          {/* Likes summary → opens LikesDialog */}
          <div className="flex items-center justify-between border-t border-line px-4 py-2.5 sm:px-5">
            <button
              type="button"
              className="flex items-center gap-2 text-sm text-ink transition hover:text-clay"
            >
              <span className="flex -space-x-1.5">
                <span className="grid size-6 place-items-center rounded-full bg-clay text-[11px] font-medium text-canvas ring-2 ring-surface">
                  O
                </span>
                <span className="grid size-6 place-items-center rounded-full bg-sage text-[11px] font-medium text-canvas ring-2 ring-surface">
                  M
                </span>
                <span className="grid size-6 place-items-center rounded-full bg-ink text-[11px] font-medium text-canvas ring-2 ring-surface">
                  A
                </span>
              </span>
              Omar and 23 others
              <FiChevronRight className="text-mute" />
            </button>
            <span className="text-sm text-mute">8 comments</span>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-3 gap-1.5 border-t border-line px-4 py-1.5 sm:px-5">
            <button type="button" className={`${actionBase} ${actionIdle}`}>
              <FiHeart className="size-4.5" /> Like
            </button>
            <button type="button" className={`${actionBase} ${actionIdle}`}>
              <FiMessageCircle className="size-4.5" /> Comment
            </button>
            <button type="button" className={`${actionBase} ${actionIdle}`}>
              <FiShare2 className="size-4.5" /> Share
            </button>
          </div>

          {/* Comments — the only part that scrolls on desktop */}
          <div className="min-h-0 flex-1 space-y-4 border-t border-line p-4 sm:px-5 lg:overflow-y-auto">
            <Comment />
            <Comment />
            <Comment />
          </div>

          {/* Composer — pinned to the bottom */}
          <form
            /* onSubmit={...} */
            className="sticky bottom-0 border-t border-line bg-surface p-3 sm:px-5 lg:static"
          >
            {/* Image preview — render only when an image is selected */}
            <div className="relative mb-3 ml-11 inline-block">
              <img
                src="https://picsum.photos/200" // placeholder
                alt="Selected"
                className="size-20 rounded-2xl border border-line object-cover"
              />
              <button
                type="button"
                aria-label="Remove image"
                className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full border border-line bg-canvas text-ink transition hover:bg-raised"
              >
                <FiX className="size-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="grid size-8 shrink-0 place-items-center rounded-full bg-sage text-sm font-medium text-canvas">
                K
              </div>

              <div className="relative min-w-0 flex-1">
                <input
                  type="text"
                  placeholder="Add a comment…"
                  className="w-full rounded-2xl border border-line bg-raised py-2.5 pl-4 pr-11 text-sm text-ink placeholder:text-mute transition focus:border-clay focus:outline-none focus:ring-4 focus:ring-clay/15"
                />
                <label
                  htmlFor="comment-image"
                  aria-label="Attach image"
                  className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 cursor-pointer place-items-center rounded-full text-sage transition hover:bg-surface hover:text-clay"
                >
                  <FiImage className="size-4.5" />
                </label>
                <input
                  id="comment-image"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                />
              </div>

              <button
                type="submit"
                aria-label="Send comment"
                className="grid size-10 shrink-0 place-items-center rounded-full bg-clay text-canvas transition hover:bg-clay-hover focus:outline-none focus:ring-4 focus:ring-clay/30 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <FiSend className="size-4.5" />
              </button>
            </div>
          </form>
        </section>
      </article>
    </main>
  );
}
