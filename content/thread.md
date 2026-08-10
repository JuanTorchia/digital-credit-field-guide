# Final X thread v3 — unpublished

Status: human voice approved by Juan on 2026-08-10. Do not publish automatically.

## 1/10

When credit moves onchain, which part actually moved?

@Apyx_Fi publishes token mints on Solana. The issuers, dividends, custody and exit market remain outside it.

Here is the trace from $STRC and $SATA to the Solana token layer. 🧵

Visual: `01-thesis.png`

## 2/10

Start with the name.

Apyx uses “Digital Credit” for preferred equity issued by digital-asset treasury companies and connected to onchain rails.

The cash flow may look credit-like. The legal instrument is still equity.

Visual: `02-definition.png`

## 3/10

$STRC from Strategy and $SATA from Strive are Nasdaq-listed variable-rate perpetual preferred shares.

Under their terms, they rank below debt and above common equity. Perpetual means no maturity date. Neither structure fixes price or dividend.

## 4/10

Apyx’s documentation maps a hybrid path:

capital → preferred securities → declared dividends → treasury/custody → onchain vault → user

Each arrow is an integration boundary. It may add useful capability; it also adds something the system depends on.

Visual: `03-flow.png`

## 5/10

What do token rails add?

A balance can move across compatible wallets, be inspected onchain and become an input to software. Solana provides those primitives.

That is real infrastructure. It tells me nothing, by itself, about whether an issuer will pay.

## 6/10

My architecture sketch has two boxes.

One holds issuer, dividend, market and custody risk. The other holds contracts, token controls, liquidity, integrations and regulation.

Debugging one box does not validate the other.

Visual: `04-layers.png`

## 7/10

The published addresses are directly verifiable.

Apyx’s apxUSD and apyUSD addresses resolve as initialized SPL Token mints. Both retain mint and freeze authorities.

That confirms one finalized slot’s configuration. Who controls those authorities, and under what policy?

Visual: `05-controls.png`

## 8/10

The Terms answer a different question: what does the holder own?

Apyx’s Terms describe tokens as programmatic claims against protocol modules—not direct ownership of $STRC or $SATA. $APYX is governance, a separate control layer.

Access depends on jurisdiction too.

## 9/10

Documentation cannot answer the operating question yet: will programmability outweigh added custody, contract and liquidity surfaces?

An eligible investor can use a broker. The measurable test is whether access and programmable distribution justify the added layer.

Visual: `06-compare.png`

## 10/10

A practical test: follow the claim.

Who issued it? What does the holder legally own? Who has custody? Who controls the token? Where can it be sold or redeemed—and under which rules?

Sources, open questions and RPC evidence:
https://juantorchia.github.io/digital-credit-field-guide/

Visual: `07-checklist.png`
