import { mkdir, readFile, readdir, unlink } from 'node:fs/promises';
import { resolve } from 'node:path';
import sharp from 'sharp';

type Card = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  kind: string;
  panels?: Array<{ label: string; value: string; note: string }>;
  items?: string[];
  callout?: string;
};

const root = resolve(import.meta.dirname, '..');
const esc = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&apos;',
      })[character]!,
  );

const wrap = (value: string, maximum = 34) => {
  const lines: string[] = [];
  let line = '';
  for (const word of value.split(' ')) {
    if (`${line} ${word}`.trim().length > maximum) {
      if (line) lines.push(line);
      line = word;
    } else {
      line = `${line} ${word}`.trim();
    }
  }
  if (line) lines.push(line);
  return lines;
};

const textLines = (
  lines: string[],
  x: number,
  y: number,
  size: number,
  gap: number,
  family = 'Arial,sans-serif',
) =>
  `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" fill="#172019">${lines
    .map(
      (line, index) =>
        `<tspan x="${x}" dy="${index ? gap : 0}">${esc(line)}</tspan>`,
    )
    .join('')}</text>`;

const generic = (card: Card) =>
  `${textLines(wrap(card.title), 112, 255, 62, 72, 'Georgia,serif')}
   ${textLines(wrap(card.subtitle, 76), 112, 642, 28, 36)}`;

const thesis = (card: Card) => {
  const panels = card.panels ?? [];
  return `${textLines(wrap(card.title, 42), 112, 205, 54, 62, 'Georgia,serif')}
    ${panels
      .map((panel, index) => {
        const x = 112 + index * 460;
        return `<rect x="${x}" y="350" width="410" height="210" rx="8" fill="${index === 2 ? '#d9ff63' : index === 1 ? '#172019' : '#fff'}" stroke="#172019"/>
          <text x="${x + 28}" y="400" font-family="monospace" font-size="17" letter-spacing="2" fill="${index === 1 ? '#d9ff63' : '#b84f2c'}">${esc(panel.label)}</text>
          <text x="${x + 28}" y="455" font-family="Georgia,serif" font-size="30" fill="${index === 1 ? '#f4f2ea' : '#172019'}">${esc(panel.value)}</text>
          <text x="${x + 28}" y="510" font-family="Arial,sans-serif" font-size="19" fill="${index === 1 ? '#d5d8d2' : '#596159'}">${esc(panel.note)}</text>
          ${index < panels.length - 1 ? `<path d="M${x + 410} 455h50" stroke="#b84f2c" stroke-width="3"/><path d="m${x + 450} 447 10 8-10 8" fill="none" stroke="#b84f2c" stroke-width="3"/>` : ''}`;
      })
      .join('')}
    <text x="112" y="650" font-family="Arial,sans-serif" font-size="27" font-weight="700" fill="#172019">${esc(card.callout ?? '')}</text>`;
};

const definition = (card: Card) => {
  const panels = card.panels ?? [];
  return `${textLines(wrap(card.title, 58), 112, 190, 42, 50, 'Georgia,serif')}
    ${panels
      .map((panel, index) => {
        const x = 112 + index * 460;
        return `<rect x="${x}" y="330" width="420" height="250" rx="8" fill="${index === 1 ? '#fff' : '#e9e7de'}" stroke="#172019"/>
          <text x="${x + 26}" y="380" font-family="monospace" font-size="17" letter-spacing="2" fill="#b84f2c">${esc(panel.label)}</text>
          <text x="${x + 26}" y="440" font-family="Georgia,serif" font-size="31" fill="#172019">${esc(panel.value)}</text>
          ${textLines(wrap(panel.note, 34), x + 26, 496, 19, 27)}`;
      })
      .join('')}
    <rect x="112" y="620" width="1340" height="58" fill="#172019"/>
    <text x="138" y="658" font-family="Arial,sans-serif" font-size="23" fill="#f4f2ea">${esc(card.callout ?? '')}</text>`;
};

const checklist = (card: Card) => {
  const items = card.items ?? [];
  return `${textLines(wrap(card.title, 48), 112, 190, 46, 54, 'Georgia,serif')}
    ${items
      .map((item, index) => {
        const column = index % 2;
        const row = Math.floor(index / 2);
        const x = 112 + column * 690;
        const y = 285 + row * 86;
        return `<rect x="${x}" y="${y}" width="660" height="68" rx="6" fill="${row % 2 === 0 ? '#fff' : '#e9e7de'}" stroke="#c9c7bd"/>
          <text x="${x + 20}" y="${y + 42}" font-family="monospace" font-size="17" fill="#b84f2c">0${index + 1}</text>
          <text x="${x + 78}" y="${y + 43}" font-family="Arial,sans-serif" font-size="25" fill="#172019">${esc(item)}</text>`;
      })
      .join('')}
    <text x="112" y="680" font-family="Arial,sans-serif" font-size="26" font-weight="700" fill="#172019">${esc(card.callout ?? '')}</text>`;
};

