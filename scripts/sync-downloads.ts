import { copyFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const output = resolve(root, 'public/downloads');
const artifacts = [
  ['content/thread.md', 'unpublished-x-thread.md'],
  ['docs/claim-ledger.md', 'claim-ledger.md'],
  ['data/claims.json', 'claims.json'],
  ['data/sources.json', 'sources.json'],
  ['data/system-trace.json', 'system-trace.json'],
  ['data/solana-mint-evidence.json', 'solana-mint-evidence.json'],
] as const;

async function main() {
  await mkdir(output, { recursive: true });
  for (const [source, filename] of artifacts) {
    await copyFile(resolve(root, source), resolve(output, filename));
    console.log(`synced ${filename}`);
  }
}

void main();
