# Human voice pass

Status: v3 voice approved by Juan on 2026-08-10 and promoted to the primary
unpublished thread. This document records editorial reasoning; it is not
evidence that a text was authored without tools.

## Public voice reference

The working corpus is Juan's English-language blog, especially posts where he:

- begins with a debugging or production situation;
- states what a tool can actually answer;
- moves from an observed limit to the next diagnostic action;
- uses first person to disclose judgment or incomplete evidence;
- takes a position without turning every paragraph into a slogan.

Primary references:

- `https://juanchi.dev/en/blog/prisma-query-logging-postgresql-orm-limits`
- `https://juanchi.dev/en/blog/functional-programming-typescript-fp-ts-what-it-teaches`
- `https://juanchi.dev/en/blog/npm-dependencies-how-to-evaluate-before-production`
- `https://juanchi.dev/en/blog/deepseek-api-typescript-secure-integration-model-evaluation`
- `https://juanchi.dev/en/blog/barman-vs-pgbackrest-postgresql-backup-decision-tree`

## Structural changes from v2

| v2 pattern                        | v3 decision                                                               |
| --------------------------------- | ------------------------------------------------------------------------- |
| Opens with a polished thesis      | Opens directly with the systems question                                  |
| Biography used as authority       | Removes the ambiguous “20 years designing systems” claim                  |
| Repeated `X—not Y` caveats        | Keeps one central contrast and explains other limits conversationally     |
| A framework in nearly every post  | Alternates definition, evidence, process, opinion and unresolved question |
| RPC result presented impersonally | Shows the verifiable result without inventing a personal chronology       |
| Eight-item noun checklist         | Ends with concrete questions a reader can ask                             |
| Sponsor case framed as conclusion | Treats Apyx as a system being inspected                                   |

## Human approval gate

Before publication, Juan must:

1. read all posts aloud;
2. mark any phrase he would not naturally say to another engineer;
3. confirm that “It tells me nothing, by itself…” and “My architecture sketch
   has two boxes” represent his actual judgment — confirmed 2026-08-10;
4. choose whether the tone toward Apyx feels fair;
5. approve the final English wording.

Passing an automated detector is not a goal and would not prove authorship.
