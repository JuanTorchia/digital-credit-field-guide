# Research notes

## Editorial thesis

Tokenization changes the interface to a financial obligation while preserving—and sometimes adding to—the obligation’s risk stack. Apyx is interesting because its architecture crosses public-market securities, custody, treasury operations, smart contracts and secondary liquidity.

## Counterargument

If an eligible investor can buy STRC or SATA through a broker, a wrapper adds custody, contract, liquidity, operational and regulatory surfaces. It earns its place only if access, denomination, distribution, transparency or programmatic use produce enough utility to justify those surfaces. This is a design test, not a foregone conclusion.

## What would change my mind

More positive: independently verifiable reserves tied to supply; repeated attestations; clear legal mapping; deep two-way liquidity during stress; published audits and incidents; stable redemption across regimes.

More negative: unexplained reserve gaps; stale attestations; ambiguous holder rights; persistent discounts; dividend suspensions; contract incidents; wider geographic restrictions; documentation that conflicts with production.

## Open questions

- Which frontend and bridge routes expose the verified Solana mints, and in which jurisdictions?
- Which entity holds each security, and what exact claim does each protocol token grant?
- Which attestations cover which dates, custodians and liabilities?
- Which contracts were audited, by whom, at which commit?
- Which liquidity and redemption paths are available by jurisdiction?
- Is `$APYX` still pre-TGE at publication?

## Resolved boundaries

- Current Terms define apxUSD/apyUSD as programmatic claims against protocol
  modules, not claims against a particular entity or person.
- Current Terms restrict the United States, European Union, United Kingdom,
  Canada and other listed territories.
- Both published Solana addresses resolve as initialized classic SPL Token mints
  with six decimals and retained mint/freeze authorities at finalized slot 438320962. This is account-state evidence only.

## Control questions still open

- Who controls the two mint authorities and shared freeze authority, under what
  policy and with which key-management or multisig arrangement?
- Which path issues or bridges the Solana representation?
- Where does redemption accounting execute, and which components are actually
  native to Solana?
- Which audit covers that path, chain and deployed commit?
