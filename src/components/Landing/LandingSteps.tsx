import SectionHeading from "./SectionHeading";

const steps = [
  {
    number: "01",
    title: "Create your account",
    text: "Tell us a little about yourself. It takes less than a minute.",
    tone: "text-clay",
  },
  {
    number: "02",
    title: "Share your first thought",
    text: "Write something small, add a photo if you like, and hit post.",
    tone: "text-sage",
  },
  {
    number: "03",
    title: "Watch it grow",
    text: "Replies and likes roll in, and a post turns into a conversation.",
    tone: "text-clay",
  },
];

export default function LandingSteps() {
  return (
    <section
      id="how"
      className="mx-auto w-full max-w-7xl scroll-mt-20 px-4 pb-28 pt-12 sm:px-6"
    >
      <SectionHeading
        eyebrow="How it works"
        title="From hello to a full thread in three steps."
      />

      <ol className="mt-14 flex flex-wrap gap-5">
        {steps.map((step) => (
          <li
            key={step.number}
            className="reveal min-w-0 flex-[1_1_280px] border-t border-line pt-7"
          >
            <p
              className={`font-display text-7xl font-medium italic leading-none ${step.tone}`}
            >
              {step.number}
            </p>
            <h3 className="mt-4 text-[22px] font-bold">{step.title}</h3>
            <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-mute">
              {step.text}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
