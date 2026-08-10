# Final X thread v2 — unpublished

Status: candidate for simulated jury re-review. Do not publish automatically.

## 1/10

Tokenizing credit changes how a claim moves, what software can do with it, and what users can inspect.

It does not strengthen the issuer or create an exit.

I traced @Apyx_Fi from preferred shares to Solana mints. Here is what actually becomes digital. 🧵

Visual: `01-thesis.png`

## 2/10

Apyx uses “Digital Credit” for publicly traded preferred equity issued by digital-asset treasury companies, connected to onchain rails.

It remains equity—not a deposit, Treasury bill or new legal category.

Visual: `02-definition.png`

## 3/10

Two examples are Strategy’s $STRC and Strive’s $SATA: Nasdaq-listed, variable-rate perpetual preferred shares.

They sit below debt and above common equity. Dividends and market prices can change.

## 4/10

Apyx documents this path:

capital → preferred securities → declared dividends → treasury/custody → onchain vault → user

Each handoff may add capability—and always adds a dependency.

Visual: `03-flow.png`

## 5/10

Why use token rails at all?

Balances can move between wallets, be inspected publicly and become inputs to software. Solana supplies those token primitives.

That is distribution infrastructure, not better underwriting.

Visual: `04-layers.png`

## 6/10

After 20 years designing systems, I read this as two connected layers:

Underlying — issuer, dividend, market, custody

Wrapper — contracts, token controls, liquidity, integrations, regulation

The interface is not the obligation.

## 7/10

Apyx publishes apxUSD and apyUSD Solana addresses. Both resolve as initialized SPL Token mints with retained mint and freeze authorities.

That verifies token representation—and identifies controls to inspect. It does not verify reserves or liquidity.

Visual: `05-controls.png`

## 8/10

The legal boundary matters too.

Apyx’s Terms describe its tokens as programmatic claims against protocol modules—not direct ownership of $STRC or $SATA.

The docs describe $APYX as governance: a separate control layer, not evidence of backing.

## 9/10

The strongest counterargument: why add a protocol when an eligible investor can use a broker?

Programmability must justify the extra controls, costs and failure modes. Access is jurisdiction-dependent; Apyx’s current Terms exclude several major markets.

Visual: `06-compare.png`

## 10/10

My field check for tokenized credit:

instrument · holder rights · issuer · custody · token controls · liquidity · jurisdiction · evidence date

I published the sources, open questions and verification method here:
https://juantorchia.github.io/digital-credit-field-guide/

Visual: `07-checklist.png`
