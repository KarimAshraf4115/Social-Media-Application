import { FiImage } from "react-icons/fi";
import Post from "../../components/Post/Post"; 
import axios from "axios";
import { useEffect, useState } from "react";
import type { PostType } from "../../types/Post.Type";
import HomeSkeleton from "./HomeSkeleton";
import HomeError from "./HomError";

export default function Home() {
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  function getAllPosts() {
    axios
      .get("https://route-posts.routemisr.com/posts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        console.log(res.data.data.posts);
        setAllPosts(res.data.data.posts);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  if (isLoading) {
    return (
      <>
        <main className="mx-auto w-full max-w-200 px-4 py-6 sm:px-6 sm:py-8">
          <HomeSkeleton />
        </main>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <main className="mx-auto w-full max-w-200 px-4 py-6 sm:px-6 sm:py-8">
          <HomeError
            title="The feed wandered off"
            message="We couldn't load your posts. Check your connection and try again."
            onRetry={() => {
              setIsLoading(true);
              setIsError(false);
              getAllPosts();
            }}
          />
        </main>
      </>
    );
  }

  return (
    <main className="mx-auto w-full max-w-200 px-4 py-6 sm:px-6 sm:py-8">
      <div className="flex flex-col gap-4">
        {/* Composer */}
        <div className="flex items-center gap-3 rounded-3xl border border-line bg-surface p-4">
          <div className="grid size-10 shrink-0 place-items-center rounded-full bg-sage font-medium text-canvas">
            U
          </div>
          <button
            type="button"
            className="min-w-0 flex-1 truncate rounded-2xl border border-line bg-raised px-4 py-3 text-left text-sm text-mute transition hover:border-mute focus:outline-none focus:ring-4 focus:ring-clay/15"
          >
            What's on your mind?
          </button>
          <button
            type="button"
            aria-label="Add photo"
            className="grid size-10 shrink-0 place-items-center rounded-full text-sage transition hover:bg-raised"
          >
            <FiImage className="size-5" />
          </button>
        </div>

        {/* Feed */}
        {isLoading
          ? "Loading..."
          : allPosts.map((post: PostType) => (
              <Post post={post} key={post.id} />
            ))}
      </div>
    </main>
  );
}
