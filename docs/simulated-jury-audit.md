# Simulated jury audit

Audited: 2026-08-10 UTC  
Status: pre-publication review; no X post or Superteam submission was made.

This review used three independent roles: an Apyx/Superteam sponsor judge, a
Solana + RWA technical reviewer, and an X research editor. The QA owner then
classified repeated findings separately from individual editorial preferences.

## Verdict

**Shortlist / top-five potential, but not yet a clear winning submission.**

The package is unusually strong on research discipline, risk separation,
accessibility and production quality. Its current weakness is editorial balance:
it explains what tokenization does not solve better than it explains the concrete
utility Apyx and Solana can create. The thread also reaches the sponsor case too
late, while several cards present headings rather than evidence.

| Reviewer               |  Score | Summary                                                            |
| ---------------------- | -----: | ------------------------------------------------------------------ |
| Sponsor / bounty judge | 8.6/10 | Top-five potential; sponsor alignment and retention hold it back   |
| Solana + RWA reviewer  | 78/100 | Strong risk model; holder rights and token controls are incomplete |
| X research editor      | 79/100 | Credible and original; needs earlier payoff and richer visuals     |

These scores are simulated editorial judgments, not predictions or statements
from Apyx, Superteam or Solana representatives.

## Consensus findings

### Must resolve before publication

1. Replace `borrower` in the hook. STRC and SATA are preferred equity, so
   `issuer` or `obligation` is the accurate concept.
2. Explain the holder-rights boundary. Apyx Terms describe apxUSD and apyUSD as
   programmatic claims against protocol modules, not direct ownership of
   STRC/SATA or a claim against their issuers.
3. State that access is jurisdiction-dependent. Current Terms restrict several
   major jurisdictions; the submission must not imply global access.
4. Persist the Solana RPC check as reproducible evidence. Record method, slot,
   timestamp, token program, decimals, mint authority, freeze authority and a
   raw-response digest.
5. Remove stale internal statements that still call Solana deployment
   unresolved, and reconcile source/claim counts and matrix statuses.

### Highest expected prize impact

1. Bring the Apyx case into the first three or four posts and balance the thesis
   with a concrete, sourced explanation of why programmable rails matter.
2. Replace two or three headline cards with actual information graphics:
   an offchain/onchain Apyx flow, a risk-layer diagram, and a real comparison
   matrix.
3. Add a Solana control surface: representation, mint/freeze authority,
   issuance or bridge path, liquidity venue and location of economic accounting.
4. Shorten the densest posts and vary their rhythm. Posts 3–6 are the main
   predicted drop-off zone.
5. Integrate `$APYX` earlier as a separate governance layer, then let the final
   post focus on the field checklist and methodology link.

## Technical findings

- The two published addresses resolve as initialized classic SPL Token mints
  with six decimals.
- Both retain mint authority and the same freeze authority. This is a control
  surface to disclose and investigate, not proof of misconduct.
- A mint proves token representation on Solana. It does not prove reserves,
  liquidity, redemption behavior, frontend access, bridge safety or that the
  full economic accounting runs natively on Solana.
- Existing audit links are not enough to claim system-wide assurance. At least
  one reviewed report concerns named EVM contracts and excludes dependencies
  and economic attacks; scope, chain, commit, findings and exclusions must be
  mapped before using audits as evidence.
- The underlying/wrapper distinction is the strongest and most defensible idea
  in the package.

## Editorial findings

- The hook is specific and sober, but contains the `borrower` category error.
- Apyx first appears at post 7/10, too late for a sponsored case study.
- Posts 2, 3, 5 and 9 are dense; posts 3–6 create the highest abandonment risk.
- All ten posts fit the standard X weighted-length limit in the current local
  check. Use the official `twitter-text` parser before publication for final
  assurance.
- Five of six cards behave mainly as typographic title cards. The comparison
  card promises a comparison without displaying one.
- `$APYX` is responsibly separated from the credit thesis, but its final-post
  placement reads as compliance rather than a natural part of the explanation.
- Repeated binary constructions make the systems voice memorable, but too much
  symmetry may feel over-engineered. Add one concrete first-person observation
  from Juan's architecture experience and vary sentence form.

## What the panel accepted

- STRC and SATA classification and capital-stack placement.
- The distinction between preferred equity and deposits or Treasury bills.
- Apyx's documented offchain-treasury to onchain-vault design, when clearly
  attributed as a published design rather than independently verified operation.
- The lack of a strict one-to-one apxUSD peg.
- The separation of issuer, market and custody risk from smart-contract,
  liquidity and integration risk.
- The existence of the two initialized SPL Token mints, narrowly stated.
- Treating `$APYX` governance as a separate layer, not evidence for the credit
  thesis or an invitation to trade.

## Claims the panel would reject

- apxUSD or apyUSD holders directly own STRC/SATA.
- The tokens are direct claims against Strategy, Strive or another named entity.
- Mint existence proves backing, legitimate circulating supply or liquidity.
- A Solana mint proves the whole product or accounting system runs on Solana.
- `audited` means secure, or a scoped EVM report covers the complete system.
- Access is global or broadly available without jurisdictional qualification.

## QA-owner disposition

| Finding                        | Classification             | Decision                                     |
| ------------------------------ | -------------------------- | -------------------------------------------- |
| `borrower` category error      | blocking factual edit      | fix before next candidate                    |
| Holder rights and jurisdiction | blocking material omission | source and add before next candidate         |
| Reproducible RPC evidence      | blocking traceability gap  | persist before calling Solana claim final    |
| Stale internal documentation   | blocking QA inconsistency  | reconcile across all artifacts               |
| Earlier Apyx utility           | consensus editorial change | redesign thread structure                    |
| Information-dense cards        | consensus product change   | redesign at least cards 03–05                |
| Shorter posts / varied rhythm  | consensus editorial change | revise and rescore                           |
| Yield Waterfall removal        | individual preference      | retain unless it displaces stronger evidence |

## Publication gate

The current draft should **not** be published or submitted yet. After the above
changes, rerun the same three-role panel blind against the revised candidate,
then complete factual, visual, accessibility and deployment QA. Publication on X
and submission to Superteam remain explicit human-only actions.
