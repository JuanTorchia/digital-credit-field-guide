# Claim ledger

As of 2026-08-10 UTC. Machine-readable records live in `data/claims.json`.

## Verified

| Claim ID                    | Short statement                                          | Evidence                              | Notes                          |
| --------------------------- | -------------------------------------------------------- | ------------------------------------- | ------------------------------ |
| `digital-credit-definition` | DAT preferred equity with credit-like cash flows         | Apyx thesis + issuer filings          | Narrow editorial definition    |
| `preferred-risk`            | Preferred is below debt; value/dividends can be impaired | Apyx risks + issuer filings           | Terms vary                     |
| `apyx-flow`                 | Offchain treasury → dividends → onchain vault            | Apyx architecture + transparency docs | Design, not performance        |
| `two-risk-layers`           | Underlying and wrapper risks differ                      | Apyx risks/how/terms                  | Editorial synthesis            |
| `onchain-programmability`   | Token rails add capabilities, not credit enhancement     | Solana docs + Apyx risks              | Editorial synthesis            |
| `strc-structure`            | STRC is Nasdaq-listed variable-rate perpetual preferred  | Strategy SEC filing                   | No price/yield claim           |
| `sata-structure`            | SATA is Nasdaq-listed variable-rate perpetual preferred  | Strive SEC filing                     | Dividends if and when declared |
| `apyx-no-fixed-peg`         | Apyx says apxUSD is not a strict peg                     | Apyx risk disclosure                  | Always attribute               |
| `apyx-token-status`         | Apyx describes $APYX as a future governance token        | Apyx token docs                       | Do not imply current trading   |

## Uncertain

| Claim ID        | Claim                                | Why uncertain                                                  | Required evidence                                  |
| --------------- | ------------------------------------ | -------------------------------------------------------------- | -------------------------------------------------- |
| `solana-launch` | Apyx is operationally live on Solana | Aug 7 bounty says launched; Aug 4 docs say support coming soon | Official announcement, addresses and current guide |

## Rejected

| Claim                                  | Reason                                                         |
| -------------------------------------- | -------------------------------------------------------------- |
| Digital Credit removes credit risk     | Representation does not change issuer capacity                 |
| Preferred dividends are guaranteed     | Declaration/default risk remains                               |
| apxUSD is always worth one dollar      | Contradicted by Apyx’s no-fixed-peg disclosure                 |
| Any current APY, TVL, supply or volume | Time-sensitive and unnecessary; needs publication-day evidence |
| Apyx is live on Solana                 | Conflicting official sources                                   |
| Audit/security assurance claims        | No audit report reviewed                                       |
