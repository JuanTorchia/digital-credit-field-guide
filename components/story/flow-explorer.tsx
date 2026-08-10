'use client';
import { useState } from 'react';
const steps = [
  {
    name: 'Capital',
    detail:
      'A user or permissioned participant supplies accepted assets. Access conditions matter.',
  },
  {
    name: 'Instrument',
    detail:
      'The offchain treasury acquires preferred securities and liquid assets. Issuer and market risk begin here.',
  },
  {
    name: 'Cash flow',
    detail:
      'Declared dividends are collected offchain. Dividend timing and amount can change.',
  },
  {
    name: 'Infrastructure',
    detail:
      'Custody, treasury operations and the onchain vault connect two legal and technical domains.',
  },
  {
    name: 'User',
    detail:
      'A token balance exposes the user to the wrapper’s liquidity, contract and regulatory conditions.',
  },
];
export function FlowExplorer() {
  const [active, setActive] = useState(0);
  return (
    <section
      aria-labelledby="flow-title"
      className="my-20 border-y border-[#172019] py-10"
    >
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="label">Interactive / 01</p>
          <h2 id="flow-title" className="display mt-3 text-5xl">
            Follow the value. Mark every handoff.
          </h2>
        </div>
        <p className="label">
          {active + 1} / {steps.length}
        </p>
      </div>
      <div
        role="tablist"
        aria-label="Credit flow steps"
        className="mt-10 grid gap-2 sm:grid-cols-5"
      >
        {steps.map((s, i) => (
          <button
            key={s.name}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={`min-h-20 border p-3 text-left transition-colors ${active === i ? 'border-[#172019] bg-[#d9ff63]' : 'border-[#c9c7bd] bg-transparent hover:bg-white'}`}
          >
            <span className="label">0{i + 1}</span>
            <span className="mt-2 block font-semibold">{s.name}</span>
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        className="mt-4 min-h-36 bg-[#172019] p-6 text-[#f4f2ea] sm:p-9"
      >
        <p className="label text-[#d9ff63]">{steps[active].name}</p>
        <p className="mt-4 max-w-3xl text-xl leading-relaxed">
          {steps[active].detail}
        </p>
      </div>
    </section>
  );
}
