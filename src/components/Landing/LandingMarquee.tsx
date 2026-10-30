const words = [
  "Share",
  "Reply",
  "React",
  "Post a photo",
  "Start a thread",
  "Say hello",
  "Catch up",
  "Show up",
];

/* The list is rendered twice so translating by -50% loops seamlessly. */
const loop = [...words, ...words];

export default function LandingMarquee() {
  return (
    <section
      aria-hidden="true"
      className="overflow-hidden border-y border-line bg-surface py-6"
    >
      <div className="flex w-max animate-marquee gap-12 pr-12">
        {loop.map((word, i) => (
          <span
            key={i}
            className="flex items-center gap-12 whitespace-nowrap font-display text-3xl font-medium italic text-mute"
          >
            {word}
            <span className="size-3 rounded-full bg-clay" />
          </span>
        ))}
      </div>
    </section>
  );
}
