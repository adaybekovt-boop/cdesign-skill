# cdesign repository

This repository defines cdesign v3. Read cdesign/SKILL.md first.

## Architecture

- cdesign/engine/ contains the required decision system for Generate Mode.
- cdesign/references/anti-slop.md is a compatibility entry point; `anti-slop/INDEX.md` owns the truth gate and lazy-load routing.
- cdesign/references/content-system.md applies when writing or restructuring copy.
- cdesign/references/design-traits.md is an ingredient library, never a preset selector.
- cdesign/references/library/ contains provenance-preserving Art Direction references selected one to three at a time.
- cdesign/references/recipes/ is lazy-loaded only for selected techniques.
- cdesign/references/qa-pipeline.md and visual-qa.md govern verification.
- cdesign/templates/ defines INTENT and FINGERPRINT contracts.

Do not load every reference, Anti-Slop module, site analysis, or recipe by default.

## Invariants

- Generate DESIGN_GENOME and pass the Novelty Gate before implementation.
- Use the reason contract defined by the engine and enforced by anti-slop.
- Do not map a business category to a complete aesthetic.
- Do not restore mandatory vibe selection, fixed font pairs, fixed timing values, component quotas, or starter-demo composition.
- Anti-slop, content truth, accessibility, responsive identity, and performance remain hard gates.
- `SLOP_SCORE` detects generic combinations; it never replaces visual judgment. AI Fingerprint runs after visual QA.
- Accessibility/runtime failures such as sub-practical touch targets remain QA blockers, not AI-slop `HARD BAN` labels.
- QA is model-agnostic and judges observable output.
- Edit Mode preserves v3 locks and accepts legacy INTENT files; Selected vibe is only a legacy hint.

## Repository changes

Run cdesign/scripts/audit-cdesign-v3.mjs and the skill validator before committing. The audit validates JSON, internal links, library shape, source URL uniqueness, and Anti-Slop rule IDs. Keep supporting rules in one authoritative file and link to them rather than duplicating them.
