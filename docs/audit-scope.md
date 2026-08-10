# Security-assessment scope ledger

As of 2026-08-10 UTC. A listed assessment is evidence about a defined scope,
not a certification of the full hybrid system.

| Report                    | Chain / system                          | Files or components                       | Assessed / remediation commit | Findings summary                                                                                                                          | Explicit exclusions                                                    | Status     |
| ------------------------- | --------------------------------------- | ----------------------------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------- |
| Halborn, June 2026        | EVM / ERC-4626 vault and unlock receipt | `src/ApyUSD.sol`, `src/UnlockReceipt.sol` | `ff15937` / `35fa118`         | 10 reported: 1 medium, 2 low, 7 informational; report says all reported findings addressed, with some informational findings acknowledged | Third-party dependencies, economic attacks, features after remediation | mapped     |
| Quantstamp, April 2026    | Bridged-token assessment                | Pending full report extraction            | pending                       | pending                                                                                                                                   | pending                                                                | incomplete |
| Certora, March 2026       | apxUSD assessment                       | Pending full report extraction            | pending                       | pending                                                                                                                                   | pending                                                                | incomplete |
| Zellic, March 2026        | Apyx stablecoin assessment              | Pending full report extraction            | pending                       | pending                                                                                                                                   | pending                                                                | incomplete |
| Quantstamp, February 2026 | apxUSD stablecoin assessment            | Pending full report extraction            | pending                       | pending                                                                                                                                   | pending                                                                | incomplete |

## Interpretation rule

The Halborn report supports only the statement that specific EVM contracts at
specific commits received the documented assessment and remediation treatment.
It does not independently establish Solana mint safety, reserves, custody,
bridging, legal rights, economic robustness or security of later deployments.
