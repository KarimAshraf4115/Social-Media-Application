type Props = {
  eyebrow: string;
  title: string;
  text?: string;
};

export default function SectionHeading({ eyebrow, title, text }: Props) {
  return (
    <div className="reveal max-w-2xl">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-sage">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
        {title}
      </h2>
      {text && (
        <p className="mt-4 text-base leading-relaxed text-mute sm:text-lg">
          {text}
        </p>
      )}
    </div>
  );
}
