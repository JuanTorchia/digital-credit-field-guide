import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { parseTweet } from 'twitter-text';
import {
  cardSchema,
  claimSchema,
  scenarioSchema,
  sourceSchema,
  traceStepSchema,
} from '../lib/content/schema';
const root = resolve(import.meta.dirname, '..');

const prohibited = /\b(guaranteed|risk-free|safe yield)\b/gi;

async function filesIn(directory: string, extensions: string[]) {
  const entries = await readdir(resolve(root, directory), {
    withFileTypes: true,
    recursive: true,
  });
  return entries
    .filter(
      (entry) =>
        entry.isFile() && extensions.some((ext) => entry.name.endsWith(ext)),
    )
    .map((entry) => resolve(entry.parentPath, entry.name));
}

function uniqueIds(label: string, ids: string[], errors: string[]) {
  const seen = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) errors.push(`${label}: duplicate id ${id}`);
    seen.add(id);
  }
}

function visibleMdx(raw: string) {
  return raw
    .replace(/^import .*$/gm, '')
    .replace(/<[\s\S]*?>/g, ' ')
    .replace(/\{['"]([\s\S]*?)['"]\}/g, '$1');
}

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
    uniqueIds(
      'sources.json',
      sources.data.map((source) => source.id),
      errors,
    );
    uniqueIds(
      'claims.json',
      claims.data.map((claim) => claim.id),
      errors,
    );
    const ids = new Set(sources.data.map((s) => s.id));
    for (const claim of claims.data) {
      for (const id of claim.sourceIds)
        if (!ids.has(id)) errors.push(`${claim.id}: orphan sourceId ${id}`);
      if (
        /\d/.test(claim.claim) &&
        !/\bUnits?(?:\/context)?:/i.test(claim.notes)
      )
        errors.push(
          `${claim.id}: quantitative claim lacks an explicit unit/context note`,
        );
      if (
        claim.status === 'verified' &&
        !claim.sourceIds.some(
          (sourceId) => sources.data.find((s) => s.id === sourceId)?.primary,
        )
      )
        errors.push(`${claim.id}: verified claim lacks a primary source`);
    }
    const thread = await readFile(resolve(root, 'content/thread.md'), 'utf8');
    const prose = thread
      .split('\n')
      .filter(
        (l) =>
          !/^#{1,6}\s+/.test(l) && !/^Visual:/.test(l) && !/^Status:/.test(l),
      )
      .join('\n');
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

    const report = await readFile(resolve(root, 'content/report.mdx'), 'utf8');
    const reportProse = visibleMdx(report);
    for (const match of reportProse.matchAll(prohibited))
      errors.push(`report.mdx: prohibited promise language “${match[0]}”`);
    const reportNumbers = [
      ...reportProse.matchAll(/(?<![$A-Za-z])\b\d+(?:\.\d+)?%?\b/g),
    ].map((match) => match[0]);
    for (const number of new Set(reportNumbers))
      if (!ledgerText.includes(number))
        errors.push(
          `report.mdx: numeric figure ${number} is absent from claim ledger`,
        );

    const trace = traceStepSchema
      .array()
      .safeParse(
        JSON.parse(
          await readFile(resolve(root, 'data/system-trace.json'), 'utf8'),
        ),
      );
    if (!trace.success) {
      errors.push(`system-trace.json: ${trace.error.message}`);
    } else {
      uniqueIds(
        'system-trace.json',
        trace.data.map((step) => step.id),
        errors,
      );
      const claimIds = new Set(claims.data.map((claim) => claim.id));
      for (const step of trace.data) {
        if (!claimIds.has(step.claimId))
          errors.push(`${step.id}: orphan claimId ${step.claimId}`);
        for (const sourceId of step.sourceIds)
          if (!ids.has(sourceId))
            errors.push(`${step.id}: orphan sourceId ${sourceId}`);
      }
    }

    const cards = cardSchema
      .array()
      .safeParse(
        JSON.parse(await readFile(resolve(root, 'data/cards.json'), 'utf8')),
      );
    if (!cards.success) {
      errors.push(`cards.json: ${cards.error.message}`);
    } else {
      if (cards.data.length < 5 || cards.data.length > 7)
        errors.push(
          `cards.json: expected 5–7 cards, found ${cards.data.length}`,
        );
      uniqueIds(
        'cards.json',
        cards.data.map((card) => card.id),
        errors,
      );
    }

    const scenarios = scenarioSchema
      .array()
      .safeParse(
        JSON.parse(
          await readFile(resolve(root, 'data/scenarios.json'), 'utf8'),
        ),
      );
    if (!scenarios.success) {
      errors.push(`scenarios.json: ${scenarios.error.message}`);
    } else {
      uniqueIds(
        'scenarios.json',
        scenarios.data.map((scenario) => scenario.id),
        errors,
      );
      for (const scenario of scenarios.data)
        if (scenario.costs + scenario.reserves > scenario.grossCashFlow * 2)
          errors.push(`${scenario.id}: deductions exceed model safety bound`);
    }

    const publishedCode = await filesIn('app', ['.tsx']);
    publishedCode.push(...(await filesIn('components', ['.tsx'])));
    for (const filename of publishedCode) {
      const body = await readFile(filename, 'utf8');
      for (const match of body.matchAll(prohibited))
        errors.push(
          `${filename.replace(`${root}/`, '')}: prohibited promise language “${match[0]}”`,
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
