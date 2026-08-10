# Digital Credit Field Guide

An original, source-led editorial package for Apyx’s “Why Digital Credit Matters” Superteam Earn bounty. The primary deliverable is an unpublished ten-post X thread; this site is its evidence layer.

## One-command setup

```bash
pnpm setup
pnpm verify
```

Run locally with `pnpm dev`, then open http://localhost:3000.

## Architecture

- Next.js 16 App Router with static, server-rendered editorial routes.
- TypeScript strict and Tailwind CSS v4.
- JSON claim/source ledgers validated with Zod.
- MDX long-form source in `content/report.mdx`.
- Two small client islands: Apyx System Trace and hypothetical Yield Waterfall.
- Seven deterministic 1600×900 PNG cards rendered from `data/cards.json` with Sharp.
- A deterministic 1200×630 Open Graph image and downloadable evidence bundle generated with the same artifact pipeline.
- Vitest for model/data invariants; Playwright + axe for desktop/mobile smoke and accessibility.

## Data dictionary

`data/sources.json`: source identity, publisher, URL, type, publication/access dates, primary flag and notes.

`data/claims.json`: exact claim, source links, as-of date, verification status, confidence, fact/interpretation/inference label and caveat.

`data/scenarios.json`: hypothetical gross cash flow, costs and reserves in abstract units. Never forecasts.

`data/cards.json`: single source of truth for social-card copy and ordering.

`data/system-trace.json`: six Apyx system boundaries with linked claims, sources, supported conclusions and explicit evidence limits.

`public/downloads/`: generated copies of the unpublished thread, ledgers, trace and reproducible Solana evidence. Edit the canonical files, then run `pnpm artifacts:render`.

`public/demo/`: five 1440×900 production-export captures corresponding to the 75-second storyboard in `docs/demo-script.md`.

## Content validation

`pnpm content:validate` checks sources, claims, MDX, thread, cards, scenarios and the system trace. It rejects duplicate or orphan IDs, invalid URLs, verified claims without primary evidence, quantitative claims without units/context, prohibited promise language, missing social requirements, and unsupported figures in the thread or report.

## Troubleshooting

- Missing cards: run `pnpm social:render` before `pnpm build`.
- Browser binary missing: run `pnpm exec playwright install chromium`.
- Google font fetch blocked during build: restore network access or replace `next/font/google` with checked-in local fonts.
- Link check returns bot protection/rate limiting: the result is reported as inconclusive, never as verified; review that URL manually before publication.

## Human approval boundary

This repository does not publish to X, submit to Superteam, connect a wallet, spend credits or execute financial operations. Those actions remain explicitly manual.
