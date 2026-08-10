import sources from '@/data/sources.json';
import claims from '@/data/claims.json';
export const metadata = { title: 'Sources' };
export default function Sources() {
  return (
    <main id="main" className="container py-16">
      <p className="label text-[#b84f2c]">SOURCE LEDGER / AS OF 10 AUG 2026</p>
      <h1 className="display mt-6 text-[clamp(4rem,10vw,8rem)]">
        Show your work.
      </h1>
      <p className="mt-8 max-w-2xl text-xl leading-relaxed text-[#596159]">
        Every material statement in the published narrative maps to a dated
        record. Uncertainty is visible, not smoothed away.
      </p>
      <section className="mt-16" aria-labelledby="claims-title">
        <h2 id="claims-title" className="text-2xl font-semibold">
          Claims
        </h2>
        <div className="mt-5 space-y-3">
          {claims.map((c) => (
            <details
              key={c.id}
              className="border border-[#c9c7bd] bg-white p-5"
            >
              <summary className="cursor-pointer font-semibold">
                <span
                  className={`label mr-3 ${c.status === 'uncertain' ? 'text-[#b84f2c]' : 'text-[#4a6c24]'}`}
                >
                  {c.status}
                </span>
                {c.claim}
              </summary>
              <div className="mt-4 grid gap-2 text-sm text-[#596159] sm:grid-cols-3">
                <p>
                  <strong>As of:</strong> {c.asOf}
                </p>
                <p>
                  <strong>Type:</strong> {c.factOrInference}
                </p>
                <p>
                  <strong>Confidence:</strong> {c.confidence}
                </p>
                <p className="sm:col-span-3">
                  <strong>Source IDs:</strong> {c.sourceIds.join(', ')}
                </p>
                <p className="sm:col-span-3">{c.notes}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
      <section className="mt-20" aria-labelledby="sources-title">
        <h2 id="sources-title" className="text-2xl font-semibold">
          Primary and official sources
        </h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {sources.map((s) => (
            <article key={s.id} className="border border-[#c9c7bd] p-5">
              <p className="label text-[#b84f2c]">{s.id}</p>
              <h3 className="mt-4 text-lg font-semibold">
                <a href={s.url} target="_blank" rel="noreferrer">
                  {s.title} ↗
                </a>
              </h3>
              <p className="mt-2 text-sm text-[#596159]">
                {s.publisher} · accessed {s.accessedAt}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#596159]">
                {s.notes}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
