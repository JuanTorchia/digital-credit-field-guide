import Link from 'next/link';
import { FlowExplorer } from '@/components/story/flow-explorer';
import { YieldWaterfall } from '@/components/calculators/yield-waterfall';
import { RiskLens } from '@/components/story/risk-lens';

const comparisons = [
  [
    'Bank deposit',
    'Bank obligation',
    'Account/transfer rails',
    'Bank, insurance limits, access',
  ],
  [
    'Treasury bill',
    'Sovereign obligation',
    'Broker/token wrapper',
    'Rate, duration, custody, wrapper',
  ],
  [
    'DAT preferred',
    'Corporate preferred equity',
    'Broker/token wrapper',
    'Issuer, dividend, market, liquidity',
  ],
  [
    'DeFi strategy',
    'Protocol positions',
    'Smart contracts',
    'Contracts, oracle, liquidity, strategy',
  ],
];
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
        <section>
          <p className="label text-[#b84f2c]">ACT I / THE PROBLEM</p>
          <h2>Credit runs on agreements. Access runs on fragmented systems.</h2>
          <p>
            Credit is not merely money moving. It is a chain of promises: who
            provides capital, who owes cash flows, which conditions govern
            payment, where the asset sits and how a holder exits. Traditional
            infrastructure can make those promises slow to distribute and
            difficult to compose with software.
          </p>
          <p>
            <strong>
              Digital Credit is not “credit without intermediaries.”
            </strong>{' '}
            Apyx uses the term for publicly traded preferred equity issued by
            digital-asset treasury companies, with credit-like cash flows,
            connected to onchain rails. That is its product framing—not a
            universal legal category.
          </p>
        </section>
        <section>
          <p className="label text-[#b84f2c]">ACT II / WHAT CHANGES</p>
          <h2>Digital rails change behavior, not seniority.</h2>
          <p>
            A token balance can be transferred, inspected and called by
            programs. Distribution logic can be encoded. Evidence can be
            attached to an interface. But the token does not strengthen its
            issuer, compel a board to declare a dividend, insure a custodian or
            create buyers during stress.
          </p>
          <aside className="my-10 border-l-4 border-[#b84f2c] bg-white p-6 text-xl leading-relaxed">
            <strong>Key distinction:</strong> the underlying asset and the
            wrapper are connected, but they are not the same risk.
          </aside>
        </section>
        <FlowExplorer />
        <section>
          <p className="label text-[#b84f2c]">ACT III / FOLLOW THE VALUE</p>
          <h2>
            The cash flow crosses a boundary the blockchain cannot settle alone.
          </h2>
          <p>
            Apyx documents an offchain treasury that acquires preferred
            securities and liquid assets, receives cash dividends, and moves
            value to an onchain vault. The vault changes apyUSD’s redemption
            value over time. This is a documented architecture claim, not
            independent proof of performance.
          </p>
          <p>
            The system therefore depends on public-market issuers, brokerage and
            custody operations, accounting evidence, token contracts and
            secondary liquidity. Transparency at one boundary is useful; it does
            not remove the others.
          </p>
          <aside className="my-10 border-l-4 border-[#b84f2c] bg-white p-6">
            <p className="label text-[#b84f2c]">HOLDER-RIGHTS BOUNDARY</p>
            <p className="mt-3 text-lg leading-relaxed">
              Apyx&apos;s Terms describe protocol-generated tokens as
              programmatic claims against modules holding assets—not claims
              against a particular company or person. Holding the token is not
              direct ownership of STRC or SATA.
            </p>
          </aside>
        </section>
        <section aria-labelledby="compare-title">
          <p className="label text-[#b84f2c]">
            ACT IV / RESPONSIBLE COMPARISON
          </p>
          <h2 id="compare-title">Compare the obligation before the rate.</h2>
          <div
            className="my-10 overflow-x-auto"
            tabIndex={0}
            role="region"
            aria-label="Comparison table; scroll horizontally on small screens"
          >
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-[#172019]">
                  {[
                    'Instrument',
                    'Economic source',
                    'Access rail',
                    'Risks to inspect',
                  ].map((h) => (
                    <th key={h} className="p-4 text-sm">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row) => (
                  <tr key={row[0]} className="border-b border-[#c9c7bd]">
                    {row.map((cell, i) => (
                      <td
                        key={cell}
                        className={`p-4 align-top ${i === 0 ? 'font-semibold' : 'text-[#596159]'}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <YieldWaterfall />
        <section>
          <p className="label text-[#b84f2c]">ACT V / APYX AS A CASE STUDY</p>
          <h2>Apyx exposes the hybrid system in plain sight.</h2>
          <p>
            Its documentation names STRC from Strategy and SATA from Strive as
            initial preferred instruments. SEC filings identify both as
            Nasdaq-listed variable-rate perpetual preferred equity. “Preferred”
            describes a position below debt and above common equity; “perpetual”
            means no maturity date. Neither word means the market price or
            dividend cannot change.
          </p>
          <p>
            Apyx also states that apxUSD is not designed as a strict one-to-one
            peg. That disclosure is central, not fine print. The project’s docs
            describe $APYX as a governance token with a future token-generation
            event; governance economics are a separate layer and do not prove
            the quality of the underlying credit.
          </p>
          <p>
            Access is not global. Under the current Terms, people connected to
            the United States, European Union, United Kingdom, Canada and other
            listed territories may not use the Site or Protocol. Any claim of
            broader access therefore needs a jurisdiction and an evidence date.
          </p>
          <div className="my-10 border border-[#b84f2c] p-6">
            <p className="label text-[#b84f2c]">SOLANA / VERIFIED BOUNDARY</p>
            <p className="mt-3">
              At finalized slot 438320962, both published addresses returned
              initialized classic SPL Token mint accounts with six decimals.
              Both retained mint and freeze authorities. Those are controls to
              identify and monitor, not evidence of misuse.
            </p>
            <p className="mt-3">
              This verifies token representation and authority configuration at
              one slot—not reserves, legitimate supply, liquidity, frontend
              availability, bridge safety, redemption behavior or where the
              complete accounting runs. The RPC request and response are saved
              in the public repository.
            </p>
          </div>
          <h3>What Solana contributes</h3>
          <p>
            Solana provides standard mint, token-account, transfer and authority
            primitives. They can make a balance portable, publicly inspectable
            and available to compatible programs. They do not determine the
            offchain asset&apos;s legal rights or the issuer&apos;s capacity to
            pay. The useful question is which part runs on Solana, who controls
            it and which dependencies remain elsewhere.
          </p>
        </section>
        <RiskLens />
        <section>
          <p className="label text-[#b84f2c]">ACT VI / THE TEST</p>
          <h2>
            Programmability is useful. Proof remains offchain and onchain.
          </h2>
          <h3>The strongest counterargument</h3>
          <p>
            Why add a protocol if an eligible investor can buy preferred shares
            through a broker? The wrapper adds custody, contract, liquidity,
            operational and regulatory surfaces. It earns its place only if
            access, denomination, distribution, transparency or programmatic use
            create enough utility to justify those surfaces. That remains
            something to demonstrate over time.
          </p>
          <h3>What would change my mind</h3>
          <p>
            I would become more positive with reserves independently tied to
            token supply, repeated attestations, clear legal mapping, durable
            two-way liquidity during stress, published audits and incidents, and
            stable redemption behavior across regimes. Reserve gaps, stale
            evidence, ambiguous rights, persistent discounts or documentation
            that diverges from production would move me the other way.
          </p>
          <h3>A compact glossary</h3>
          <dl className="grid gap-x-8 border-t border-[#c9c7bd] sm:grid-cols-[12rem_1fr]">
            {[
              [
                'Preferred equity',
                'Equity with contractual preferences over common stock; still junior to debt.',
              ],
              ['Perpetual', 'No stated maturity date.'],
              [
                'Wrapper',
                'The token, contracts and operations that represent or route exposure to an underlying asset.',
              ],
              [
                'Redemption value',
                'The protocol-defined amount used for minting/redemption; not necessarily a market price.',
              ],
              [
                'Composability',
                'The ability for programs to use a token or protocol as a building block.',
              ],
            ].map(([term, def]) => (
              <div className="contents" key={term}>
                <dt className="border-b border-[#c9c7bd] py-4 font-semibold">
                  {term}
                </dt>
                <dd className="m-0 border-b border-[#c9c7bd] py-4 text-[#596159]">
                  {def}
                </dd>
              </div>
            ))}
          </dl>
          <div className="my-20 bg-[#d9ff63] p-7 sm:p-12">
            <p className="label">THE FIELD CHECK</p>
            <p className="display mt-5 text-5xl">
              Instrument. Holder rights. Issuer. Custody. Token controls.
              Liquidity. Jurisdiction. Evidence date.
            </p>
            <div className="mt-8 flex flex-wrap gap-5 text-sm">
              <Link href="/methodology" className="font-semibold">
                Read the methodology →
              </Link>
              <Link href="/sources" className="font-semibold">
                Open the source ledger →
              </Link>
              <Link href="/share" className="font-semibold">
                View the social cards →
              </Link>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
