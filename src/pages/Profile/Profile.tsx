import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { ProfileType } from "../../Types/Profile.Type";
import ProfileContent from "./ProfileContent";
import ProfileError from "./ProfileError";
import ProfileSkeleton from "./ProfileSkeleton";

export default function Profile() {
  function getMyProfile() {
    return axios.get(`https://route-posts.routemisr.com/users/profile-data`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
  }

  

  const {
    data,
    isLoading: loadingProfile,
    isError: errorProfile,
    refetch: refetchProfile,
  } = useQuery({
    queryKey: ["getMyProfile"],
    queryFn: getMyProfile,
  });

  const profileData: ProfileType = data?.data.data.user;

  console.log(profileData);

  if (loadingProfile) return <ProfileSkeleton />;
  if (errorProfile) return <ProfileError onRetry={refetchProfile} />;
  return (
    <ProfileContent
      user={profileData}
      onPhotoChange={() => {}}
      onCoverChange={() => {}}
    />
  );
}
