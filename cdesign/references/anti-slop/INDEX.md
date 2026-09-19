# Anti-Slop v2 router

Anti-Slop critiques an existing art direction. It does not generate one and must not flatten deliberate experimental work into a safe template.

**Core principle:** slop is usually a combination, not a single component.

## Severity

| Severity | Meaning | Action |
| --- | --- | --- |
| **HARD BAN** | Fabricated, deceptive, or falsely presented evidence | Immediate FAIL; remove or replace with truthful evidence |
| **DEFAULT REJECT** | A common generated default with no project-specific reason | Add `+2` when unjustified; justify and isolate it or redesign |
| **WATCHLIST** | Legal in isolation but generic when stacked | Add `+1`; inspect the cumulative combination |

Popularity is not guilt. A justified bento, marquee, serif hero, glass panel, magnetic control, or custom cursor can pass. A stack of them without a shared product reason should not.

## Always-on HARD BAN truth gate

These are the only Anti-Slop `HARD BAN` rules. They do not become acceptable through a low score or visual polish:

- fabricated metrics, benchmarks, usage counts, uptime, outcomes, or scarcity;
- fake testimonials, people, clients, integrations, partners, press, or logo rows;
- invented awards, rankings, certifications, licenses, compliance, official status, or affiliations;
- unsupported health, financial, legal, security, performance, or product claims;
- generated artifacts presented as real product data, transactions, documents, locations, or proof.

When proof is unavailable, show truthful process, supplied assets, real interface states, or a clearly labeled example. Detailed copy patterns live in [content.md](content.md); the truth gate remains authoritative here.

## Lazy-loading routes

Read only the index plus the modules triggered by the provisional or approved `DESIGN_GENOME`, or by visible QA evidence.

| Trigger | Load |
| --- | --- |
| typography carries identity | [typography.md](typography.md) |
| card/grid/editorial or SaaS/product structure | [composition.md](composition.md) |
| glass, grain, glow, gradients, 3D, illustration, or material effects | [visual.md](visual.md) |
| scroll-linked, cinematic, continuous, staggered, or kinetic direction | [motion.md](motion.md) + [interaction.md](interaction.md) |
| custom cursor, magnetic, drag, hover, sound, or gesture system | [interaction.md](interaction.md) |
| new or restructured copy, proof, pricing, FAQ, or claims | [content.md](content.md) |
| non-trivial breakpoint transformation, pinning, canvas, or spatial navigation | [responsive.md](responsive.md) |
| final rendered QA | [scoring.md](scoring.md) + [ai-fingerprint.md](ai-fingerprint.md), then reopen only modules implicated by the evidence |

For a typical product/SaaS page, start with `composition.md` and `content.md`. For an experimental piece, route by the actual mechanisms rather than loading everything.

## Boundary with QA

Accessibility, runtime, and responsive failures remain strict delivery blockers, but they are not automatically evidence of AI-slop. Examples include insufficient contrast, impractical touch targets, hidden required content, focus loss, horizontal overflow, scroll traps, missing reduced-motion behavior, and broken asset fallbacks. Judge them in `visual-qa.md` and project checks; do not inflate `SLOP_SCORE` by relabeling them `HARD BAN`.

## Provenance

The pattern prevalence and “AI fingerprint” descriptions in these modules are **heuristic/internal pattern research**, not externally documented facts, unless a source is explicitly recorded. Do not invent citations or claim measured model behavior from these heuristics. Project and reference provenance belongs in the relevant `source.json`.
