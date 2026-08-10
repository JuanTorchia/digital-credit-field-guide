# Final criterion-by-criterion audit

Audited: 2026-08-10 UTC

| Criterion                             | Classification | Objective evidence                                                     |
| ------------------------------------- | -------------- | ---------------------------------------------------------------------- |
| Listing open, global, sufficient time | proven         | Official listing structured data in `docs/bounty-spec.md`              |
| X thread is mandatory                 | proven         | Listing transcript and ten-post `content/thread.md`                    |
| Original educational thread           | proven         | Original risk-stack narrative; editorial log; each post within X limit |
| `@Apyx_Fi` and `$APYX`                | proven         | Exact-string validator passes                                          |
| Educational value                     | proven         | Definition, flow, comparison, glossary, counterargument, field check   |
| Accuracy and traceability             | proven         | Source/claim ledgers, RPC snapshot, SEC filings and official docs      |
| Facts vs interpretation/inference     | proven         | Explicit claim fields and methodology                                  |
| No unsupported financial promises     | proven         | Prohibited-language validator and manual audit                         |
| Underlying vs wrapper risk            | proven         | Two-layer thesis, card, article and Risk Lens                          |
| Five required risk categories         | proven         | Market, liquidity, counterparty, contracts and regulation visible      |
| What would change my mind             | proven         | Dedicated article and notes sections                                   |
| Strong counterargument                | proven         | Broker-vs-wrapper argument in post nine and guide                      |
| Five to seven cards                   | proven         | Seven deterministic 1600×900 PNGs, visually inspected                  |
| Mobile-first microsite                | proven         | Public URL, desktop/mobile browser checks, no overflow                 |
| MDX, methodology and sources          | proven         | `content/report.mdx`, `/methodology/`, `/sources/`                     |
| Public repository and README          | proven         | GitHub repo, setup, architecture, dictionary, troubleshooting          |
| Demo 60–90 seconds                    | proven         | Timed 75-second storyboard                                             |
| CI and E2E                            | proven         | Remote CI green; local Playwright 10/10                                |
| Accessibility AA                      | proven         | Zero serious/critical axe violations desktop/mobile                    |
| Lighthouse ≥90                        | proven         | v2 public scores: 96 / 100 / 96 / 100                                  |
| Public functional URL                 | proven         | Pages workflow green; public browser verification passed               |
| Vercel preview                        | incomplete     | Built under team SSO; public GitHub Pages URL is canonical             |
| Solana token deployment               | proven         | Official Apyx addresses plus initialized SPL Token mints on mainnet    |
| Current APY/TVL/supply/volume         | no evidence    | Deliberately excluded; publication-day evidence required               |
| Contract audit assurance              | incomplete     | Five assessments linked; report scopes still need detailed review      |
| Published X URL                       | incomplete     | Explicit human action required                                         |
| Superteam submission                  | incomplete     | Explicit human action required                                         |

## Simulated jury v2

| Reviewer               |     v1 |     v2 | Verdict                                    |
| ---------------------- | -----: | -----: | ------------------------------------------ |
| Sponsor / Superteam    | 8.6/10 | 9.1/10 | Strong top five; credible podium contender |
| Solana + RWA technical | 78/100 | 92/100 | No factual or technical blocker            |
| X research editor      | 79/100 | 91/100 | Top-tier editorial candidate               |

The remaining sponsor uncertainty is fit, not correctness: the guide is more
rigorous than promotional. No concrete user path or Apyx-specific reason for
choosing Solana is claimed because current primary evidence does not support
either statement strongly enough.

## Remaining uncertainty

Solana mint state is verified at one finalized slot, but controller identity, issuance/bridge paths, liquidity, redemption accounting and frontend paths remain open. Jurisdictional restrictions are documented and must be re-checked. Audit scopes still need report-level mapping. Re-check `$APYX` status and every protocol document on publication day.
