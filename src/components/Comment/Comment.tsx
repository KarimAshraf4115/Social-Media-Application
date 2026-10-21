import { FiEdit2, FiMoreHorizontal, FiTrash2 } from "react-icons/fi";
import type { CommentType } from "../../types/Comment.Type";
import { createdAtFormater } from "../../Utilities/utility";

const menuItem =
  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink transition hover:bg-raised";

export default function Comment({
  comment,
  showOptions = false,
}: {
  comment: CommentType;
  showOptions?: boolean;
}) {
  return (
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

          {/* Options menu (opens on focus, CSS only) */}
          {showOptions && (
            <div className="group relative shrink-0">
              <button
                type="button"
                aria-label="Comment options"
                className="grid size-8 place-items-center rounded-full text-mute transition hover:bg-raised hover:text-ink focus:outline-none focus:ring-4 focus:ring-clay/15"
              >
                <FiMoreHorizontal className="size-4.5" />
              </button>
              <div className="invisible absolute right-0 top-full z-10 mt-1 w-44 translate-y-1 rounded-2xl border border-line bg-canvas p-2 opacity-0 transition group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <button type="button" className={menuItem}>
                  <FiEdit2 className="text-mute" /> Edit
                </button>
                <button type="button" className={`${menuItem} text-clay`}>
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
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
  );
}
