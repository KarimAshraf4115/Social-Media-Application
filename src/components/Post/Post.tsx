import {
  FiHeart,
  FiMessageCircle,
  FiMoreHorizontal,
  FiShare2,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import type { PostType } from "../../types/Post.Type";

const actionBase =
  "flex items-center justify-center gap-2 rounded-2xl py-2 text-sm font-medium transition";
const actionIdle = "text-mute hover:bg-raised hover:text-ink";
// liked state: swap actionIdle for → "bg-clay/10 text-clay hover:bg-clay/15"

const menuItem =
  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink transition hover:bg-raised";

export default function Post({ post }: { post: PostType }) {
  function createdAtFormater(time: string, now: Date = new Date()) {
    const createdAt = new Date(time);
    if (isNaN(createdAt.getTime())) return "";

    const diffMs = Math.max(0, now.getTime() - createdAt.getTime());
    const minutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(minutes / 60);

    if (minutes < 1) return "Just now";
    if (minutes < 60)
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    if (hours < 24) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;

    const startOfDay = (d: Date) =>
      new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const daysAgo = Math.round(
      (startOfDay(now) - startOfDay(createdAt)) / 86400000,
    );
    if (daysAgo === 1) return "Yesterday";

    return createdAt.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  const {body , image , user , createdAt , likesCount , commentsCount } = post;

  return (
    <article className="rounded-3xl border border-line bg-surface p-4 sm:p-5">
      {/* Author */}
      <header className="flex items-center gap-3">
        {user.photo ? (
          <img
            src={user.photo}
            alt="user photo"
            className="grid size-10 shrink-0 place-items-center rounded-full bg-sage font-medium text-canvas"
          />
        ) : (
          <div className="grid size-10 shrink-0 place-items-center rounded-full bg-sage font-medium text-canvas">
            {user.name[0]}
          </div>
        )}

        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-ink">
            {user.name}
          </p>
          <p className="text-xs text-mute">
            {createdAtFormater(createdAt)}
          </p>
        </div>

        {/* Options menu (opens on focus, CSS only) */}
        <div className="group relative ml-auto shrink-0">
          <button
            type="button"
            aria-label="Post options"
            className="grid size-9 place-items-center rounded-full text-mute transition hover:bg-raised hover:text-ink focus:outline-none focus:ring-4 focus:ring-clay/15"
          >
            <FiMoreHorizontal className="size-5" />
          </button>
          <div className="invisible absolute right-0 top-full z-10 mt-2 w-48 translate-y-1 rounded-2xl border border-line bg-canvas p-2 opacity-0 transition group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
            <button type="button" className={menuItem}>
              <FiEdit2 className="text-mute" /> Edit post
            </button>
            <button type="button" className={`${menuItem} text-clay`}>
              <FiTrash2 /> Delete post
            </button>
          </div>
        </div>
      </header>

      {/* Caption */}
      {body && (
        <p className="mt-3 whitespace-pre-line wrap-break-word text-[15px] leading-relaxed text-ink">
          {body}
        </p>
      )}

      {/* Image (render only when the post has one) */}
      {image && (
        <div className="mt-3 overflow-hidden rounded-2xl border border-line">
          <img
            src={image} // placeholder
            alt="Post"
            className="max-h-112 w-full object-cover"
          />
        </div>
      )}

      {/* Actions */}
      <div className="mt-4 grid grid-cols-3 gap-1.5 border-t border-line pt-2.5">
        <button type="button" className={`${actionBase} ${actionIdle}`}>
          <FiHeart className="size-4.5" /> {likesCount}
        </button>
        <button type="button" className={`${actionBase} ${actionIdle}`}>
          <FiMessageCircle className="size-4.5" /> {commentsCount}
        </button>
        <button type="button" className={`${actionBase} ${actionIdle}`}>
          <FiShare2 className="size-4.5" /> Share
        </button>
      </div>

      {/* Top comment */}
      <div className="mt-4">
        <p className="mb-2 px-0.5 text-xs text-sage">Top comment</p>
        <div className="flex items-start gap-2">
          <div className="grid size-8 shrink-0 place-items-center rounded-full bg-clay text-xs font-medium text-canvas">
            O
          </div>
          <div className="min-w-0">
            <div className="rounded-2xl bg-raised px-3 py-2">
              <p className="text-[13px] font-medium text-ink">Omar Hassan</p>
              <p className="mt-0.5 wrap-break-words text-sm leading-normal text-ink">
                That view is unreal. Which trail is this?
              </p>
            </div>
            <p className="ml-3 mt-1 text-xs text-mute">
              <button type="button" className="hover:text-ink">
                Like
              </button>
              {" · "}
              <button type="button" className="hover:text-ink">
                Reply
              </button>
              {" · "}1h
            </p>
          </div>
        </div>
        <Link
          to="/posts/1" // placeholder route
          className="mt-2.5 inline-block text-[13px] font-medium text-clay transition hover:text-clay-hover"
        >
          View all 8 comments
        </Link>
      </div>
    </article>
  );
}
