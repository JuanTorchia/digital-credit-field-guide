import claims from '@/data/claims.json';
export const metadata = { title: 'Methodology' };
export default function Methodology() {
  return (
    <main id="main" className="container py-16">
      <p className="label text-[#b84f2c]">METHOD / VERSION 2.0</p>
      <h1 className="display mt-6 max-w-5xl text-[clamp(4rem,10vw,8rem)]">
        Evidence before narrative.
      </h1>
      <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_2fr]">
        <aside>
          <p className="label">Current ledger</p>
          <p className="mt-3 text-5xl font-semibold">
            {claims.filter((c) => c.status === 'verified').length}
          </p>
          <p className="text-[#596159]">verified records</p>
          <p className="mt-7 text-5xl font-semibold">
            {claims.filter((c) => c.status === 'uncertain').length}
          </p>
          <p className="text-[#596159]">open contradiction</p>
        </aside>
        <article className="prose-field">
          <h2 className="!mt-0">How claims enter the guide</h2>
          <ol>
            <li>
              <strong>Prefer primary evidence.</strong> Protocol documentation
              explains intended design; SEC filings establish issuer terms;
              network docs establish technical primitives.
            </li>
            <li>
              <strong>Triangulate material claims.</strong> Sponsor copy is not
              independent verification. When sources conflict, the claim is
              marked uncertain.
            </li>
            <li>
              <strong>Separate labels.</strong> Facts report a source.
              Interpretations synthesize multiple facts. Inferences state what
              may follow and remain conditional.
            </li>
            <li>
              <strong>Timestamp everything.</strong> Product access, rates,
              contracts and restrictions can change. Time-sensitive numbers are
              excluded unless they improve the explanation.
            </li>
            <li>
              <strong>Reject unsupported certainty.</strong> No promise
              language, no current APY/TVL/supply and no system-wide assurance
              inferred from a scoped audit or deployed token mint.
            </li>
          </ol>
          <h2>Limitations</h2>
          <p>
            This is documentary research, not a legal opinion, reserve audit,
            smart-contract audit or liquidity study. Apyx design statements are
            verified as statements made in its documentation, not as independent
            operational performance. Readers should inspect current terms and
            jurisdictional access.
          </p>
          <h2>Solana verification boundary</h2>
          <p>
            A finalized RPC snapshot records each published mint&apos;s token
            program, decimals and authority configuration. The request, slot,
            parsed response and limitations are committed in the repository.
            This confirms mint state at that slot—not reserves, liquidity,
            bridge behavior, control identity or the location of economic
            accounting.
          </p>
          <h2>Model policy</h2>
          <p>
            The waterfall uses abstract units and clamps the result at zero. It
            is a teaching device only. Scenarios are exercises, not predictions,
            and are not calibrated to Apyx or any issuer.
          </p>
        </article>
      </div>
    </main>
  );
}
