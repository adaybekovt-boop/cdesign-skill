# cdesign v3

Use cdesign/SKILL.md for new landing pages, major redesigns, and existing cdesign projects.

## Generate Mode

Create DESIGN_GENOME, SIGNATURE_DECISION, REJECTED_DEFAULT, and a provisional fingerprint before code. Run novelty and anti-repetition checks, then anti-slop. The starter is neutral infrastructure; components and recipes are optional.

Load references progressively using cdesign/references/recipe-index.md.

## Edit Mode

Read .cdesign/INTENT.md and .cdesign/FINGERPRINT.json first. Apply a delta and preserve DESIGN_LOCKS, MOTION_LOCKS, and the signature motif unless the user explicitly changes them.

Legacy INTENT files remain supported. Treat Selected vibe as a historical hint, infer the current genome from the implementation, and do not rebuild the project just to migrate metadata.

## QA

Follow cdesign/references/qa-pipeline.md. Use an independent reviewer when available, otherwise critique inline. No review step depends on a named model.
