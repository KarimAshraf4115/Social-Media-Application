import type { CommentType } from "../../types/Comment.Type";
import { createdAtFormater } from "../../Utilities/utility";

export default function Comment({ comment }: { comment: CommentType }) {
  return (
    <div className="flex items-start gap-2">
      {comment?.commentCreator.photo ? (
        <img
          src={comment?.commentCreator.photo}
          alt="top comment creator"
          className="grid size-8 shrink-0 place-items-center rounded-full bg-clay text-xs font-medium text-canvas"
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
        <div className="rounded-2xl bg-raised px-3 py-2">
          <p className="text-[13px] font-medium text-ink">
            {comment?.commentCreator.name}
          </p>
          <p className="mt-0.5 wrap-break-words text-sm leading-normal text-ink">
            {comment?.content}
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
          {" · "}
          {createdAtFormater(comment?.createdAt)}
        </p>
      </div>
    </div>
  );
}
