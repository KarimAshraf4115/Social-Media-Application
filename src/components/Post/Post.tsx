import { useContext, useState } from "react";
import { FiHeart, FiMessageCircle, FiShare2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import type { PostType } from "../../Types/Post.Type";
import { createdAtFormater } from "../../Utilities/utility";
import Comment from "../Comment/Comment";
import CommentCreation from "../Comment/CommentCreation";
import OptionsMenu from "../OptionsMenu/OptionsMenu";
import useDeletePost from "../../Hooks/useDeletePost";
import EditPostDialog from "./EditingPostModal";
const actionBase =
  "flex items-center justify-center gap-2 rounded-2xl py-2 text-sm font-medium transition";
const actionIdle = "text-mute hover:bg-raised hover:text-ink";

export default function Post({
  post,
  refetchFn,
}: {
  post: PostType;
  refetchFn?: string[];
}) {
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
  const [editOpen, setEditOpen] = useState(false);
  const { mutate: deletePost, isPending } = useDeletePost();
  return (
    <>
      <article className="rounded-3xl border border-line bg-surface p-4 sm:p-5">
        {/* Author */}
        <header className="flex items-center justify-between gap-3">
          <div className="flex gap-3 items-center">
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
          </div>

          {userId === user._id && (
            <>
              <OptionsMenu
                ariaLabel="Post options"
                editLabel="Edit post"
                deleteLabel="Delete post"
                isDeleting={isPending}
                onEdit={() => setEditOpen(true)}
                onDelete={() => deletePost({postId:_id})}
              />
            </>
          )}
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
              <Comment postId={_id} comment={topComment} />
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

      {editOpen && (
        <EditPostDialog post={post} onClose={() => setEditOpen(false)} />
      )}
    </>
  );
}
