import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

function updateComment({
  postId,
  commentId,
  formData,
}: {
  postId: string;
  commentId: string;
  formData: FormData;
}) {
  return axios.put(
    `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    },
  );
}

export default function useUpdateComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateComment,
    onSuccess: (response, { postId }) => {
      toast.success(response.data.message);
      console.log(response);
      queryClient.invalidateQueries({ queryKey: ["getPostComments", postId] });
      queryClient.invalidateQueries({ queryKey: ["getPostDetails", postId] });
      queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
    },
    onError: (err) => {
      toast.error("Failed to Update post");
      console.log(err);
    },
    onSettled: () => {
      console.log("Update request finished");
    },
  });
}
