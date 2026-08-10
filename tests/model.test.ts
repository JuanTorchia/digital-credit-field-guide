import { describe, expect, it } from 'vitest';
import { calculateNet } from '@/components/calculators/yield-waterfall';
import sources from '@/data/sources.json';
import claims from '@/data/claims.json';
describe('educational model', () => {
  it('subtracts costs and reserves', () =>
    expect(calculateNet(100, 12, 18)).toBe(70));
  it('clamps a negative result at zero', () =>
    expect(calculateNet(10, 20, 5)).toBe(0));
  it('handles the zero boundary', () => expect(calculateNet(0, 0, 0)).toBe(0));
  it('keeps every claim linked to known evidence', () => {
    const ids = new Set(sources.map((s) => s.id));
    expect(claims.every((c) => c.sourceIds.every((id) => ids.has(id)))).toBe(
      true,
    );
  });
});
