import { useState } from "react";
import {
  FiCalendar,
  FiEdit2,
  FiLock,
  FiMail,
  FiUpload,
  FiUser,
} from "react-icons/fi";
import { LuCake } from "react-icons/lu";
import { type ProfileType } from "../../Types/Profile.Type";
import ProfilePhotoMenu from "./ProfilePhotoMenu";
import ProfilePhotoViewer from "./ProfilePhotoViewer";
import ProfilePosts from "./ProfilePosts";
import type { PostType } from "../../Types/Post.Type";
import Post from "../../components/Post/Post";

type ProfileContentProps = {
  user: ProfileType;
  posts: PostType[];
  onEditProfile?: () => void;
  onChangePassword?: () => void;
  onCoverChange?: (file: File) => void;
  onPhotoChange?: (file: File) => void;
};

const formatDate = (iso: string, withDay = false) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    ...(withDay && { day: "numeric" }),
  });

const iconBlob =
  "grid size-8 shrink-0 place-items-center rounded-full bg-sage/20 text-sage";

export default function ProfileContent({
  user,
  posts,
  onEditProfile,
  onChangePassword,
  onCoverChange,
  onPhotoChange,
}: ProfileContentProps) {
  const [photoDialog, setPhotoDialog] = useState<"menu" | "view" | null>(null);

  const stats = [
    { label: "Followers", value: user.followersCount },
    { label: "Following", value: user.followingCount },
    { label: "Bookmarks", value: user.bookmarksCount },
  ];

  const details = [
    {
      icon: <FiMail className="size-4" />,
      text: user.email,
      className: "truncate",
    },
    {
      icon: <FiUser className="size-4" />,
      text: user.gender,
      className: "capitalize",
    },
    {
      icon: <LuCake className="size-4" />,
      text: `Born ${formatDate(user.dateOfBirth, true)}`,
    },
    {
      icon: <FiCalendar className="size-4" />,
      text: `Joined ${formatDate(user.createdAt)}`,
    },
  ];

  return (
    <main className="mx-auto w-full max-w-200 px-4 py-6 sm:px-6 sm:py-8 lg:max-w-6xl lg:py-6">
      {/* ───────── Header card ───────── */}
      <section className="overflow-hidden rounded-3xl border border-line bg-surface">
        {/* Cover — overflow-hidden keeps the decorative blobs inside */}
        <div className="relative h-32 overflow-hidden bg-linear-to-br from-sage/35 to-clay/35 sm:h-40">
          {user.cover ? (
            <img src={user.cover} alt="" className="size-full object-cover" />
          ) : (
            <>
              <div className="absolute -top-10 right-8 size-32 rounded-[48%_52%_45%_55%] bg-clay/20" />
              <div className="absolute -bottom-6 right-36 size-20 rounded-[55%_45%_52%_48%] bg-sage/20" />
            </>
          )}
          <label
            htmlFor="profile-cover"
            aria-label="Upload cover photo"
            className="absolute bottom-3 right-3 grid size-9 cursor-pointer place-items-center rounded-full bg-canvas/80 text-ink transition hover:bg-canvas"
          >
            <FiUpload className="size-4.5" />
          </label>
          <input
            id="profile-cover"
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onCoverChange?.(file);
              e.target.value = "";
            }}
          />
        </div>

        <div className="px-4 pb-4 sm:px-5">
          <div className="-mt-10 flex flex-wrap items-end justify-between gap-3">
            <button
              type="button"
              aria-label="Profile picture options"
              onClick={() => setPhotoDialog("menu")}
              className="rounded-full focus:outline-none focus:ring-4 focus:ring-clay/30"
            >
              <img
                src={user.photo}
                alt={user.name}
                className="size-22 rounded-full border-4 border-surface bg-raised object-cover"
              />
            </button>

            <div className="flex flex-wrap gap-2 pb-1.5">
              <button
                type="button"
                onClick={onChangePassword}
                className="flex items-center gap-2 rounded-2xl border border-line px-3.5 py-2 text-sm font-medium text-ink transition hover:bg-raised"
              >
                <FiLock className="size-4" /> Change password
              </button>
              <button
                type="button"
                onClick={onEditProfile}
                className="flex items-center gap-2 rounded-2xl bg-clay px-3.5 py-2 text-sm font-semibold text-canvas transition hover:bg-clay-hover focus:outline-none focus:ring-4 focus:ring-clay/30 active:scale-95"
              >
                <FiEdit2 className="size-4" /> Edit profile
              </button>
            </div>
          </div>

          <h1 className="mt-3 text-xl font-semibold text-ink">{user.name}</h1>
          <p className="text-sm text-mute">@{user.username}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 divide-x divide-line border-t border-line">
          {stats.map((s) => (
            <div key={s.label} className="py-3 text-center">
              <p className="text-base font-semibold text-ink">{s.value}</p>
              <p className="text-xs text-mute">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────── Body ───────── */}
      <div className="mt-4 grid items-start gap-4 lg:grid-cols-[17rem_minmax(0,1fr)]">
        {/* Details */}
        <aside className="rounded-3xl border border-line bg-surface p-4">
          <h2 className="mb-3 text-sm font-semibold text-ink">Details</h2>
          <ul className="space-y-3">
            {details.map((d) => (
              <li
                key={d.text}
                className="flex items-center gap-3 text-sm text-ink"
              >
                <span className={iconBlob}>{d.icon}</span>
                <span className={`min-w-0 ${d.className ?? ""}`}>{d.text}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Posts / Bookmarks */}
        <ProfilePosts>
          {posts.map((post) => (
            <Post post={post} refetchFn={["getProfilePosts"]} />
          ))}
        </ProfilePosts>
      </div>

      {/* Hidden input for the profile picture — the menu's "Edit" row is a label for it */}
      <input
        id="profile-photo"
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onPhotoChange?.(file);
          e.target.value = "";
        }}
      />

      {photoDialog === "menu" && (
        <ProfilePhotoMenu
          photo={user.photo}
          name={user.name}
          onView={() => setPhotoDialog("view")}
          onEditDone={() => setPhotoDialog(null)}
          onClose={() => setPhotoDialog(null)}
        />
      )}
      {photoDialog === "view" && (
        <ProfilePhotoViewer
          photo={user.photo}
          name={user.name}
          onClose={() => setPhotoDialog(null)}
        />
      )}
    </main>
  );
}
