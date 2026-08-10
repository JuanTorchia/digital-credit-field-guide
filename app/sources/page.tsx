import sources from '@/data/sources.json';
import claims from '@/data/claims.json';
import { EmptyState } from '@/components/content/empty-state';
export const metadata = { title: 'Sources' };
export default function Sources() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  const sourceById = new Map(sources.map((source) => [source.id, source]));
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
      <nav
        aria-label="Evidence downloads"
        className="mt-8 flex flex-wrap gap-3"
      >
        {[
          ['Claim ledger', 'claim-ledger.md'],
          ['Claims JSON', 'claims.json'],
          ['Sources JSON', 'sources.json'],
          ['System trace', 'system-trace.json'],
          ['Solana snapshot', 'solana-mint-evidence.json'],
        ].map(([label, filename]) => (
          <a
            key={filename}
            href={`${basePath}/downloads/${filename}`}
            download
            className="border border-[#172019] px-4 py-2 text-sm font-semibold"
          >
            Download {label} ↓
          </a>
        ))}
      </nav>
      <section className="mt-16" aria-labelledby="claims-title">
        <h2 id="claims-title" className="text-2xl font-semibold">
          Claims
        </h2>
        <div className="mt-5 space-y-3">
          {claims.length === 0 && (
            <EmptyState>No claims are available in this build.</EmptyState>
          )}
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
                <p className="sm:col-span-3">{c.notes}</p>
                <div className="mt-2 border-t border-[#c9c7bd] pt-4 sm:col-span-3">
                  <p className="label text-[#b84f2c]">
                    Evidence for this claim
                  </p>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {c.sourceIds.map((sourceId) => {
                      const source = sourceById.get(sourceId);
                      return source ? (
                        <li key={sourceId}>
                          <a
                            href={`#source-${source.id}`}
                            className="block border border-[#c9c7bd] p-3 font-medium text-[#172019]"
                          >
                            <span className="label text-[#b84f2c]">
                              {source.id}
                            </span>
                            <span className="mt-1 block">{source.title}</span>
                            <span className="mt-1 block text-xs font-normal text-[#596159]">
                              {source.publisher} · accessed {source.accessedAt}
                            </span>
                          </a>
                        </li>
                      ) : null;
                    })}
                  </ul>
                </div>
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
          {sources.length === 0 && (
            <EmptyState>No sources are available in this build.</EmptyState>
          )}
          {sources.map((s) => (
            <article
              id={`source-${s.id}`}
              key={s.id}
              className="scroll-mt-6 border border-[#c9c7bd] p-5 target:bg-[#d9ff63]/20"
            >
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
