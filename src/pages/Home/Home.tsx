import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Post from "../../components/Post/Post";
import PostCreation from "../../components/Post/PostCreation";
import type { PostType } from "../../types/Post.Type";
import HomeError from "./HomeError";
import HomeSkeleton from "./HomeSkeleton";
import { Helmet } from "react-helmet";

export default function Home() {
  function getAllPosts() {
    return axios.get("https://route-posts.routemisr.com/posts", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
  }
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getAllPosts"],
    queryFn: getAllPosts,
    retry: 3,
    retryDelay: 2000,
    // staleTime : 1000,
    // refetchInterval : 1000,
    // gcTime : 1000,
    // enabled : true
  });

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Loading...</title>
        </Helmet>
        <main className="mx-auto w-full max-w-200 px-4 py-6 sm:px-6 sm:py-8">
          <HomeSkeleton />
        </main>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Helmet>
          <title>Error</title>
        </Helmet>
        <main className="mx-auto w-full max-w-200 px-4 py-6 sm:px-6 sm:py-8">
          <HomeError
            title="The feed wandered off"
            message="We couldn't load your posts. Check your connection and try again."
            onRetry={() => {
              getAllPosts();
            }}
          />
        </main>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <main className="mx-auto w-full max-w-200 px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-col gap-4">
          <PostCreation />

          {/* Feed */}
          {isLoading
            ? "Loading..."
            : data?.data.data.posts.map((post: PostType) => (
                <Post post={post} key={post.id} refetchFn={["getAllPosts"]} />
              ))}
        </div>
      </main>
    </>
  );
}
