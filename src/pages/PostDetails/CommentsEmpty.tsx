import { FiMessageCircle } from "react-icons/fi";

export default function CommentsEmpty() {
  return (
    <div className="grid h-full min-h-48 place-items-center px-6 py-8 text-center">
      <div>
        <div className="mx-auto grid size-14 place-items-center rounded-[48%_52%_45%_55%] bg-sage/20 text-sage">
          <FiMessageCircle className="size-6" />
        </div>
        <p className="mt-4 text-sm font-medium text-ink">No comments yet</p>
        <p className="mt-1 text-sm text-mute">
          Be the first to start the conversation.
        </p>
      </div>
    </div>
  );
}