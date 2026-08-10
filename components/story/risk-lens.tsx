const risks = [
  ['Market', 'Preferred shares can trade away from stated amount.'],
  [
    'Liquidity',
    'The instrument and wrapper can each have a different exit market.',
  ],
  [
    'Counterparty',
    'Issuer, custodian and operational entities remain relevant.',
  ],
  [
    'Smart contract',
    'Code, oracle and integration failures are wrapper risks.',
  ],
  ['Regulation', 'Access, classification and remedies vary by jurisdiction.'],
];
export function RiskLens() {
  return (
    <section className="my-20" aria-labelledby="risk-title">
      <p className="label">Risk lens</p>
      <h2 id="risk-title" className="display mt-3 max-w-4xl text-5xl">
        One token. Multiple failure domains.
      </h2>
      <div className="mt-9 grid border-t border-l border-[#c9c7bd] sm:grid-cols-2 lg:grid-cols-5">
        {risks.map(([name, text], i) => (
          <article
            key={name}
            className="min-h-52 border-r border-b border-[#c9c7bd] p-5"
          >
            <p className="label text-[#b84f2c]">0{i + 1}</p>
            <h3 className="mt-5 text-xl font-semibold">{name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#596159]">
              {text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
