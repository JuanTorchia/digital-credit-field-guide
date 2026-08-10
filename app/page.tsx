import Link from 'next/link';
import Report from '@/content/report.mdx';

export default function Page() {
  return (
    <main id="main">
      <section className="container grid min-h-[78vh] content-between py-10 sm:py-16">
        <div className="flex justify-between gap-6">
          <p className="label">RESEARCH NOTE / 10 AUG 2026</p>
          <p className="label text-right">
            FACTS · INTERPRETATION · OPEN QUESTIONS
          </p>
        </div>
        <div className="py-20">
          <p className="label mb-6 text-[#b84f2c]">
            WHY DIGITAL CREDIT MATTERS
          </p>
          <h1 className="display max-w-6xl text-[clamp(4.2rem,12vw,10.5rem)]">
            The interface is not the obligation.
          </h1>
          <p className="mt-9 max-w-2xl text-xl leading-relaxed text-[#4b554c] sm:text-2xl">
            A field guide to what tokenization can improve, what it cannot
            repair, and how to read Apyx as a hybrid financial system.
          </p>
        </div>
        <div className="flex flex-col justify-between gap-5 border-t border-[#172019] pt-5 sm:flex-row">
          <p className="max-w-xl text-sm leading-relaxed">
            Conclusion first: Digital Credit matters when it makes an obligation
            easier to access, inspect and use. Its credibility still begins with
            the issuer, custody and exit path underneath.
          </p>
          <Link href="#guide" className="font-semibold">
            Start with the system ↓
          </Link>
        </div>
      </section>
      <article id="guide" className="prose-field container">
        <Report />
      </article>
    </main>
  );
}
