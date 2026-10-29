import { FiHeart, FiX } from "react-icons/fi";
import { type LikesUserType } from "../../Types/LikesUserType.type";

type LikesDialogProps = {
  likes: LikesUserType[];
  likesCount: number;
  onClose: () => void;
};

export default function LikesDialog({
  likes,
  likesCount,
  onClose,
}: LikesDialogProps) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 grid place-items-center bg-canvas/60 p-4 backdrop-blur-md"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="likes-title"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[80vh] w-full max-w-sm flex-col overflow-hidden rounded-3xl border border-line bg-surface"
      >
        {/* ───────── Header ───────── */}
        <header className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-5">
          <div className="flex items-baseline gap-2">
            <h2 id="likes-title" className="text-base font-semibold text-ink">
              Likes
            </h2>
            <span className="text-sm text-mute">{likesCount}</span>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="grid size-9 place-items-center rounded-full text-mute transition hover:bg-raised hover:text-ink focus:outline-none focus:ring-4 focus:ring-clay/30"
          >
            <FiX className="size-5" />
          </button>
        </header>

        {/* ───────── List — the only part that scrolls ───────── */}
        <div className="min-h-0 flex-1 overflow-y-auto p-2">
          {likes.length === 0 ? (
            <div className="px-6 py-10 text-center">
              <div className="mx-auto grid size-14 place-items-center rounded-[48%_52%_45%_55%] bg-sage/20 text-sage">
                <FiHeart className="size-6" />
              </div>
              <p className="mt-4 text-sm font-medium text-ink">No likes yet</p>
              <p className="mt-1 text-sm text-mute">
                Be the first to like this post.
              </p>
            </div>
          ) : (
            <ul>
              {likes.map((like) => (
                <li
                  key={like._id}
                  className="flex items-center gap-3 rounded-2xl px-3 py-2 transition hover:bg-raised"
                >
                  <img
                    src={like.photo}
                    alt=""
                    className="size-10 shrink-0 rounded-full bg-raised object-cover"
                  />
                  <span className="min-w-0 truncate text-sm font-medium text-ink">
                    {like.name}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
