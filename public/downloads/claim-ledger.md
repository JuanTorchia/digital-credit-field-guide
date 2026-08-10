# Claim ledger

As of 2026-08-10 UTC. Machine-readable records live in `data/claims.json`.

## Verified

| Claim ID                    | Short statement                                          | Evidence                              | Notes                           |
| --------------------------- | -------------------------------------------------------- | ------------------------------------- | ------------------------------- |
| `digital-credit-definition` | DAT preferred equity with credit-like cash flows         | Apyx thesis + issuer filings          | Narrow editorial definition     |
| `preferred-risk`            | Preferred is below debt; value/dividends can be impaired | Apyx risks + issuer filings           | Terms vary                      |
| `apyx-flow`                 | Offchain treasury → dividends → onchain vault            | Apyx architecture + transparency docs | Design, not performance         |
| `two-risk-layers`           | Underlying and wrapper risks differ                      | Apyx risks/how/terms                  | Editorial synthesis             |
| `onchain-programmability`   | Token rails add capabilities, not credit enhancement     | Solana docs + Apyx risks              | Editorial synthesis             |
| `strc-structure`            | STRC is Nasdaq-listed variable-rate perpetual preferred  | Strategy SEC filing                   | No price/yield claim            |
| `sata-structure`            | SATA is Nasdaq-listed variable-rate perpetual preferred  | Strive SEC filing                     | Dividends if and when declared  |
| `apyx-no-fixed-peg`         | Apyx says apxUSD is not a strict peg                     | Apyx risk disclosure                  | Always attribute                |
| `apyx-token-status`         | Apyx describes $APYX as a future governance token        | Apyx token docs                       | Do not imply current trading    |
| `solana-launch`             | Two initialized Apyx SPL Token mints exist on mainnet    | Apyx registry + Solana RPC            | Not proof of liquidity/reserves |
| `holder-rights`             | Tokens are claims against protocol modules               | Controlling Apyx Terms                | Not direct STRC/SATA ownership  |
| `jurisdiction-restrictions` | Protocol access is jurisdiction-dependent                | Controlling Apyx Terms                | Re-check before publication     |
| `audit-scope-boundary`      | Scoped reports do not imply system-wide assurance        | Apyx index + Halborn report           | One of five reports mapped      |
| `author-experience`         | Juan has 20 years of IT/software architecture experience | Author professional profile           | Voice context only              |

## Uncertain

| Claim ID | Claim                                      | Why uncertain                                       | Required evidence                            |
| -------- | ------------------------------------------ | --------------------------------------------------- | -------------------------------------------- |
| —        | No unresolved claim retained in the thread | Solana deployment resolved through registry and RPC | Frontend/liquidity remain separate questions |

## Rejected

| Claim                                  | Reason                                                          |
| -------------------------------------- | --------------------------------------------------------------- |
| Digital Credit removes credit risk     | Representation does not change issuer capacity                  |
| Preferred dividends are guaranteed     | Declaration/default risk remains                                |
| apxUSD is always worth one dollar      | Contradicted by Apyx’s no-fixed-peg disclosure                  |
| Any current APY, TVL, supply or volume | Time-sensitive and unnecessary; needs publication-day evidence  |
| Solana deployment proves liquidity     | Mint existence does not establish liquidity or bridge safety    |
| Broad audit/security assurance claims  | Reports exist; scope and unresolved findings need review        |
| Token holders directly own STRC/SATA   | Terms define claims against protocol modules, not issuers       |
| Apyx access is global                  | Current Terms restrict several major jurisdictions              |
| Retained token authority implies abuse | Authority is a control surface; intent/use needs other evidence |
