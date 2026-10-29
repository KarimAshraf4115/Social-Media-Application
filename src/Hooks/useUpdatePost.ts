import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

function updatePost({
  postId,
  formData,
}: {
  postId: string;
  formData: FormData;
}) {
  return axios.put(
    `https://route-posts.routemisr.com/posts/${postId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    },
  );
}

export default function useUpdatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePost,
    onSuccess: (response , {postId}) => {
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
