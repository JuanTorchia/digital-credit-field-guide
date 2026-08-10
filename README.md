# Digital Credit Field Guide

An original, source-led editorial package for Apyx’s “Why Digital Credit Matters” Superteam Earn bounty. The primary deliverable is an unpublished ten-post X thread; this site is its evidence layer.

## One-command setup

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm social:render
pnpm verify
pnpm exec playwright install chromium
pnpm test:e2e
```

Run locally with `pnpm dev`, then open http://localhost:3000.

## Architecture

- Next.js 16 App Router with static, server-rendered editorial routes.
- TypeScript strict and Tailwind CSS v4.
- JSON claim/source ledgers validated with Zod.
- MDX long-form source in `content/report.mdx`.
- Two small client islands: Credit Flow Explorer and hypothetical Yield Waterfall.
- Six deterministic 1600×900 PNG cards rendered from `data/cards.json` with Sharp.
- Vitest for model/data invariants; Playwright + axe for desktop/mobile smoke and accessibility.

## Data dictionary

`data/sources.json`: source identity, publisher, URL, type, publication/access dates, primary flag and notes.

`data/claims.json`: exact claim, source links, as-of date, verification status, confidence, fact/interpretation/inference label and caveat.

`data/scenarios.json`: hypothetical gross cash flow, costs and reserves in abstract units. Never forecasts.

`data/cards.json`: single source of truth for social-card copy and ordering.

## Content validation

`pnpm content:validate` rejects orphan source IDs, invalid source/claim shapes and URLs, unsourced material records, prohibited promise language, missing social requirements, and numeric thread figures absent from the claim ledger.

## Troubleshooting

- Missing cards: run `pnpm social:render` before `pnpm build`.
- Browser binary missing: run `pnpm exec playwright install chromium`.
- Google font fetch blocked during build: restore network access or replace `next/font/google` with checked-in local fonts.
- Link check returns a bot-protection status: 403 and 405 are treated as reachable; other failures require manual review.

## Human approval boundary

This repository does not publish to X, submit to Superteam, connect a wallet, spend credits or execute financial operations. Those actions remain explicitly manual.
