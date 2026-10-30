import { Helmet } from "react-helmet";
import {
  FiArrowRight,
  FiHeart,
  FiImage,
  FiMessageCircle,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const features = [
  {
    icon: <FiMessageCircle className="size-5" />,
    title: "Start conversations",
    text: "Share a thought and let people reply, react and build on it.",
    tone: "bg-clay/20 text-clay",
  },
  {
    icon: <FiImage className="size-5" />,
    title: "Post with photos",
    text: "Add an image to any post or comment to say it better.",
    tone: "bg-sage/20 text-sage",
  },
  {
    icon: <FiHeart className="size-5" />,
    title: "See what lands",
    text: "Likes and top comments show you what your people care about.",
    tone: "bg-clay/20 text-clay",
  },
];

export default function Landing() {
  return (
    <main className="mx-auto w-full">
      <Helmet>
        <title>Social App — Where your people gather</title>
      </Helmet>

      {/* Hero */}
      <section className="relative grid items-center gap-12 overflow-hidden py-16 sm:py-24 lg:grid-cols-2">
        <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-clay/10" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 size-72 rounded-full bg-sage/10" />

        <div className="relative">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-sage">
            Welcome to Social App
          </p>
          <h1 className="mt-4 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            Where your
            <br />
            people <span className="text-clay">gather.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-mute">
            Share a thought, start a conversation, and watch it grow into
            something bigger than a post.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/register"
              className="group flex items-center gap-2 rounded-2xl bg-clay px-6 py-3 text-sm font-bold text-canvas transition hover:bg-clay-hover focus:outline-none focus:ring-4 focus:ring-clay/30 active:scale-95"
            >
              Create account
              <FiArrowRight className="transition group-hover:translate-x-1" />
            </Link>
            <Link
              to="/login"
              className="rounded-2xl border border-line px-6 py-3 text-sm font-medium text-ink transition hover:bg-raised"
            >
              Log in
            </Link>
          </div>
        </div>

        {/* Decorative stacked post cards */}
        <div className="relative hidden h-72 sm:block">
          <div className="absolute left-0 top-4 w-80 -rotate-3 rounded-3xl border border-line bg-raised p-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-full bg-sage" />
              <div className="h-2 w-24 rounded-full bg-ink/80" />
            </div>
            <div className="mt-4 h-2 w-full rounded-full bg-mute/50" />
            <div className="mt-2 h-2 w-2/3 rounded-full bg-mute/50" />
          </div>
          <div className="absolute left-16 top-28 w-80 rotate-2 rounded-3xl border border-line bg-surface p-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-full bg-clay" />
              <div className="h-2 w-20 rounded-full bg-ink/80" />
            </div>
            <div className="mt-4 h-2 w-full rounded-full bg-mute/50" />
            <div className="mt-2 h-2 w-1/2 rounded-full bg-mute/50" />
            <div className="mt-4 flex gap-2">
              <div className="h-7 w-14 rounded-2xl bg-clay/25" />
              <div className="h-7 w-14 rounded-2xl bg-sage/25" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="pb-16 pt-9 max-w-[80%] mx-auto">
        <div className="grid gap-4 sm:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-3xl border border-line bg-surface p-5"
            >
              <div
                className={`grid size-11 place-items-center rounded-[48%_52%_45%_55%] ${f.tone}`}
              >
                {f.icon}
              </div>
              <h2 className="mt-4 text-base font-semibold text-ink">
                {f.title}
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-mute">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mb-16 border border-line bg-surface px-6 py-12 text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight">
          Ready to join in?
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-mute">
          It takes less than a minute to create your account.
        </p>
        <Link
          to="/register"
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-clay px-6 py-3 text-sm font-bold text-canvas transition hover:bg-clay-hover active:scale-95"
        >
          Get started <FiArrowRight />
        </Link>
      </section>
    </main>
  );
}