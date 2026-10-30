import { useState, type ReactNode } from "react";
import { FiFeather } from "react-icons/fi";

export default function ProfilePosts({ children }: { children?: ReactNode }) {
  const [tab, setTab] = useState<"posts" | "bookmarks">("posts");

  return (
    <>
      <section className="overflow-hidden rounded-3xl border border-line bg-surface">
        <div role="tablist" className="flex gap-1 border-b border-line p-2">
          {(["posts", "bookmarks"] as const).map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`rounded-2xl px-3.5 py-1.5 text-sm font-medium capitalize transition ${
                tab === t
                  ? "bg-canvas text-ink"
                  : "text-mute hover:bg-raised hover:text-ink"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "posts" && children ? (
          <div className="space-y-4 p-4">{children}</div>
        ) : (
          <div className="px-6 py-10 text-center">
            <div className="mx-auto grid size-14 place-items-center rounded-[48%_52%_45%_55%] bg-sage/20 text-sage">
              <FiFeather className="size-6" />
            </div>
            <p className="mt-4 text-sm font-medium text-ink">
              {tab === "posts" ? "No posts yet" : "No bookmarks yet"}
            </p>
            <p className="mt-1 text-sm text-mute">
              {tab === "posts"
                ? "Posts you share will show up here."
                : "Posts you save will show up here."}
            </p>
          </div>
        )}
      </section>
    </>
  );
}
