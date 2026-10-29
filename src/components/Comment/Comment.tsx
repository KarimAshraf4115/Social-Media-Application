import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import type { CommentType } from "../../Types/Comment.Type";
import { createdAtFormater } from "../../Utilities/utility";
import OptionsMenu from "../OptionsMenu/OptionsMenu";
import useDeleteComment from "../../Hooks/useDeleteComment";
import CommentEditModal from "./EditingCommentModal";

export default function Comment({
  postId,
  comment,
}: {
  postId: string;
  comment: CommentType;
  showOptions?: boolean;
}) {
  const [editOpen, setEditOpen] = useState(false);
  const { userId } = useContext(AuthContext);
  const { mutate: deleteComment, isPending } = useDeleteComment();
  const isOwner = userId === comment.commentCreator._id;
  return (
    <>
      <div className="flex items-start gap-2">
        {comment?.commentCreator.photo ? (
          <img
            src={comment?.commentCreator.photo}
            alt="top comment creator"
            className="grid size-8 shrink-0 place-items-center rounded-full bg-clay object-cover text-xs font-medium text-canvas"
          />
        ) : (
          <>
            {" "}
            <div className="grid size-8 shrink-0 place-items-center rounded-full bg-clay text-xs font-medium text-canvas">
              {comment?.commentCreator.name[0]}
            </div>
          </>
        )}

        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <div className="min-w-0 rounded-2xl bg-raised px-3 py-2">
              <p className="text-[13px] font-medium text-ink">
                {comment?.commentCreator.name}
              </p>
              <p className="mt-0.5 whitespace-pre-line wrap-break-words text-sm leading-normal text-ink">
                {comment?.content}
              </p>
            </div>

            {isOwner && (
              <OptionsMenu
                size="sm"
                ariaLabel="Comment options"
                editLabel="Edit"
                deleteLabel="Delete"
                isDeleting={isPending}
                onEdit={() => setEditOpen(true)}
                onDelete={() =>
                  deleteComment({ postId: postId, commentId: comment._id })
                }
              />
            )}
          </div>

          {/* Comment image (only when the comment has one) */}
          {comment?.image && (
            <div className="mt-1.5 max-w-50 overflow-hidden rounded-2xl border border-line">
              <img
                src={comment.image}
                alt="Comment attachment"
                className="w-full object-cover"
              />
            </div>
          )}

          <p className="ml-3 mt-1 text-xs text-mute">
            <button type="button" className="hover:text-ink">
              Like
            </button>
            {" · "}
            <button type="button" className="hover:text-ink">
              Reply
            </button>
            {" · "}
            {createdAtFormater(comment?.createdAt)}
          </p>
        </div>
      </div>

      {editOpen && (
        <CommentEditModal
          postId={postId}
          comment={comment}
          onClose={() => setEditOpen(false)}
        />
      )}
    </>
  );
}
