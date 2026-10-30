import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import type { PostType } from "../../Types/Post.Type";
import type { ProfileType } from "../../Types/Profile.Type";
import ProfileContent from "./ProfileContent";
import ProfileError from "./ProfileError";
import ProfileSkeleton from "./ProfileSkeleton";

export default function Profile() {
  const { userId } = useContext(AuthContext);

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

  const {
    mutate: passwordMutate,
    isPending: passwordPending,
    isError: passwordError,
  } = useMutation({
    mutationKey: ["updaPassword"],
    mutationFn: updatePassword,
  });

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
      onChangePassword={() => {}}
      onPhotoChange={() => {}}
      onCoverChange={() => {}}
    />
  );
}
