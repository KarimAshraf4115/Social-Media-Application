// HomeSkeleton.jsx
import { ComposerSkeleton, PostSkeleton } from "../../components/Post/PostSkeleton";

export default function HomeSkeleton() {
  return (
    <div role="status" aria-busy="true" aria-live="polite" className="space-y-5">
      <span className="sr-only">Loading your feed…</span>
      <ComposerSkeleton />
      <PostSkeleton delay="0ms" />
      <PostSkeleton withImage={false} delay="150ms" />
      <PostSkeleton delay="300ms" />
    </div>
  );
}