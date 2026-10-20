export default function HomeError({
  title = "The feed wandered off",
  message = "We couldn't load your posts. Check your connection and try again.",
  onRetry,
}: {
  title?: string;
  message?: string;
  onRetry: () => void;
}) {
  return (
    <div role="alert" className="space-y-5">
      {/* composer stays visible but dimmed, so the page still feels like Home */}
      <div
        aria-hidden="true"
        className="flex items-center gap-3 rounded-3xl border border-ink/10 bg-surface p-4 opacity-50"
      >
        <div className="h-11 w-11 shrink-0 rounded-[45%_55%_50%_50%] bg-clay/25" />
        <div className="h-11 flex-1 rounded-2xl bg-canavas" />
        <div className="h-11 w-20 rounded-2xl bg-clay/25" />
      </div>

      {/* the error card: a "missing post" drawn as a dashed outline */}
      <section className="relative overflow-hidden rounded-3xl border-2 border-dashed border-clay/50 bg-surface px-6 py-12 text-center">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-clay/20">
          <svg
            viewBox="0 0 24 24"
            className="h-9 w-9 text-clay"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9.5 14.5l-1 1a3.5 3.5 0 01-5-5l2-2a3.5 3.5 0 015 0" />
            <path d="M14.5 9.5l1-1a3.5 3.5 0 015 5l-2 2a3.5 3.5 0 01-5 0" />
            <path d="M12 3v2M12 19v2M4 12H2M22 12h-2" opacity="0" />
            <path d="M8 8l-1.5-1.5M16 16l1.5 1.5" />
          </svg>
        </div>

        <h2 className="mt-6 text-xl font-semibold text-ink">{title}</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ink/70">
          {message}
        </p>

        <button
          type="button"
          onClick={onRetry}
          className="mt-7 rounded-2xl bg-clay px-6 py-2.5 text-sm font-semibold text-canavas transition hover:bg-clay/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9DB38A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#262D25]"
        >
          Try again
        </button>
      </section>
    </div>
  );
}
