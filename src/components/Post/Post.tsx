import { useContext, useState } from "react";
import {
  FiEdit2,
  FiHeart,
  FiMessageCircle,
  FiMoreHorizontal,
  FiShare2,
  FiTrash2,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import type { PostType } from "../../types/Post.Type";
import { createdAtFormater } from "../../Utilities/utility";
import Comment from "../Comment/Comment";
import CommentCreation from "../Comment/CommentCreation";
const actionBase =
  "flex items-center justify-center gap-2 rounded-2xl py-2 text-sm font-medium transition";
const actionIdle = "text-mute hover:bg-raised hover:text-ink";
// liked state: swap actionIdle for → "bg-clay/10 text-clay hover:bg-clay/15"

const menuItem =
  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink transition hover:bg-raised";

export default function Post({
  post,
  refetchFn,
}: {
  post: PostType;
  refetchFn?: string[];
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const {
    body,
    image,
    user,
    createdAt,
    likesCount,
    commentsCount,
    topComment,
    _id,
  } = post;
  const { userId } = useContext(AuthContext);

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
          <p className="truncate text-sm font-medium text-ink">{user.name}</p>
          <p className="text-xs text-mute">{createdAtFormater(createdAt)}</p>
        </div>

        {/* Options menu (opens on focus, CSS only) */}
        <div className="group relative ml-auto shrink-0">
          {userId === user._id && (
            <>
              <button
                onClick={() => setMenuOpen(true)}
                type="button"
                aria-label="Post options"
                className="grid size-9 place-items-center rounded-full text-mute transition hover:bg-raised hover:text-ink focus:outline-none focus:ring-4 focus:ring-clay/15"
              >
                <FiMoreHorizontal className="size-5" />
              </button>
              <div
                className={`${menuOpen ? `` : `hidden`} absolute right-0 top-full z-10 mt-2 w-48 translate-y-1 rounded-2xl border border-line bg-canvas p-2 transition `}
              >
                <button type="button" className={menuItem}>
                  <FiEdit2 className="text-mute" /> Edit post
                </button>
                <button type="button" className={`${menuItem} text-clay`}>
                  <FiTrash2 /> Delete post
                </button>
              </div>
            </>
          )}
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
        <Link to={`/postDetails/${_id}`}>
          <div className={`${actionBase} ${actionIdle}`}>
            <FiMessageCircle className="size-4.5" /> {commentsCount}
          </div>
        </Link>
        <button type="button" className={`${actionBase} ${actionIdle}`}>
          <FiShare2 className="size-4.5" /> Share
        </button>
      </div>

      {/* Top comment */}
      <div className="mt-4">
        {topComment && (
          <>
            {" "}
            <p className="mb-2 px-0.5 text-xs text-sage">Top comment</p>
            <Comment comment={topComment} />
            {commentsCount >= 1 ? (
              <Link
                to={`/postDetails/${_id}`}
                className="mt-2.5 inline-block text-[13px] font-medium text-clay transition hover:text-clay-hover"
              >
                View all {commentsCount} comments
              </Link>
            ) : (
              <></>
            )}
          </>
        )}
      </div>

      {/* Comment composer */}
      <div className="mt-4">
        <CommentCreation postId={_id} refetchFn={refetchFn} />
      </div>
    </article>
  );
}
