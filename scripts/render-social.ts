import { mkdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import sharp from 'sharp';
type Card = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  kind: string;
};
const root = resolve(import.meta.dirname, '..');
const esc = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&apos;',
      })[c]!,
  );
const wrap = (s: string, max = 31) => {
  const words = s.split(' '),
    lines: string[] = [];
  let line = '';
  for (const word of words) {
    if (`${line} ${word}`.trim().length > max) {
      lines.push(line);
      line = word;
    } else line = `${line} ${word}`.trim();
  }
  if (line) lines.push(line);
  return lines;
};
async function main() {
  const cards = JSON.parse(
    await readFile(resolve(root, 'data/cards.json'), 'utf8'),
  ) as Card[];
  const out = resolve(root, 'public/social');
  await mkdir(out, { recursive: true });
  for (const [index, card] of cards.entries()) {
    const lines = wrap(card.title);
    const tspans = lines
      .map((l, i) => `<tspan x="112" dy="${i ? 68 : 0}">${esc(l)}</tspan>`)
      .join('');
    const subtitle = wrap(card.subtitle, 78)
      .map(
        (line, i) => `<tspan x="112" dy="${i ? 36 : 0}">${esc(line)}</tspan>`,
      )
      .join('');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900"><rect width="1600" height="900" fill="#f4f2ea"/><path d="M0 0H1600V22H0z" fill="#d9ff63"/><circle cx="1450" cy="120" r="210" fill="none" stroke="#b84f2c" stroke-width="2"/><path d="M112 744H1488" stroke="#172019"/><text x="112" y="102" font-family="Arial,sans-serif" font-size="22" letter-spacing="4" fill="#b84f2c">${esc(card.eyebrow)}</text><text x="112" y="235" font-family="Georgia,serif" font-size="58" font-weight="700" fill="#172019">${tspans}</text><text x="112" y="650" font-family="Arial,sans-serif" font-size="28" fill="#4b554c">${subtitle}</text><text x="112" y="810" font-family="monospace" font-size="20" letter-spacing="3" fill="#172019">DC / FIELD GUIDE</text><text x="1488" y="810" text-anchor="end" font-family="monospace" font-size="20" fill="#172019">0${index + 1} — JUAN TORCHIA</text></svg>`;
    await sharp(Buffer.from(svg))
      .png({ compressionLevel: 9, adaptiveFiltering: false })
      .toFile(resolve(out, `${card.id}.png`));
    console.log(`rendered ${card.id}.png`);
  }
}
void main();
