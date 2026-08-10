import Image from 'next/image';
import cards from '@/data/cards.json';
export const metadata = { title: 'Social cards' };
export default function Share() {
  return (
    <main id="main" className="container py-16">
      <p className="label text-[#b84f2c]">SHARE KIT / 1600 × 900</p>
      <h1 className="display mt-6 text-[clamp(4rem,10vw,8rem)]">
        Six cards. One evidence system.
      </h1>
      <p className="mt-7 max-w-2xl text-xl text-[#596159]">
        Generated deterministically from <code>data/cards.json</code>. No
        decorative AI imagery; only typography and documented models.
      </p>
      <div className="mt-14 grid gap-8 sm:grid-cols-2">
        {cards.map((card, index) => (
          <figure key={card.id}>
            <Image
              src={`/social/${card.id}.png`}
              alt={`${card.eyebrow}: ${card.title}`}
              width={1600}
              height={900}
              sizes="(max-width: 640px) calc(100vw - 32px), 50vw"
              preload={index === 0}
              className="h-auto w-full border border-[#172019]"
            />
            <figcaption className="label mt-3">{card.id}.png</figcaption>
          </figure>
        ))}
      </div>
    </main>
  );
}
