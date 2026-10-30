import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import type { PostType } from "../../Types/Post.Type";
import type { ProfileType } from "../../Types/Profile.Type";
import ProfileContent from "./ProfileContent";
import ProfileError from "./ProfileError";
import ProfileSkeleton from "./ProfileSkeleton";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function getMyProfile() {
    return axios.get(`https://route-posts.routemisr.com/users/profile-data`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
  }

  function getProfilePosts() {
    return axios.get(
      `https://route-posts.routemisr.com/users/${userId}/posts`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }

  function updatePassword(updatPasswordObject: {
    password: string;
    newPassword: string;
  }) {
    return axios.patch(
      `https://route-posts.routemisr.com/users/change-password`,
      updatPasswordObject,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          "Content-Type": "application/json",
        },
      },
    );
  }

  function uploadPhoto(formData: FormData) {
    return axios.put(
      `https://route-posts.routemisr.com/users/upload-photo`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }

  const {
    data: returnedProfileData,
    isLoading: loadingProfile,
    isError: errorProfile,
    refetch: refetchProfile,
  } = useQuery({
    queryKey: ["getMyProfile"],
    queryFn: getMyProfile,
  });

  const {
    data: returnedProfilePosts,
    isLoading: loadingProfilePosts,
    isError: errorProfilePosts,
    refetch: refetchProfilePosts,
  } = useQuery({
    queryKey: ["getProfilePosts"],
    queryFn: getProfilePosts,
  });

  const { mutate: passwordMutate, isPending: passwordPending } = useMutation({
    mutationFn: updatePassword,
    onSuccess: (res) => {
      toast.success(res.data.message);
      navigate("/login");
    },
    onError: (err) =>
      toast.error(
        axios.isAxiosError(err)
          ? err.response?.data.message
          : "Failed to change password",
      ),
  });

  const { mutate: photoMutate, isPending: photoPending } = useMutation({
    mutationFn: uploadPhoto,
    onSuccess: (res) => {
      toast.success(res.data.message);
      queryClient.invalidateQueries({ queryKey: ["getMyProfile"] });
      queryClient.invalidateQueries({ queryKey: ["getProfilePosts"] });
      queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
    },
    onError: () => toast.error("Failed to upload photo"),
  });
  function handlePhotoChange(file: File) {
    const formData = new FormData();
    formData.append("photo", file); // key name = photo
    photoMutate(formData);
  }

  const profileData: ProfileType = returnedProfileData?.data.data.user;
  const profilePosts: PostType[] = returnedProfilePosts?.data.data.posts;

  if (loadingProfile || loadingProfilePosts) return <ProfileSkeleton />;
  if (errorProfile || errorProfilePosts)
    return (
      <ProfileError
        onRetry={() => {
          refetchProfile();
          refetchProfilePosts();
        }}
      />
    );
  return (
    <ProfileContent
      user={profileData}
      posts={profilePosts}
      onChangePassword={(data, onDone) =>
        passwordMutate(data, { onSuccess: onDone })
      }
      isPasswordPending={passwordPending}
      onPhotoChange={handlePhotoChange}
      photoPending={photoPending}
      onCoverChange={() => {}}
    />
  );
}