const flow = () => {
  const nodes = [
    ['CAPITAL', 'accepted assets'],
    ['SECURITIES', 'STRC / SATA'],
    ['DIVIDENDS', 'if declared'],
    ['TREASURY', 'custody + ops'],
    ['VAULT', 'accounting'],
    ['TOKEN', 'user balance'],
  ];
  return `<line x1="1060" y1="190" x2="1060" y2="720" stroke="#b84f2c" stroke-width="3" stroke-dasharray="10 10"/>
    <text x="1036" y="170" text-anchor="end" font-family="monospace" font-size="18" fill="#b84f2c">OFFCHAIN</text>
    <text x="1084" y="170" font-family="monospace" font-size="18" fill="#b84f2c">ONCHAIN</text>
    ${nodes
      .map(([name, note], index) => {
        const x = 94 + index * 246;
        return `<rect x="${x}" y="330" width="205" height="150" rx="8" fill="${index > 3 ? '#d9ff63' : '#fff'}" stroke="#172019"/>
          <text x="${x + 18}" y="374" font-family="monospace" font-size="17" fill="#b84f2c">0${index + 1}</text>
          <text x="${x + 18}" y="414" font-family="Arial,sans-serif" font-size="20" font-weight="700" fill="#172019">${name}</text>
          <text x="${x + 18}" y="449" font-family="Arial,sans-serif" font-size="17" fill="#596159">${note}</text>
          ${index < nodes.length - 1 ? `<path d="M${x + 205} 405H${x + 238}" stroke="#172019" stroke-width="2"/><path d="m${x + 231} 398 8 7-8 7" fill="none" stroke="#172019" stroke-width="2"/>` : ''}`;
      })
      .join('')}
    <text x="112" y="650" font-family="Georgia,serif" font-size="38" fill="#172019">Each handoff may add capability—and always adds a dependency.</text>`;
};

const layers = () =>
  `<rect x="112" y="220" width="1376" height="210" rx="10" fill="#172019"/>
   <text x="152" y="272" font-family="monospace" font-size="18" fill="#d9ff63">WRAPPER / TECHNICAL CONTROL</text>
   <text x="152" y="340" font-family="Georgia,serif" font-size="40" fill="#f4f2ea">contracts · authorities · liquidity · integrations · regulation</text>
   <rect x="112" y="466" width="1376" height="210" rx="10" fill="#fff" stroke="#172019"/>
   <text x="152" y="518" font-family="monospace" font-size="18" fill="#b84f2c">UNDERLYING / ECONOMIC OBLIGATION</text>
   <text x="152" y="586" font-family="Georgia,serif" font-size="40" fill="#172019">issuer · dividend · market · custody · holder rights</text>
   <path d="M800 430v36" stroke="#b84f2c" stroke-width="4"/>
   <text x="800" y="732" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" fill="#596159">Visibility across a boundary does not neutralize either layer.</text>`;

const controls = () =>
  `<rect x="112" y="202" width="420" height="440" rx="10" fill="#172019"/>
   <text x="150" y="255" font-family="monospace" font-size="18" fill="#d9ff63">VERIFIED AT FINALIZED SLOT</text>
   <text x="150" y="326" font-family="Georgia,serif" font-size="44" fill="#f4f2ea">2 initialized</text>
   <text x="150" y="378" font-family="Georgia,serif" font-size="44" fill="#f4f2ea">SPL mints</text>
   <text x="150" y="455" font-family="Arial,sans-serif" font-size="23" fill="#d5d8d2">classic Token Program</text>
   <text x="150" y="494" font-family="Arial,sans-serif" font-size="23" fill="#d5d8d2">6 decimals</text>
   <text x="150" y="533" font-family="Arial,sans-serif" font-size="23" fill="#d5d8d2">mint authority retained</text>
   <text x="150" y="572" font-family="Arial,sans-serif" font-size="23" fill="#d5d8d2">freeze authority retained</text>
   <text x="594" y="245" font-family="monospace" font-size="18" fill="#b84f2c">WHAT THAT DOES NOT VERIFY</text>
   ${['reserves ↗', 'legitimate supply ↗', 'liquidity ↗', 'bridge / issuance path ↗', 'redemption accounting ↗'].map((item, index) => `<rect x="594" y="${278 + index * 72}" width="720" height="54" fill="#fff" stroke="#c9c7bd"/><text x="620" y="${314 + index * 72}" font-family="Arial,sans-serif" font-size="23" fill="#172019">${item}</text>`).join('')}
   <text x="594" y="688" font-family="Arial,sans-serif" font-size="22" fill="#596159">Authority is a control to identify—not evidence of misuse.</text>`;

