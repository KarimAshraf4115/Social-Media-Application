import type { ReactNode } from "react";
import { FiHeart, FiImage, FiMessageCircle } from "react-icons/fi";
import SectionHeading from "./SectionHeading";

type FeatureCardProps = {
  icon: ReactNode;
  tone: string;
  shape: string;
  title: string;
  text: string;
  children: ReactNode;
};

function FeatureCard({
  icon,
  tone,
  shape,
  title,
  text,
  children,
}: FeatureCardProps) {
  return (
    <article className="reveal min-w-0 flex-[1_1_320px] rounded-3xl border border-line bg-surface p-6 transition duration-300 hover:-translate-y-1.5 hover:border-mute">
      <span className={`grid size-[52px] place-items-center ${shape} ${tone}`}>
        {icon}
      </span>
      <h3 className="mt-5 text-xl font-bold">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-mute">{text}</p>
      {/* Decorative preview */}
      <div
        aria-hidden="true"
        className="mt-5 rounded-2xl border border-line bg-canvas p-3.5"
      >
        {children}
      </div>
    </article>
  );
}

const bubble = "rounded-2xl bg-raised px-3 py-2 text-[13px] leading-snug";

export default function LandingFeatures() {
  return (
    <section
      id="features"
      className="mx-auto w-full max-w-7xl px-4 pb-24 pt-28 sm:px-6"
    >
      <SectionHeading
        eyebrow="Everything in one place"
        title="A feed that feels like a conversation."
        text="Post, reply and react without the noise. Everything you need to keep people talking, and nothing you do not."
      />

      <div className="mt-14 flex flex-wrap gap-5">
        <FeatureCard
          icon={<FiImage className="size-[22px]" />}
          tone="bg-clay/20 text-clay"
          shape="rounded-[48%_52%_45%_55%]"
          title="Say it your way"
          text="Write a few words, add a photo, or do both. Posting takes a couple of taps."
        >
          <p className="text-sm text-mute">What is on your mind?</p>
          <div className="mt-5 flex items-center justify-between">
            <span className="flex items-center gap-2 text-[13px] font-medium text-sage">
              <FiImage className="size-[18px]" /> Photo
            </span>
            <span className="rounded-xl bg-clay px-4 py-2 text-[13px] font-bold text-canvas">
              Post
            </span>
          </div>
        </FeatureCard>

        <FeatureCard
          icon={<FiMessageCircle className="size-[22px]" />}
          tone="bg-sage/20 text-sage"
          shape="rounded-[55%_45%_52%_48%]"
          title="Conversations that grow"
          text="Comment with text or images, edit later, and keep every thread in one place."
        >
          <div className="flex items-start gap-2.5">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-sage text-[11px] font-bold text-canvas">
              M
            </span>
            <p className={bubble}>This is the best idea all week.</p>
          </div>
          <div className="ml-9 mt-3 flex items-start gap-2.5">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-clay text-[11px] font-bold text-canvas">
              O
            </span>
            <p className={bubble}>Agreed. Count me in!</p>
          </div>
        </FeatureCard>

        <FeatureCard
          icon={<FiHeart className="size-[22px]" />}
          tone="bg-clay/20 text-clay"
          shape="rounded-[45%_55%_50%_50%]"
          title="See what lands"
          text="Likes and a top comment on every post show you what your people care about."
        >
          <div className="flex items-center gap-2.5">
            <div className="flex">
              <span className="size-6 rounded-full border-2 border-canvas bg-sage" />
              <span className="-ml-2 size-6 rounded-full border-2 border-canvas bg-clay" />
              <span className="-ml-2 size-6 rounded-full border-2 border-canvas bg-ink" />
            </div>
            <span className="text-[13px]">Maya and 2 others liked this</span>
          </div>
          <p className="mt-3.5 text-[11px] uppercase tracking-[0.12em] text-sage">
            Top comment
          </p>
          <p className={`mt-1.5 ${bubble}`}>Saving this for the weekend.</p>
        </FeatureCard>
      </div>
    </section>
  );
}
