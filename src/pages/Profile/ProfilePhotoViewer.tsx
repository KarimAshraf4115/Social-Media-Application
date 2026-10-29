import { FiX } from "react-icons/fi";

type ProfilePhotoViewerProps = {
  photo: string;
  name: string;
  onClose: () => void;
};

export default function ProfilePhotoViewer({
  photo,
  name,
  onClose,
}: ProfilePhotoViewerProps) {
  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${name}'s profile picture`}
      className="fixed inset-0 z-50 grid place-items-center bg-canvas/85 p-4 backdrop-blur-md"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-surface text-ink transition hover:bg-raised focus:outline-none focus:ring-4 focus:ring-clay/30"
      >
        <FiX className="size-5" />
      </button>

      <img
        src={photo}
        alt={name}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[80vh] max-w-full rounded-3xl border border-line bg-surface object-contain"
      />
    </div>
  );
}