const compare = () => {
  const rows = [
    ['BANK DEPOSIT', 'bank', 'account rails', 'bank + access'],
    ['TREASURY BILL', 'sovereign', 'broker / token', 'rate + custody'],
    [
      'DAT PREFERRED',
      'corporate equity',
      'broker / token',
      'issuer + dividend',
    ],
    [
      'DEFI STRATEGY',
      'protocol positions',
      'smart contracts',
      'code + liquidity',
    ],
  ];
  return `<text x="112" y="203" font-family="Georgia,serif" font-size="38" fill="#172019">Start with the obligation. Then inspect the rail.</text>
   ${['INSTRUMENT', 'ECONOMIC SOURCE', 'ACCESS RAIL', 'PRIMARY SURFACE'].map((heading, index) => `<text x="${112 + index * 360}" y="270" font-family="monospace" font-size="16" fill="#b84f2c">${heading}</text>`).join('')}
   ${rows.map((row, rowIndex) => row.map((cell, columnIndex) => `<rect x="${112 + columnIndex * 360}" y="${292 + rowIndex * 88}" width="340" height="70" fill="${rowIndex % 2 ? '#fff' : '#e9e7de'}"/><text x="${130 + columnIndex * 360}" y="${335 + rowIndex * 88}" font-family="Arial,sans-serif" font-size="${columnIndex === 0 ? 18 : 20}" font-weight="${columnIndex === 0 ? 700 : 400}" fill="#172019">${cell}</text>`).join('')).join('')}`;
};

const body = (card: Card) => {
  if (card.kind === 'thesis') return thesis(card);
  if (card.kind === 'definition') return definition(card);
  if (card.kind === 'flow') return flow();
  if (card.kind === 'layers') return layers();
  if (card.kind === 'controls') return controls();
  if (card.kind === 'compare') return compare();
  if (card.kind === 'checklist') return checklist(card);
  return generic(card);
};

async function main() {
  const cards = JSON.parse(
    await readFile(resolve(root, 'data/cards.json'), 'utf8'),
  ) as Card[];
  const output = resolve(root, 'public/social');
  await mkdir(output, { recursive: true });
  for (const filename of await readdir(output)) {
    if (filename.endsWith('.png')) await unlink(resolve(output, filename));
  }

  for (const [index, card] of cards.entries()) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900">
      <rect width="1600" height="900" fill="#f4f2ea"/>
      <path d="M0 0H1600V22H0z" fill="#d9ff63"/>
      <text x="112" y="104" font-family="Arial,sans-serif" font-size="22" letter-spacing="4" fill="#b84f2c">${esc(card.eyebrow)}</text>
      ${body(card)}
      <path d="M112 780H1488" stroke="#172019"/>
      <text x="112" y="832" font-family="monospace" font-size="20" letter-spacing="3" fill="#172019">DC / FIELD GUIDE</text>
      <text x="1488" y="832" text-anchor="end" font-family="monospace" font-size="20" fill="#172019">0${index + 1} — JUAN TORCHIA</text>
    </svg>`;
    await sharp(Buffer.from(svg))
      .png({ compressionLevel: 9, adaptiveFiltering: false })
      .toFile(resolve(output, `${card.id}.png`));
    console.log(`rendered ${card.id}.png`);
  }

  const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <rect width="1200" height="630" fill="#f4f2ea"/>
    <path d="M0 0H1200V18H0z" fill="#d9ff63"/>
    <text x="76" y="82" font-family="Arial,sans-serif" font-size="18" letter-spacing="4" fill="#b84f2c">DIGITAL CREDIT FIELD GUIDE</text>
    <text x="76" y="166" font-family="Georgia,serif" font-size="52" fill="#172019">The interface is not the obligation.</text>
    ${[
      ['UNDERLYING', 'Listed preferred equity'],
      ['PROTOCOL', 'Treasury + modules'],
      ['TOKEN RAIL', 'Solana representation'],
    ]
      .map(([label, value], index) => {
        const x = 76 + index * 360;
        return `<rect x="${x}" y="250" width="320" height="150" rx="7" fill="${index === 1 ? '#172019' : index === 2 ? '#d9ff63' : '#fff'}" stroke="#172019"/>
          <text x="${x + 22}" y="294" font-family="monospace" font-size="15" letter-spacing="2" fill="${index === 1 ? '#d9ff63' : '#b84f2c'}">${label}</text>
          <text x="${x + 22}" y="350" font-family="Georgia,serif" font-size="25" fill="${index === 1 ? '#f4f2ea' : '#172019'}">${value}</text>`;
      })
      .join('')}
    <text x="76" y="492" font-family="Arial,sans-serif" font-size="24" font-weight="700" fill="#172019">A source-led systems trace of Apyx and Digital Credit.</text>
    <path d="M76 546H1124" stroke="#172019"/>
    <text x="76" y="585" font-family="monospace" font-size="16" letter-spacing="2" fill="#172019">RESEARCH &amp; ENGINEERING — JUAN TORCHIA</text>
  </svg>`;
  await sharp(Buffer.from(og))
    .png({ compressionLevel: 9, adaptiveFiltering: false })
    .toFile(resolve(root, 'app/opengraph-image.png'));
  console.log('rendered app/opengraph-image.png');
}

void main();
