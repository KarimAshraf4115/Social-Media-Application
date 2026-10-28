import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiImage, FiLoader, FiSend, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
type CommentForm = { content: string; image: FileList };

export default function CommentCreation({
  postId,
  refetchFn,
}: {
  postId: string;
  refetchFn?: string[];
}) {
  const [previewUrl, setPreviewUrl] = useState(""); // Replace with actual preview URL if an image is selected

  const form = useForm<CommentForm>({
    defaultValues: {
      content: "",
    },
  });

  const query = useQueryClient();

  const { register, handleSubmit, reset, resetField } = form;
  const { onChange: imageOnChange, ...imageField } = register("image");
  function createComment(formData: FormData) {
    return axios.post(
      `https://route-posts.routemisr.com/posts/${postId}/comments`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }

  const { isPending, mutate } = useMutation({
    mutationFn: createComment,
    onSuccess: (data) => {
      console.log(data);
      query.invalidateQueries({ queryKey: refetchFn });
      reset();
      clearImage();
      toast.success(data.data.message);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to create comment. Please try again.");
    },
    onSettled: () => {
      console.log("Comment creation request completed");
    },
  });

  function handleCommentCreation({ content, image }: CommentForm) {
    const file = image?.[0];
    const text = content.trim();
    if (!text && !file) return;

    const formData = new FormData();
    if (file) formData.append("image", file);
    if (text) formData.append("content", text);
    mutate(formData);
  }

  function handleImagePreview(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
  }

  function clearImage() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl("");
    resetField("image"); // clears the form value and the file input
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleCommentCreation)}
        className=" flex items-end gap-2.5"
      >
        <div className="grid size-9 shrink-0 place-items-center rounded-full bg-sage text-sm font-medium text-canvas">
          K
        </div>

        <div className="min-w-0 flex-1 rounded-2xl border border-line bg-canvas p-2 transition focus-within:border-clay">
          {/* Image preview (render only when an image is picked) */}
          {previewUrl && (
            <div className="px-1.5 pb-2 pt-1">
              <div className="relative size-18">
                <img
                  src={previewUrl}
                  alt="Selected"
                  className="size-full rounded-xl border border-line object-cover"
                  onClick={() => {
                    clearImage();
                  }}
                />
                <button
                  type="button"
                  aria-label="Remove image"
                  className="absolute -right-1.5 -top-1.5 grid size-6 place-items-center rounded-full border-2 border-canvas bg-ink text-canvas transition hover:bg-clay"
                >
                  <FiX className="size-3.5" />
                </button>
              </div>
            </div>
          )}

          <textarea
            rows={1}
            placeholder="Write a comment…"
            className="block w-full resize-none bg-transparent px-2 py-1.5 text-sm text-ink placeholder:text-mute focus:outline-none"
            {...register("content")}
          />

          <div className="mt-1 flex items-center justify-between">
            <label
              aria-label="Add image"
              className="grid size-9 cursor-pointer place-items-center rounded-full text-mute transition hover:bg-raised hover:text-ink focus-within:ring-4 focus-within:ring-clay/15"
            >
              <FiImage className="size-5" />
              <input
                {...imageField}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => {
                  imageOnChange(e);
                  handleImagePreview(e);
                }}
              />
            </label>

            {/* idle state → swap bg-clay classes for: "bg-raised text-mute" */}
            <button
              type="submit"
              aria-label="Send comment"
              disabled={isPending}
              className="grid size-9 place-items-center rounded-full bg-clay text-canvas transition hover:bg-clay-hover disabled:cursor-wait disabled:bg-clay/70"
            >
              {isPending ? (
                <>
                  <FiLoader className="size-4.5 animate-spin" />{" "}
                </>
              ) : (
                <>
                  <FiSend className="size-4.5" />{" "}
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
