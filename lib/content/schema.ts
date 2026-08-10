import { z } from 'zod';
export const sourceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  publisher: z.string().min(1),
  url: z.url(),
  sourceType: z.string().min(1),
  publishedAt: z.string().min(4),
  accessedAt: z.iso.date(),
  primary: z.boolean(),
  notes: z.string().min(1),
});
export const claimSchema = z.object({
  id: z.string().min(1),
  claim: z.string().min(1),
  sourceIds: z.array(z.string()).min(1),
  asOf: z.iso.date(),
  status: z.enum(['verified', 'uncertain', 'rejected']),
  confidence: z.enum(['high', 'medium', 'low']),
  factOrInference: z.enum(['fact', 'interpretation', 'inference']),
  notes: z.string().min(1),
});
export const scenarioSchema = z.object({
  id: z.string(),
  label: z.string(),
  grossCashFlow: z.number().nonnegative(),
  costs: z.number().nonnegative(),
  reserves: z.number().nonnegative(),
  note: z.string(),
});
export const traceStepSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  domain: z.string().min(1),
  claimId: z.string().min(1),
  mechanism: z.string().min(1),
  sourceIds: z.array(z.string().min(1)).min(1),
  proves: z.string().min(1),
  doesNotProve: z.string().min(1),
});
export const cardSchema = z.object({
  id: z.string().regex(/^\d{2}-[a-z0-9-]+$/),
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  kind: z.string().min(1),
  panels: z
    .array(
      z.object({
        label: z.string().min(1),
        value: z.string().min(1),
        note: z.string().min(1),
      }),
    )
    .optional(),
  items: z.array(z.string().min(1)).optional(),
  callout: z.string().min(1).optional(),
});
export type Source = z.infer<typeof sourceSchema>;
export type Claim = z.infer<typeof claimSchema>;
