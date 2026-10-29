import { useRef, useState } from "react";
import { FiImage, FiLoader, FiSave, FiX } from "react-icons/fi";
import useUpdatePost from "../../Hooks/useUpdatePost";
import type { PostType } from "../../Types/Post.Type";

type EditPostDialogProps = {
  post: PostType;
  onClose: () => void;
};

export default function EditPostDialog({ post, onClose }: EditPostDialogProps) {
  const { mutate: updateMutate, isPending: updatePending } = useUpdatePost();
  const [body, setBody] = useState(post.body ?? "");
  const [previewUrl, setPreviewUrl] = useState(post.image ?? "");
  const [newImage, setNewImage] = useState<File | null>(null);
  const imageInput = useRef<HTMLInputElement>(null);
  const [removeImage, setRemoveImage] = useState(false);


  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    setRemoveImage(false);
  }

  function handlePostEdit() {
    const form = new FormData();
    form.append("body", body);
    if (newImage) form.append("image", newImage);
    else if (removeImage) form.append("image", "");
    updateMutate({ postId: post._id, formData: form }, { onSuccess: onClose });
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 grid place-items-center bg-canvas/60 p-4 backdrop-blur-md"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-post-title"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-line bg-surface"
      >
        {/* ───────── Header ───────── */}
        <header className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-5">
          <h2
            id="edit-post-title"
            className="font-display text-lg font-bold tracking-tight text-ink"
          >
            Edit post
          </h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="grid size-9 place-items-center rounded-full text-mute transition hover:bg-raised hover:text-ink focus:outline-none focus:ring-4 focus:ring-clay/30"
          >
            <FiX className="size-5" />
          </button>
        </header>

        {/* ───────── Body — the only part that scrolls ───────── */}
        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4 sm:p-5">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            placeholder="What's on your mind?"
            className="block w-full resize-none rounded-2xl border border-line bg-canvas px-4 py-3 text-[15px] leading-relaxed text-ink transition placeholder:text-mute focus:border-clay focus:outline-none focus:ring-4 focus:ring-clay/15"
          />

          {/* Image preview (render only when the post has an image) */}
          {previewUrl && (
            <div className="relative overflow-hidden rounded-2xl border border-line">
              <img
                src={previewUrl}
                alt="Post attachment"
                className="max-h-72 w-full object-cover"
              />
              <button
                onClick={() => {
                  setPreviewUrl("");
                  setNewImage(null);
                  setRemoveImage(true);
                  if (imageInput.current) imageInput.current.value = "";
                }}
                type="button"
                aria-label="Remove image"
                className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-canvas/80 text-ink transition hover:bg-canvas"
              >
                <FiX className="size-4.5" />
              </button>
            </div>
          )}
        </div>

        {/* ───────── Footer ───────── */}
        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 sm:px-5">
          <label className="flex cursor-pointer items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium text-sage transition hover:bg-raised focus-within:ring-4 focus-within:ring-clay/15">
            <FiImage className="size-5" />
            Change photo
            <input
              onChange={handleImageChange}
              ref={imageInput}
              type="file"
              accept="image/*"
              className="sr-only"
            />
          </label>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-line px-5 py-2 text-sm font-medium text-ink transition hover:bg-raised"
            >
              Cancel
            </button>
            <button
              onClick={handlePostEdit}
              disabled={updatePending}
              type="button"
              className="flex items-center gap-2 rounded-2xl bg-clay px-5 py-2 text-sm font-medium text-canvas transition hover:bg-clay-hover focus:outline-none focus:ring-4 focus:ring-clay/30 disabled:cursor-wait disabled:bg-clay/70"
            >
              Save
              {/* while saving, swap FiSave for: <FiLoader className="size-4.5 animate-spin" /> */}
              {updatePending ? (
                <FiLoader className="size-4 animate-spin" />
              ) : (
                <FiSave className="size-4" />
              )}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
