# cdesign v3

cdesign is an art-direction and production workflow for distinctive landing pages. It uses a Next.js motion starter without treating the starter, a business category, or a finite style menu as the design.

## What changed in v3

The old Director's Roll selected one complete vibe and carried its layout, font, motion, and component choices into the build. That reduced obvious errors, but it also made unrelated projects converge.

v3 replaces preset selection with five small engine documents:

- **Art Direction Engine** synthesizes evidence into project-specific decisions.
- **DESIGN_GENOME** specifies composition, typography, geometry, color, material, imagery, motion, interaction, navigation, spatial rhythm, responsive behavior, and a signature motif.
- **Novelty Gate** rejects generic signatures before code.
- **Anti-Repetition System** compares explicit fingerprints and forces three major changes when a proposal is too similar.
- **Model Adaptation** scales planning and critique to available capabilities without naming a required model.

Former vibes survive as atomic traits in design-traits.md. They can be combined deliberately when their properties share a reason; they are never selected as complete packages.

## Workflow

1. Read the brief, real assets, current code, and supplied references.
2. Draft DESIGN_GENOME from project evidence.
3. Retrieve one to three relevant Art Direction references when the draft needs challenge; never select a source site as a preset.
4. Refine the provisional genome, then write SIGNATURE_DECISION, three identity decisions, and REJECTED_DEFAULT.
5. Compare the provisional fingerprint with previous projects when available.
6. Run the direction through the routed Anti-Slop v2 modules, then lock the approved genome.
7. Build composition and content before motion, loading only selected recipes.
8. Run deterministic checks and screenshot QA, then `SLOP_SCORE` and the five-question AI Fingerprint Check.
9. Run an independent or inline critique and finalize .cdesign/INTENT.md and .cdesign/FINGERPRINT.json.

The reference image or site can control the visual direction more strongly than the business category. Category still controls truthful content and practical information architecture.

## Project metadata

Every generated site contains:

- .cdesign/INTENT.md — project truth, genome, signature, rejected default, locks, responsive plan, and QA record;
- .cdesign/FINGERPRINT.json — hero composition, navigation, typography category, palette strategy, geometry, section rhythm and sequence, motion mechanism, imagery treatment, and signature motif.

Old projects still work in Edit Mode. A legacy Selected vibe field is interpreted as a historical hint, not a preset.

## Starter

Scaffold with:

~~~bash
npx create-next-app@latest <name> -e https://github.com/adaybekovt-boop/cdesign-starter
~~~

The starter provides Next.js 15, React 19, TypeScript, Tailwind v4, Motion, GSAP, Lenis, optional R3F, device tiers, and audit tooling. Its components are opt-in implementation references. No font pairing, demo hero, grain layer, progress bar, glass effect, or motion technique is required.

## Structure

~~~text
cdesign/
├── SKILL.md
├── engine/
│   ├── art-direction.md
│   ├── design-genome.md
│   ├── novelty-gate.md
│   ├── anti-repetition.md
│   └── model-adaptation.md
├── templates/
│   ├── INTENT.md
│   └── FINGERPRINT.json
├── references/
│   ├── anti-slop.md
│   ├── anti-slop/
│   │   ├── INDEX.md
│   │   ├── composition.md
│   │   ├── typography.md
│   │   ├── visual.md
│   │   ├── motion.md
│   │   ├── interaction.md
│   │   ├── content.md
│   │   ├── responsive.md
│   │   ├── scoring.md
│   │   └── ai-fingerprint.md
│   ├── content-system.md
│   ├── design-traits.md
│   ├── library/
│   │   ├── README.md
│   │   └── experimental-interaction/
│   ├── recipe-index.md
│   ├── qa-pipeline.md
│   ├── visual-qa.md
│   └── recipes/
└── scripts/
    ├── audit-cdesign-v3.mjs
    └── mp4-to-frames.sh
~~~

## Install

~~~bash
curl -sSL https://raw.githubusercontent.com/adaybekovt-boop/cdesign-skill/main/install.sh | bash
~~~

The installer backs up an existing installation before replacing it.
It detects common skill directories; set `CDESIGN_SKILLS_DIR` to target another compatible agent.

## Validation

Validate the skill repository with:

~~~bash
node cdesign/scripts/audit-cdesign-v3.mjs
~~~

Generated starter projects run:

~~~bash
npm run lint
npm run typecheck
npm run build
npm run audit:cdesign
~~~

## License

MIT
