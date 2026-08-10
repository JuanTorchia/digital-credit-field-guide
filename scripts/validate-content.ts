import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { parseTweet } from 'twitter-text';
import { claimSchema, sourceSchema } from '../lib/content/schema';
const root = resolve(import.meta.dirname, '..');
async function main() {
  const errors: string[] = [];
  const sources = sourceSchema
    .array()
    .safeParse(
      JSON.parse(await readFile(resolve(root, 'data/sources.json'), 'utf8')),
    );
  const claims = claimSchema
    .array()
    .safeParse(
      JSON.parse(await readFile(resolve(root, 'data/claims.json'), 'utf8')),
    );
  if (!sources.success) errors.push(`sources.json: ${sources.error.message}`);
  if (!claims.success) errors.push(`claims.json: ${claims.error.message}`);
  if (sources.success && claims.success) {
    const ids = new Set(sources.data.map((s) => s.id));
    for (const claim of claims.data) {
      for (const id of claim.sourceIds)
        if (!ids.has(id)) errors.push(`${claim.id}: orphan sourceId ${id}`);
      if (/\d/.test(claim.claim) && (!claim.asOf || !claim.notes))
        errors.push(
          `${claim.id}: quantitative/material claim lacks date or context`,
        );
    }
    const thread = await readFile(resolve(root, 'content/thread.md'), 'utf8');
    const prose = thread
      .split('\n')
      .filter(
        (l) =>
          !/^#{1,6}\s+/.test(l) && !/^Visual:/.test(l) && !/^Status:/.test(l),
      )
      .join('\n');
    const prohibited = /\b(guaranteed|risk-free|safe yield)\b/gi;
    for (const match of prose.matchAll(prohibited)) {
      const line = prose.slice(0, match.index).split('\n').length;
      errors.push(
        `thread.md:${line}: prohibited promise language “${match[0]}”`,
      );
    }
    const numbers = [
      ...prose.matchAll(/(?<![$A-Za-z])\b\d+(?:\.\d+)?%?\b/g),
    ].map((m) => m[0]);
    const ledgerText = claims.data
      .map((c) => `${c.claim} ${c.notes}`)
      .join(' ');
    for (const n of new Set(numbers))
      if (!ledgerText.includes(n))
        errors.push(
          `thread.md: numeric figure ${n} is absent from claim ledger`,
        );
    if (!thread.includes('@Apyx_Fi'))
      errors.push('thread.md: missing @Apyx_Fi');
    if (!thread.includes('$APYX')) errors.push('thread.md: missing $APYX');
    const posts = thread.split(/^## \d+\/\d+\s*$/m).slice(1);
    for (const [index, post] of posts.entries()) {
      const body = post
        .split('\n')
        .filter((line) => !line.startsWith('Visual:'))
        .join('\n')
        .trim();
      const parsedTweet = parseTweet(body);
      if (!parsedTweet.valid || parsedTweet.weightedLength > 280)
        errors.push(
          `thread.md post ${index + 1}: invalid weighted X length ${parsedTweet.weightedLength}`,
        );
    }

    const mintEvidence = JSON.parse(
      await readFile(resolve(root, 'data/solana-mint-evidence.json'), 'utf8'),
    ) as {
      slot?: number;
      observations?: Record<string, unknown>;
      rawResponse?: string;
    };
    if (!mintEvidence.slot || !mintEvidence.rawResponse)
      errors.push('solana-mint-evidence.json: missing slot or raw response');
    if (
      mintEvidence.observations?.bothRetainMintAuthority !== true ||
      mintEvidence.observations?.bothRetainFreezeAuthority !== true
    )
      errors.push('solana-mint-evidence.json: authority state not explicit');
    if (mintEvidence.rawResponse)
      await readFile(resolve(root, mintEvidence.rawResponse), 'utf8').catch(
        () => errors.push('solana-mint-evidence.json: raw response is missing'),
      );
  }
  if (errors.length) {
    console.error(`Content validation failed:\n- ${errors.join('\n- ')}`);
    process.exit(1);
  }
  console.log(
    `Content validation passed: ${sources.success ? sources.data.length : 0} sources, ${claims.success ? claims.data.length : 0} claims.`,
  );
}
void main();
