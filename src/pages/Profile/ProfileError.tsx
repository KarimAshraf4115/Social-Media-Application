import { Link } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi";

type ProfileErrorProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

export default function ProfileError({
  title = "Couldn't load this profile",
  message = "Check your connection and try again.",
  onRetry,
}: ProfileErrorProps) {
  return (
    <main className="mx-auto w-full max-w-200 px-4 py-6 sm:px-6 sm:py-8 lg:max-w-6xl lg:py-6">
      <section
        role="alert"
        className="grid min-h-[60vh] place-items-center rounded-3xl border-2 border-dashed border-clay/50 bg-surface px-6 py-16 text-center"
      >
        <div>
          <div className="mx-auto grid size-20 place-items-center rounded-[48%_52%_45%_55%] bg-clay/20 text-clay">
            <FiAlertTriangle className="size-9" />
          </div>
          <h2 className="mt-6 text-xl font-semibold text-ink">{title}</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-mute">{message}</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onRetry}
              className="rounded-2xl bg-clay px-6 py-2.5 text-sm font-semibold text-canvas transition hover:bg-clay-hover focus:outline-none focus:ring-4 focus:ring-clay/30 active:scale-95"
            >
              Try again
            </button>
            <Link
              to="/"
              className="rounded-2xl border border-line px-6 py-2.5 text-sm font-medium text-ink transition hover:bg-raised"
            >
              Back to feed
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}