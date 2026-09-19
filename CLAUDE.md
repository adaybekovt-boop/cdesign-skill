# cdesign v3

Use cdesign/SKILL.md for new landing pages, major redesigns, and existing cdesign projects.

## Generate Mode

Create a provisional DESIGN_GENOME from project evidence, retrieve at most a few property-level references when useful, then finalize SIGNATURE_DECISION, REJECTED_DEFAULT, and the fingerprint before code. Run novelty and anti-repetition checks, then routed Anti-Slop modules. The starter is neutral infrastructure; components and recipes are optional.

Load references progressively through `cdesign/references/library/README.md`, `cdesign/references/anti-slop/INDEX.md`, and `cdesign/references/recipe-index.md`. Never read a full reference category or every Anti-Slop module by default.

## Edit Mode

Read .cdesign/INTENT.md and .cdesign/FINGERPRINT.json first. Apply a delta and preserve DESIGN_LOCKS, MOTION_LOCKS, and the signature motif unless the user explicitly changes them.

Legacy INTENT files remain supported. Treat Selected vibe as a historical hint, infer the current genome from the implementation, and do not rebuild the project just to migrate metadata.

## QA

Follow cdesign/references/qa-pipeline.md. After visual QA, run SLOP_SCORE and the AI Fingerprint Check, then use an independent reviewer when available or critique inline. No review step depends on a named model.
