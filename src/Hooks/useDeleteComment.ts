import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

function deleteComment({
  postId,
  commentId,
}: {
  postId: string;
  commentId: string;
}) {
  return axios.delete(
    `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    },
  );
}

export default function useDeletePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (response, { postId }) => {
      toast.success(response.data.message);
      queryClient.invalidateQueries({ queryKey: ["getPostComments", postId] });
      queryClient.invalidateQueries({ queryKey: ["getPostDetails", postId] });
      queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
    },
    onError: () => toast.error("Failed to delete post"),
    onSettled: () => {
      console.log("Delete request finished");
    },
  });
}
