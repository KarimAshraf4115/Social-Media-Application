import { FiWifiOff } from "react-icons/fi";

export default function Offline() {
  return (
    <main className="grid min-h-screen w-screen place-items-center bg-canvas px-4">
      <div
        role="status"
        aria-live="polite"
        className="w-full max-w-sm rounded-3xl border border-line bg-surface p-8 text-center sm:p-10"
      >
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-raised text-clay">
          <FiWifiOff className="size-7" />
        </div>

        <h1 className="mt-6 text-xl font-medium text-ink">You're offline</h1>
        <p className="mt-2 text-sm leading-relaxed text-mute">
          Check your connection. Social App will pick up right where you left
          off as soon as you're back online.
        </p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-line bg-canvas px-4 py-2 text-xs text-sage">
          <span className="size-2 animate-pulse rounded-full bg-clay" />
          Waiting for connection…
        </div>
      </div>
    </main>
  );
}