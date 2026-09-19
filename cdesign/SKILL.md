---
name: cdesign
description: Create or substantially redesign distinctive production landing pages with a project-specific art direction, anti-slop review, responsive motion, and visual QA. Use for marketing sites, cinematic product pages, and interactive brand experiences; use Edit Mode for existing cdesign projects.
---

# cdesign v3

Create a site whose visual system comes from the project, not from a preset. The starter is infrastructure and an optional component library; it is never the art direction.

## Modes

### Generate Mode

Use for a new landing page or a substantial redesign.

### Edit Mode

Use when the target project already contains `.cdesign/INTENT.md` or the user asks for a focused change to an existing cdesign project.

1. Read `.cdesign/INTENT.md` and `.cdesign/FINGERPRINT.json` when present.
2. Apply a delta. Preserve `DESIGN_LOCKS`, `MOTION_LOCKS`, the signature motif, and production fallbacks unless the user explicitly changes them.
3. Old INTENT files remain valid. Treat `Selected vibe` as a legacy art-direction hint, infer a provisional genome from the existing implementation, and do not rewrite the site merely to migrate metadata.
4. If no INTENT exists, reconstruct it from the current project before making a broad visual edit. A small isolated fix may proceed without inventing an art direction.

## Generate workflow

### 1. Read the brief and evidence

Inspect the prompt, supplied assets, reference images or sites, current code, real content, and technical constraints. A supplied reference has more visual authority than the business category. Business category governs truthful content and useful information architecture; it does not select a style.

Record reference anchors when references exist: composition, dominant silhouette or object, typography, material/color behavior, and motion or interaction rhythm.

Read [content-system.md](references/content-system.md) when writing or restructuring copy. Load the compact [Anti-Slop v2 index](references/anti-slop/INDEX.md) before approving the direction; route to only the modules it names for this project.

### 2. Generate the art direction before code

Read these engine documents:

- [art-direction.md](engine/art-direction.md) — context synthesis and deliberate property combination
- [design-genome.md](engine/design-genome.md) — required genome fields and specificity test
- [novelty-gate.md](engine/novelty-gate.md) — `SIGNATURE_DECISION` contract
- [anti-repetition.md](engine/anti-repetition.md) — fingerprint comparison and mutation rules
- [model-adaptation.md](engine/model-adaptation.md) — scale planning and review to available capabilities

Draft `.cdesign/INTENT.md` from [templates/INTENT.md](templates/INTENT.md). Before implementation it must contain:

- `DESIGN_GENOME`
- `SIGNATURE_DECISION`
- three identity-producing decisions
- `REJECTED_DEFAULT`
- provisional `FINGERPRINT`
- `DESIGN_LOCKS`
- `MOTION_LOCKS`

Every visual decision must have a reason tied to product, audience, content, reference, asset, or interaction. If the only reason is “it looks good,” connect it to the concept or remove it.

Do not blindly combine complete aesthetics. Combine compatible design properties deliberately. Trait examples in [design-traits.md](references/design-traits.md) are ingredients, not named modes or packages.

After the provisional genome exists, use the [Art Direction reference library router](references/library/README.md) only when a property needs challenge or expansion. Select one to three relevant references, load only their necessary files, and extract individual principles or mechanisms. Never select a source site as the design, copy its complete genome, or load the whole library. Refine the genome after retrieval, then write `SIGNATURE_DECISION`; keep the genome provisional until the pre-code gates pass.

### 3. Pass the pre-code gates

Run the Novelty Gate. Generic statements such as “asymmetric layout,” “big typography,” “smooth animations,” “premium,” or “modern” fail. Regenerate the art direction until the signature is concrete and visible.

If fingerprints from previous projects are available, compare them logically. A direction that is too similar must change at least three major visual decisions before code.

Then run the proposed direction through the [Anti-Slop v2 index](references/anti-slop/INDEX.md) and only the routed modules. Anti-slop filters a concept; it does not generate one. Fix violations without collapsing the direction into a generic safe layout.

When Novelty, anti-repetition, and pre-code Anti-Slop pass, lock the approved genome and begin implementation.

### 4. Build from neutral infrastructure

For a new Next.js project, scaffold once:

```bash
npx create-next-app@latest <project-name> -e https://github.com/adaybekovt-boop/cdesign-starter
cd <project-name>
npm install
```

The stack is Next.js, React, TypeScript, Tailwind, Motion, GSAP, Lenis, and optional R3F. Preserve it unless the brief requires otherwise.

Treat starter components as inspected examples. Import only those that express the genome. Do not meet a quota, preserve demo composition, or force a component where a project-specific implementation is clearer. Inspect a component before extending it.

Build in this order:

1. Content and section narrative.
2. Composition, typography, geometry, palette, material, and imagery.
3. Responsive behavior with the same identity, recomposed for each breakpoint.
4. Motion and interaction that support the spatial logic.

Read recipes lazily from `references/recipes/` only for techniques actually selected. Recipes are implementation options, not identity defaults. Use [recipe-index.md](references/recipe-index.md) to find the relevant file.

Set `<html lang>` to the primary content language.

## Hard constraints

- Pass the always-on Anti-Slop truth gate: no invented metrics, clients, awards, testimonials, certifications, rankings, official status, or other fabricated proof.
- Preserve the strict anti-slop filter, including screenshot-visible failures.
- A real product or brand 3D asset needs known provenance and a manifest entry. Missing assets require a deliberate 2D fallback, not generic geometry.
- Continuous animation should use compositor-friendly properties. Avoid layout-triggering or continuous blur/filter animation.
- Respect reduced motion, touch, keyboard access, readable contrast, and practical tap targets.
- Keep heavy effects within the tested device budget. Do not let secondary motion compete with the primary motion system.
- Mobile may reduce cost or recompose space; it may not erase the signature motif or become a generic stack.
- Preserve Lenis/GSAP synchronization and R3F performance safeguards when those systems are used.

Exact stagger, easing, grid, font pairing, section count, and component count are art-direction decisions, not universal quality gates.

## QA and handoff

Read [qa-pipeline.md](references/qa-pipeline.md) after implementation and [visual-qa.md](references/visual-qa.md) for screenshot review. After visual QA, run [SLOP_SCORE](references/anti-slop/scoring.md) and the five-question [AI Fingerprint Check](references/anti-slop/ai-fingerprint.md) before final critique and handoff.

Run the project commands exposed by its package scripts. For cdesign-starter projects this normally includes:

```bash
npm run lint
npm run typecheck
npm run build
npm run audit:cdesign
```

Use an independent critic/reviewer agent when one is available. Give it the brief, INTENT, fingerprint, screenshots, and relevant code; do not prescribe a model name. If no reviewer is available, run the same critique inline. QA judges the result and its constraints, not whether one favored implementation recipe was used.

After QA:

1. Update `LAST_QA` in `.cdesign/INTENT.md`.
2. Write `.cdesign/FINGERPRINT.json` using the final rendered decisions, following [anti-repetition.md](engine/anti-repetition.md).
3. Record `SLOP_SCORE`, Anti-Slop justifications/fixes, and the AI Fingerprint verdict in `LAST_QA`.
4. Update locks only when the user approved an art-direction change.
5. Report what was built, how to run it, command results, visual/reviewer status, and unresolved blockers. Do not claim PASS for a skipped check.
