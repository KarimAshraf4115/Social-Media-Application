import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FiImage, FiLoader, FiSend, FiX } from "react-icons/fi";

export default function CommentCreation({
  postId,
  refetchFn,
}: {
  postId: string;
  refetchFn?: string[];
}) {
  const previewUrl = null; // Replace with actual preview URL if an image is selected

  const form = useForm({
    defaultValues: {
      content: "",
      image: "",
    },
  });

  const query = useQueryClient();

  const { register, handleSubmit, reset } = form;
  const formData = new FormData();
  function createComment() {
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
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: () => {
      console.log("Comment creation request completed");
    },
  });
  
  function handleCommentCreation(data: { content: string; image: string }) {
    console.log(data);
    if (data.content === "" && data.image === "") return;
    if (data.image) {
      formData.append("image", data.image[0]);
    }
    if (data.content) {
      formData.append("content", data.content);
    }

    mutate();
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
                {...register("image")}
                type="file"
                accept="image/*"
                className="sr-only"
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
