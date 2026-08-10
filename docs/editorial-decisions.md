# Editorial decisions

## Hook variants

Scored from 1 (weak) to 5 (strong).

| Variant      | Hook                                                                                                                 | Accuracy | Clarity | Originality | Retention | Authenticity | Total |
| ------------ | -------------------------------------------------------------------------------------------------------------------- | -------: | ------: | ----------: | --------: | -----------: | ----: |
| A — v1       | “Tokenization can make credit easier to move, inspect and plug into software. It cannot make the borrower stronger…” |        4 |       5 |           5 |         5 |            4 |    23 |
| B            | “The most important part of onchain credit is the part that stays offchain.”                                         |        5 |       4 |           5 |         5 |            4 |    23 |
| C            | “A yield-bearing token is an interface. The obligation underneath is the system.”                                    |        5 |       4 |           4 |         4 |            5 |    22 |
| D — selected | “Tokenizing credit changes how a claim moves… I traced Apyx from preferred shares to Solana mints.”                  |        5 |       5 |           5 |         5 |            5 |    25 |

Variant D preserves the benefit/limit tension, corrects the equity terminology,
introduces Apyx immediately and promises a concrete trace instead of a generic
explanation.

## Thread structures

| Structure            | Shape                                                                                                 | Strength                | Weakness                   | Decision |
| -------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------- | -------------------------- | -------- |
| Risk-stack narrative | Thesis → definition → instruments → flow → layers → Apyx → disclosure → counterargument → field check | Reusable model          | Needs brevity              | selected |
| Product walkthrough  | Problem → Apyx tokens → flow → Solana → comparison → risks → CTA                                      | Fast sponsor visibility | Risks becoming promotional | rejected |

## Voice and restraint

- Use Juan’s architecture lens: interfaces, layers, failure modes, evidence.
- Avoid current yield and market-size figures.
- Attribute protocol-design claims to Apyx.
- Mention `$APYX` once as a separate governance layer.
- State Solana deployment only at the narrow boundary supported by the official
  address registry and reproducible RPC evidence.

## Jury-driven revision — v2

The first simulated panel found that v1 delayed Apyx until post seven, used
`borrower` for an equity issuer, and made the risk case more vividly than the
utility case. Version two keeps the risk-stack structure but traces Apyx in the
hook, attributes the category to Apyx, adds holder rights and jurisdiction, and
makes the Solana control surface reproducible. Three typographic cards became
actual diagrams. `$APYX` now appears beside governance and holder-rights
boundaries instead of as a final-post compliance insertion.

## Visual revision — evidence before decoration

A blind design audit found that cards 01, 02 and 07 still behaved like polished
quote cards. They now carry the argument themselves: 01 maps underlying,
protocol and token rail; 02 separates legal form, economic behavior and digital
rail; 07 exposes the complete eight-question field check. The renderer reads
all variable copy from `data/cards.json`; no decorative generated imagery is
used. The follow-up audit scored the full set about 90/100, up from an estimated
82/100, with no contrast or hierarchy blocker.
