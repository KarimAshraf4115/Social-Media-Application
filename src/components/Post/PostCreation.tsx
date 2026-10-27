import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import { FiImage, FiLoader, FiSend, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
export default function PostCreation() {
  const [previewUrl, setPreviewUrl] = useState(""); // Replace with actual preview URL if an image is selected
  const bodyInput = useRef(null);
  const imageInput = useRef(null);
  const query = useQueryClient();
  const formData = new FormData();
  function createPost() {
    return axios.post(`https://route-posts.routemisr.com/posts`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
  }

  function clearInputs() {
    bodyInput.current.value = "";
    imageInput.current.value = "";
    setPreviewUrl("");
  }

  const { isPending, mutate } = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      console.log(data.data.message);
      toast.success(data.data.message);
      clearInputs();
      query.invalidateQueries({ queryKey: ["getAllPosts"] });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to create post. Please try again.");
    },
    onSettled: () => {
      console.log("Post creation request completed");
    },
  });

  function handlePostCreation() {
    if (!bodyInput.current.value && !imageInput.current.files[0]) return;
    if (imageInput.current.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }
    if (bodyInput.current.value) {
      formData.append("body", bodyInput.current.value);
    }

    mutate();
  }

  function handleImagePreview(e) {
    console.log(e?.target?.files[0]);
    const path = URL.createObjectURL(e?.target?.files[0]);
    setPreviewUrl(path);
  }

  return (
    <div className="rounded-3xl border border-line bg-surface p-4 sm:p-5">
      {/* Author + text */}
      <div className="flex gap-3">
        <div className="grid size-10 shrink-0 place-items-center rounded-full bg-sage font-medium text-canvas">
          U
        </div>
        <textarea
          ref={bodyInput}
          rows={1}
          placeholder="What's on your mind?"
          className="min-w-0 flex-1 resize-none rounded-2xl border border-line bg-canvas px-4 py-3 text-[15px] leading-relaxed text-ink transition placeholder:text-mute focus:border-clay focus:outline-none"
        />
      </div>

      {/* Image preview (render only when an image is picked) */}
      {previewUrl && (
        <div className="relative mt-3 overflow-hidden rounded-2xl border border-line">
          <img
            src={previewUrl}
            alt="Selected"
            className="max-h-80 w-full object-cover"
          />
          <button
            type="button"
            onClick={() => setPreviewUrl("")}
            aria-label="Remove image"
            className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-canvas/80 text-ink transition hover:bg-canvas"
          >
            <FiX className="size-4.5" />
          </button>
        </div>
      )}

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
        <label className="flex cursor-pointer items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium text-sage transition hover:bg-raised focus-within:ring-4 focus-within:ring-clay/15">
          <FiImage className="size-5" />
          Photo
          <input
            ref={imageInput}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handleImagePreview}
          />
        </label>

        <button
          disabled={isPending}
          type="submit"
          onClick={() => handlePostCreation()}
          className="flex items-center gap-2 rounded-2xl bg-clay px-5 py-2 text-sm font-medium text-canvas transition hover:bg-clay-hover disabled:cursor-wait disabled:bg-clay/70"
        >
          Post
          {isPending ? (
            <>
              <FiLoader className="size-4.5 animate-spin" />
            </>
          ) : (
            <>
              <FiSend className="size-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
