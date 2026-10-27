import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import {
  FiArrowLeft,
  FiChevronRight,
  FiHeart,
  FiMessageCircle,
  FiMoreHorizontal,
  FiShare2,
} from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import CommentCreation from "../../components/Comment/CommentCreation";
import { type LikesUserType } from "../../types/LikesUserType.type";
import { createdAtFormater } from "../../Utilities/utility";
import Comment from "./../../components/Comment/Comment";
import { type CommentType } from "./../../types/Comment.Type";
import LikesDialog from "./LikesDialog";
import PostDetailsError from "./PostDetailsError";
import PostDetailsSkeleton from "./PostDetailsSkeleton";
import { Helmet } from "react-helmet";

const actionBase =
  "flex items-center justify-center gap-2 rounded-2xl py-2 text-sm font-medium transition";
const actionIdle = "text-mute hover:bg-raised hover:text-ink";

export default function PostDetails() {
  const { id } = useParams();
  const [likesOpen, setLikesOpen] = useState(false);
  // post details
  function getPostDetails() {
    return axios.get(`https://route-posts.routemisr.com/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
  }
  // post comments
  function getPostComments() {
    return axios.get(`https://route-posts.routemisr.com/posts/${id}/comments`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
  }
  // post likes
  function getPostLikes() {
    return axios.get(`https://route-posts.routemisr.com/posts/${id}/likes`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    });
  }

  const {
    data: detailsData,
    isLoading: detailsLoading,
    isError: detailsError,
  } = useQuery({
    queryKey: ["getPostDetails", id],
    queryFn: getPostDetails,
  });

  const {
    data: commentsData,
    isLoading: commentsLoading,
    isError: commentsError,
  } = useQuery({
    queryKey: ["getPostComments", id],
    queryFn: getPostComments,
  });

  const {
    data: likesData,
    isLoading: likesLoading,
    isError: likesError,
  } = useQuery({
    queryKey: ["getPostLikes", id],
    queryFn: getPostLikes,
  });

  if (detailsLoading && commentsLoading && likesLoading) {
    return <PostDetailsSkeleton />;
  }

  if (detailsError || commentsError || likesError) {
    return <PostDetailsError onRetry={getPostDetails} />;
  }

  const {
    body,
    createdAt,
    image,
    commentsCount,
    likesCount,
    sharesCount,
    user,
  } = detailsData!.data.data.post;

  // console.log(commentsData?.data.data.comments);
  console.log(likesData?.data.data.likes);

  return (
    <main className="mx-auto w-full max-w-200 px-4 py-6 sm:px-6 sm:py-8 lg:max-w-6xl lg:py-6">
      <Helmet>
        <title>Post Details</title>
      </Helmet>
      <article
        className={`grid overflow-hidden rounded-3xl border border-line bg-surface lg:max-h-[calc(100vh-8rem)] lg:grid-rows-[minmax(0,1fr)] ${
          image ? "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]" : ""
        }`}
      >
        {/* ───────── Media pane ───────── */}
        {image && (
          <div className="relative flex items-center justify-center bg-canvas lg:min-h-112">
            <Link
              to="/"
              aria-label="Back to feed"
              className="absolute left-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-canvas/80 text-ink transition hover:bg-canvas"
            >
              <FiArrowLeft className="size-5" />
            </Link>
            <img
              src={image}
              alt="Post"
              className="max-h-[60vh] w-full object-cover lg:absolute lg:inset-0 lg:max-h-none lg:size-full"
            />
          </div>
        )}

        {/* ───────── Details pane ───────── */}
        <section
          className={`flex min-h-0 min-w-0 flex-col border-line ${
            image ? "border-t lg:border-l lg:border-t-0" : ""
          }`}
        >
          {/* Author */}
          <header className="flex items-center gap-3 px-4 pb-2 pt-4 sm:px-5">
            <img
              src={user.photo}
              className="grid size-10 shrink-0 place-items-center rounded-full bg-sage font-medium text-canvas"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-ink">
                {user.name}
              </p>
              <p className="text-xs text-mute">
                {createdAtFormater(createdAt)}
              </p>
            </div>
            <button
              type="button"
              aria-label="Post options"
              className="ml-auto grid size-9 shrink-0 place-items-center rounded-full text-mute transition hover:bg-raised hover:text-ink"
            >
              <FiMoreHorizontal className="size-5" />
            </button>
          </header>

          {/* Caption */}
          <p className="whitespace-pre-line wrap-break-words px-4 pb-3 text-[15px] leading-relaxed text-ink sm:px-5">
            {body}
          </p>

          {/* Likes summary → opens LikesDialog */}
          <div className="flex items-center justify-between border-t border-line px-4 py-2.5 sm:px-5">
            <button
              type="button"
              className="flex items-center gap-2 text-sm text-ink transition hover:text-clay"
              onClick={() => setLikesOpen(true)}
            >
              <span className="flex -space-x-1.5">
                {likesData?.data.data.likes
                  .slice(0, 3)
                  .map((like: LikesUserType) => (
                    <img
                      key={like._id}
                      src={like.photo}
                      alt={like.name}
                      className="size-6 shrink-0 rounded-full bg-raised object-cover ring-2 ring-surface"
                    />
                  ))}
              </span>
              {likesCount === 0
                ? "0 likes"
                : likesCount === 1
                  ? `${likesData?.data.data.likes[0].name} liked this post`
                  : `${likesData?.data.data.likes[0].name} and ${likesCount - 1} liked this post`}

              <FiChevronRight className="text-mute" />
            </button>
            <span className="text-sm text-mute">
              {commentsCount} comments · {sharesCount} shares
            </span>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-3 gap-1.5 border-t border-line px-4 py-1.5 sm:px-5">
            <button type="button" className={`${actionBase} ${actionIdle}`}>
              <FiHeart className="size-4.5" /> Like
            </button>
            <button type="button" className={`${actionBase} ${actionIdle}`}>
              <FiMessageCircle className="size-4.5" /> Comment
            </button>
            <button type="button" className={`${actionBase} ${actionIdle}`}>
              <FiShare2 className="size-4.5" /> Share
            </button>
          </div>

          {/* Comments — the only part that scrolls on desktop */}
          <div className="min-h-0 flex-1 space-y-4 border-t border-line p-4 scheme-dark sm:px-5 lg:overflow-y-auto">
            {commentsData?.data.data.comments.map((comment: CommentType) => (
              <Comment comment={comment} key={comment._id} />
            ))}
          </div>

          {/* Composer — pinned to the bottom */}
          <div className="border-t border-line px-4 py-3 sm:px-5">
            <CommentCreation
              postId={id!}
              refetchFn={["getPostComments", `${id}`]}
            />
          </div>
        </section>
      </article>

      {likesOpen && (
        <LikesDialog
          likes={likesData?.data.data.likes ?? []}
          likesCount={likesCount}
          onClose={() => setLikesOpen(false)}
        />
      )}
    </main>
  );
}
