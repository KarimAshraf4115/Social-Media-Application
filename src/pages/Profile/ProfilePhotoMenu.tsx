import { FiEye, FiUpload, FiX } from "react-icons/fi";

type ProfilePhotoMenuProps = {
  photo: string;
  name: string;
  onView: () => void;
  onEditDone: () => void; // called when "Edit" is chosen, so the menu can close
  onClose: () => void;
};

export default function ProfilePhotoMenu({
  photo,
  name,
  onView,
  onEditDone,
  onClose,
}: ProfilePhotoMenuProps) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 grid place-items-center bg-canvas/60 p-4 backdrop-blur-md"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="photo-menu-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xs overflow-hidden rounded-3xl border border-line bg-surface"
      >
        <header className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-5">
          <h2 id="photo-menu-title" className="text-base font-semibold text-ink">
            Profile picture
          </h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="grid size-9 place-items-center rounded-full text-mute transition hover:bg-raised hover:text-ink focus:outline-none focus:ring-4 focus:ring-clay/30"
          >
            <FiX className="size-5" />
          </button>
        </header>

        <div className="grid place-items-center pb-2 pt-5">
          <img
            src={photo}
            alt={name}
            className="size-24 rounded-full bg-raised object-cover"
          />
        </div>

        <div className="space-y-0.5 p-2">
          <button
            type="button"
            onClick={onView}
            className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm text-ink transition hover:bg-raised"
          >
            <span className="grid size-9 place-items-center rounded-full bg-sage/20 text-sage">
              <FiEye className="size-4.5" />
            </span>
            View profile picture
          </button>

          {/* A label for the hidden file input in ProfileContent */}
          <label
            htmlFor="profile-photo"
            onClick={onEditDone}
            className="flex w-full cursor-pointer items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-ink transition hover:bg-raised"
          >
            <span className="grid size-9 place-items-center rounded-full bg-clay/20 text-clay">
              <FiUpload className="size-4.5" />
            </span>
            Edit profile picture
          </label>
        </div>
      </div>
    </div>
  );
}