'use client';

import { useState, type KeyboardEvent } from 'react';
import claims from '@/data/claims.json';
import sources from '@/data/sources.json';
import trace from '@/data/system-trace.json';

const sourceById = new Map(sources.map((source) => [source.id, source]));
const claimById = new Map(claims.map((claim) => [claim.id, claim]));

export function FlowExplorer() {
  const [active, setActive] = useState(0);
  const step = trace[active];
  const claim = claimById.get(step.claimId);

  function moveFocus(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      next = (index + 1) % trace.length;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      next = (index - 1 + trace.length) % trace.length;
    } else if (event.key === 'Home') {
      next = 0;
    } else if (event.key === 'End') {
      next = trace.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setActive(next);
    document.getElementById(`trace-tab-${trace[next].id}`)?.focus();
  }

  return (
    <section
      aria-labelledby="flow-title"
      className="my-20 border-y border-[#172019] py-10"
    >
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="label">Interactive / Apyx system trace</p>
          <h2 id="flow-title" className="display mt-3 text-5xl">
            Follow the value. Audit every boundary.
          </h2>
        </div>
        <p className="label" aria-live="polite">
          {active + 1} / {trace.length}
        </p>
      </div>

      <div
        role="tablist"
        aria-label="Apyx system boundaries"
        className="mt-10 grid gap-2 sm:grid-cols-3 lg:grid-cols-6"
      >
        {trace.map((item, index) => (
          <button
            key={item.id}
            id={`trace-tab-${item.id}`}
            role="tab"
            aria-controls="trace-panel"
            aria-selected={active === index}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => moveFocus(event, index)}
            className={`min-h-24 border p-3 text-left transition-colors ${active === index ? 'border-[#172019] bg-[#d9ff63]' : 'border-[#c9c7bd] bg-transparent hover:bg-white'}`}
          >
            <span className="label">0{index + 1}</span>
            <span className="mt-2 block font-semibold">{item.name}</span>
            <span className="mt-1 block text-xs text-[#596159]">
              {item.domain}
            </span>
          </button>
        ))}
      </div>

      <div
        id="trace-panel"
        role="tabpanel"
        aria-labelledby={`trace-tab-${step.id}`}
        className="mt-4 bg-[#172019] p-6 text-[#f4f2ea] sm:p-9"
      >
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="label text-[#d9ff63]">{step.domain}</p>
            <h3 className="display mt-3 text-4xl">{step.name}</h3>
            <p className="mt-4 text-xl leading-relaxed">{step.mechanism}</p>
            {claim && (
              <p className="mt-5 border-l border-[#d9ff63] pl-4 text-sm text-[#c9c7bd]">
                Ledger claim: <code>{claim.id}</code> · {claim.factOrInference}{' '}
                · {claim.confidence} confidence · as of {claim.asOf}
              </p>
            )}
          </div>

          <div className="grid gap-4 text-sm">
            <div className="border border-[#687068] p-4">
              <p className="label text-[#d9ff63]">Evidence supports</p>
              <p className="mt-2 leading-relaxed">{step.proves}</p>
            </div>
            <div className="border border-[#687068] p-4">
              <p className="label text-[#f3a888]">Evidence does not support</p>
              <p className="mt-2 leading-relaxed">{step.doesNotProve}</p>
            </div>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap gap-3 border-t border-[#687068] pt-5">
          {step.sourceIds.map((sourceId) => {
            const source = sourceById.get(sourceId);
            return source ? (
              <a
                key={sourceId}
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="border border-[#687068] px-3 py-2 text-xs font-semibold hover:border-[#d9ff63] focus-visible:border-[#d9ff63]"
              >
                {source.publisher}: {source.title} ↗
              </a>
            ) : null;
          })}
        </div>
      </div>
    </section>
  );
}
