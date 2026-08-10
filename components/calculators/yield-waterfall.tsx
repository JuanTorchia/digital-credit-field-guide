'use client';
import { useMemo, useState } from 'react';
export function calculateNet(gross: number, costs: number, reserves: number) {
  return Math.max(0, gross - costs - reserves);
}
export function YieldWaterfall() {
  const [gross, setGross] = useState(100),
    [costs, setCosts] = useState(12),
    [reserves, setReserves] = useState(18);
  const net = useMemo(
    () => calculateNet(gross, costs, reserves),
    [gross, costs, reserves],
  );
  return (
    <section
      className="my-20 bg-[#dedbd0] p-6 sm:p-10"
      aria-labelledby="waterfall-title"
    >
      <p className="label">Hypothetical model / not a forecast</p>
      <h2 id="waterfall-title" className="display mt-3 text-5xl">
        Yield is a waterfall, not a headline.
      </h2>
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-5">
          {[
            ['Gross cash flow', gross, setGross],
            ['Costs & friction', costs, setCosts],
            ['Reserve retained', reserves, setReserves],
          ].map(([label, value, setter]) => (
            <label key={label as string} className="block">
              <span className="flex justify-between text-sm">
                <span>{label as string}</span>
                <output>{value as number} units</output>
              </span>
              <input
                className="mt-2 w-full accent-[#b84f2c]"
                type="range"
                min="0"
                max="120"
                value={value as number}
                onChange={(e) =>
                  (setter as (n: number) => void)(Number(e.target.value))
                }
              />
            </label>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 self-end sm:grid-cols-4">
          {[
            ['Gross', gross],
            ['Costs', -costs],
            ['Reserve', -reserves],
            ['Net', net],
          ].map(([label, value]) => (
            <div
              key={label as string}
              className={`border border-[#172019] p-4 ${label === 'Net' ? 'bg-[#d9ff63]' : ''}`}
            >
              <p className="label">{label}</p>
              <p className="mt-4 text-3xl font-semibold">{value as number}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-7 max-w-3xl text-sm leading-relaxed text-[#596159]">
        Units are deliberately abstract. This model shows the accounting
        questions a reader should ask; it does not model Apyx, an issuer, an APY
        or a future outcome.
      </p>
    </section>
  );
}
