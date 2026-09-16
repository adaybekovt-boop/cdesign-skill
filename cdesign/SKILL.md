---
name: cdesign
description: Create, edit, or audit cinematic landing pages through a product-specific concept, disciplined motion, truthful content, and evidence-based QA.
---

# cdesign — Concept-Led Landing Pages

cdesign is the single managing process. `references/anti-slop.md` contributes shared rules and an audit method; it does not start a competing workflow.

## Modes

Determine the mode before loading references or changing files.

### Creation

Use when the user asks for a new landing page, marketing site, hero experience, or interactive prototype.

Outcome: develop a product-specific concept, implement it, verify it, and record decisions.

### Edit

Use when the user asks to change an existing generated project.

Outcome: apply the requested delta while preserving unrelated concept, typography, motion hierarchy, material system, and device fallbacks. Do not run concept exploration for a small correction.

### Audit

Use when the user asks to review, critique, assess, or identify anti-slop issues.

Outcome: inspect and report evidence-based findings. Do not edit, rewrite, or redesign unless the user separately authorizes changes.

A full redesign is Creation with explicit permission to reconsider the existing concept. It is never an automatic result of an audit score.

## Trigger boundaries

Trigger Creation for `/cdesign`, landing-page generation, or clearly cinematic/interactive marketing work.

Do not scaffold or invoke the full Creation workflow for:

- a small UI edit or isolated component request;
- a user-requested simple/basic implementation;
- an existing non-cdesign application where only a narrow change is requested.

Use Edit for an existing cdesign project. Use Audit only when review is the requested outcome.

## Instruction priority

Resolve conflicts in this order:

1. explicit user requirements and supplied references;
2. truth, accessibility, asset rights, and functional correctness;
3. `.cdesign/INTENT.md` project decisions and locks;
4. the selected concept;
5. performance, motion hierarchy, and device fallbacks;
6. optional direction and recipe guidance.

Industry affects facts, navigation, useful actions, and information architecture. It does not automatically choose a visual genre.

Aesthetic heuristics are not technical failures. Centering, white or black backgrounds, common fonts, cards, grids, gradients, glass, and 3D are allowed when they serve the concept and work in context.

## Shared baseline

Read `references/anti-slop.md` before substantial Creation or Audit work. In Edit, consult the relevant section only when the requested delta touches content, visual direction, motion, or a flagged pattern.

Always:

- distinguish supplied or verified facts from assumptions;
- use truthful claims and attributable assets;
- connect each major section to the product and page task;
- solve static composition before motion;
- maintain one clear motion hierarchy;
- adapt intensity by device without erasing the concept;
- report what was and was not actually verified.

Never:

- invent testimonials, metrics, clients, awards, people, rankings, certifications, affiliations, scarcity, or performance/security/health claims;
- add generic visual objects to replace missing product or brand material;
- use effects or starter components to satisfy a quota;
- treat a checklist count as proof that a design is wrong;
- turn reviewer preference into a mandatory fix;
- silently replace a coherent concept during a narrow edit;
- report unavailable visual or motion review as PASS.

## Creation workflow

### Phase 0 — Brief and material

Parse:

- the product and audience;
- the page task and primary action;
- supplied copy, brand assets, images, models, UI, documents, URLs, and references;
- explicit constraints and unknowns;
- output language.

Use available tools to inspect supplied material. If a URL or media type cannot be accessed, state that limitation and continue only with evidence that is available.

If the user supplies a precise visual reference, record three anchors:

1. composition;
2. dominant silhouette, object, or visual field;
3. typography or motion rhythm.

The reference sets the visual floor. Product category still controls truthfulness and useful content, not a forced category template.

### Phase 0.5 — Start the decision record

Create or update `.cdesign/INTENT.md` before implementation. Keep it concise and explanatory.

If `PRODUCT.md`, `DESIGN.md`, or an equivalent project document already exists, use it as the source of truth and link to it from INTENT. Do not create a contradictory duplicate.

Start with:

```md
# cdesign Intent

## Product
- known_facts:
- assumptions:
- audience:
- page_task:
- primary_action:

## Concept
- status: exploring
- selected:
- rationale:
- project_rules:
- reference_anchors:

## Materials
- supplied:
- verified_sources:
- missing_or_unverified:

## Structure
- planned_sections:

## DESIGN_LOCKS
- pending until concept selection

## Verification
- code: NOT CHECKED
- visual: NOT CHECKED
- motion: NOT CHECKED
- content_truth: NOT CHECKED
- accessibility: NOT CHECKED
```

Do not copy CSS values into INTENT. Explain decisions and point to the token or component files where values live.

### Phase 1 — Develop and select the concept

Read `references/director-roll.md`.

Briefly develop three materially different concepts internally. Each must differ in its product idea, material, hero composition, or narrative structure—not just palette or effect.

Select one using product specificity, page usefulness, static strength, available material, mobile continuity, feasibility, and difference from recent approved work when a catalog exists.

With an exact user reference, shorten this step to plausible adaptations of the chosen direction. Do not manufacture alternatives that contradict the reference.

Update INTENT with concrete project rules:

- hero composition and dominant material;
- typography roles;
- image or asset treatment;
- section reveal principle;
- motion purpose;
- mobile continuity;
- fallback for unavailable assets or capabilities.

Named Director's Roll directions are optional influences, not required labels. Compatible techniques may be combined when they express one concept.

### Phase 2 — Technical foundation

For a new standalone project, bootstrap from the starter:

```bash
npx create-next-app@latest <project-name> -e https://github.com/adaybekovt-boop/cdesign-starter
cd <project-name>
npm install
```

The starter is infrastructure, not mandatory visual language. Inspect existing components before writing variants, but import a component only when the selected concept needs it. There is no minimum starter-component count.

Expected stack:

- Next 15 + React 19 + TypeScript + Tailwind v4;
- `motion/react`, GSAP, Lenis;
- R3F/Drei only when the concept needs WebGL.

Do not replace functioning starter synchronization, device-tier, or fallback architecture without a demonstrated reason.

### Phase 3 — Build from static meaning to motion

#### Pass 1 — Structure

Implement the semantic section order and real copy without decorative motion.

For every major block, be able to state:

> product fact or user need → block task → chosen form

If a section has no distinct task, remove or combine it. Do not create empty sections to complete a standard landing-page sequence.

#### Pass 2 — Early concept check

Render the real first viewport and one following section in a static or minimally animated state. Inspect desktop and mobile when a browser is available.

Check:

- the product or page task is identifiable;
- the concept is visible without explanation;
- the second section develops the idea;
- hierarchy survives without effects;
- a logo substitution would materially break the page;
- mobile preserves the same material and reveal logic.

If the concept fails, revise the concept or composition now. Do not finish the site or add heavy motion first.

#### Pass 3 — Complete visual system and content

Apply project tokens, typography, materials, responsive composition, and truthful content. Use `references/content-system.md` as optional domain vocabulary; if it requires a preset vibe or conflicts with the selected concept, this SKILL and INTENT take priority.

Set `<html lang>` in `app/layout.tsx` to the primary content language.

#### Pass 4 — Motion

Motion may:

1. explain interaction or sequence;
2. direct attention;
3. create the artistic impression defined by the concept.

The third purpose is valid when reading and actions remain usable, lower tiers defer to the main spectacle, and reduced-motion users receive a calm alternative.

Motion hierarchy:

- Tier 1 — primary hero or scene statement;
- Tier 2 — section transitions;
- Tier 3 — UI feedback;
- Tier 4 — ambient behavior.

Default page budget:

- one Tier 1 system;
- up to two Tier 2 patterns;
- one or two Tier 3 families;
- one Tier 4 layer;
- one heavy spectacle per viewport.

Budgets may be reduced or deliberately adjusted for the concept, but stacking heavy systems in one viewport requires explicit justification and performance evidence.

Timing guidance:

- micro feedback: 120–220ms;
- UI transitions: 300–500ms;
- scene transitions: 800–1400ms;
- ambient motion: 3–12s;
- split reveal stagger: 0.015–0.025, normally 0.02;
- default ease: `cubic-bezier(0.16, 1, 0.3, 1)`.

Use transform and opacity for continuous animation. Follow technical motion rules in `references/anti-slop.md`.

### Phase 3.5 — Lazy recipe use

Read a recipe only after the concept requires that technique. Recipes are implementation references, not a feature checklist.

- synchronized custom scroll: `references/recipes/lenis-gsap-sync.md`
- split reveal: `references/recipes/split-reveal.md`
- pinned progression: `references/recipes/pinned-scrub.md`
- licensed 3D model: `references/recipes/r3f-gltf-model.md`
- photo-based 3D: `references/recipes/r3f-photo.md`
- layered parallax: `references/recipes/multi-layer-parallax.md`
- frame sequence: `references/recipes/canvas-scrub.md`
- cinematic master timeline: `references/recipes/scroll-film.md`
- liquid glass: `references/recipes/liquid-glass.md`
- glass gradient: `references/recipes/animated-glass-gradient.md`
- shader field: `references/recipes/shader-gradient.md`
- velocity response: `references/recipes/velocity-skew.md`
- CSS scroll animation: `references/recipes/css-scroll-driven.md`
- shell composition: `references/recipes/shell-layout.md`
- easing: `references/recipes/easing.md`
- hero choreography: `references/recipes/hero-reveal.md`
- dark token starting point: `references/recipes/dark-tokens.md`
- sound, only when requested: `references/recipes/audio-design.md`
- navigation: `references/recipes/premium-nav.md`
- preloader, only when asset wait justifies it: `references/recipes/page-entry.md`
- mobile adaptation: `references/recipes/mobile-composition.md`
- SVG morph: `references/recipes/svg-morph.md`

When cinematic intent is explicit, define a short shot map before implementing a ScrollFilm timeline. Do not activate ScrollFilm merely because cdesign supports it.

### Phase 4 — Verification

Read `references/qa-pipeline.md` and `references/visual-qa.md` only when entering verification. Where those files name a specific model or imply automatic PASS on fallback, this capability-based contract takes priority until those references are migrated.

#### Code gate

Run the project-defined equivalents of:

```bash
npm run lint
npm run typecheck
npm run build
npm run audit:cdesign
```

Run only scripts that exist; a missing script is `NOT CHECKED`, not PASS. Build failure blocks a valid implementation handoff. Fix root causes and rerun relevant checks.

Inspect at minimum:

- framework and TypeScript correctness;
- `<html lang>` accuracy;
- async loading/error/empty states where applicable;
- reduced-motion paths;
- asset provenance for external models/media;
- motion and spectacle budgets;
- responsive overflow and interaction semantics.

#### Visual gate

When browser capability exists, inspect at minimum:

- desktop first viewport and a below-fold state;
- mobile first viewport and a below-fold state;
- tablet when the layout changes materially at that range.

Capture additional scroll positions only when they prove an interaction or reveal. Fixed frame quotas are not evidence by themselves.

If no browser is available, set `visual: NOT CHECKED (no browser)`.

#### Motion gate

Use live interaction or a recording to verify choreography, scroll behavior, reduced motion, and mobile degradation. Screenshots alone cannot pass motion QA.

If motion cannot be observed, set `motion: NOT CHECKED`.

#### Independent review

Use an independent reviewer only when the environment supports the required capabilities and the risk justifies it—for example, heavy cinematic timelines, multiple responsive scene changes, or an unresolved audit disagreement.

Choose by capability, not a hardcoded model name. Supply the brief, INTENT, relevant source, and actual screenshots or recordings. Treat the review as evidence, not authority; findings must follow `references/anti-slop.md`.

#### Status contract

Record separately:

- `code`: PASS / FAIL / NOT CHECKED;
- `visual`: PASS / FAIL / NOT CHECKED;
- `motion`: PASS / FAIL / NOT CHECKED;
- `content_truth`: PASS / FAIL / NOT CHECKED;
- `accessibility`: PASS / FAIL / NOT CHECKED.

Never convert an unavailable tool into inline PASS. State the evidence used and unresolved limitations.

### Phase 5 — Complete INTENT and handoff

Update `.cdesign/INTENT.md`:

```md
## Product
- known_facts:
- assumptions:
- audience:
- page_task:
- primary_action:

## Concept
- selected:
- rationale:
- project_rules:
- reference_anchors:

## Materials
- supplied:
- verified_sources:
- missing_or_unverified:

## Structure
- sections:

## DESIGN_LOCKS
- hero_composition:
- visual_motif_or_material:
- palette_tokens:
- typography_roles:
- section_order:

## MOTION_LOCKS
- tier1:
- tier2:
- tier3:
- tier4:
- reduced_motion_fallback:

## MOBILE_NOTES
- composition:
- downgrades:
- touch_behavior:

## Verification
- date:
- code:
- visual:
- motion:
- content_truth:
- accessibility:
- evidence:
- unresolved:
```

The final response states:

1. what was built;
2. how to run it;
3. independent verification statuses;
4. unresolved failures or `NOT CHECKED` items;
5. that INTENT was updated.

Do not claim visual quality, smooth motion, accessibility, or truth verification that was not actually checked.

## Edit workflow

1. Read `.cdesign/INTENT.md` first when it exists.
2. If existing `PRODUCT.md`, `DESIGN.md`, or equivalent files are authoritative, read them and avoid duplicating them.
3. Inspect only the code and references relevant to the requested change.
4. Apply the change as a delta.
5. Preserve unrelated concept rules, reference anchors, typography roles, material treatment, motion hierarchy, and device fallbacks.
6. Do not simplify the hero, remove motion, change fonts, or reorder sections unless requested or necessary to fix a demonstrated defect within scope.
7. Run verification proportional to the change.
8. Update INTENT only when facts, assumptions, structure, locks, or verification status changed.

If INTENT is missing, do not refuse a narrow edit and do not invent a full concept history. Infer only the existing decisions necessary to preserve the page. Create a minimal INTENT when the project is clearly cdesign and the requested change establishes or changes a durable design decision.

An edit request that explicitly asks for a full redesign switches to Creation.

## Audit workflow

1. Read `.cdesign/INTENT.md` and supplied references when available.
2. Establish what evidence can be checked: source, runtime, screenshots, motion recording, content sources, accessibility tools.
3. Apply the categories and finding format in `references/anti-slop.md`.
4. Separate defects, template risks, preferences, and unverified concerns.
5. For every required finding use:

   `Where → Observation → Harm → Minimal fix → Preserve`

6. Report independent verification statuses.
7. Do not edit files, assign an automatic rewrite, or recommend concept replacement without evidence that the concept or structure cannot perform the page task.

If the user later authorizes fixes, switch to Edit for targeted corrections or Creation for an explicit concept-level redesign.

## Technical invariants

- Use `motion/react`, never `framer-motion`.
- Keep Lenis and GSAP synchronized through the existing starter architecture.
- Do not use Locomotive Scroll.
- Use MotionValue for pointer-frequency or shared motion state; do not add Zustand solely for motion.
- Prefer transform and opacity for continuous animation.
- Provide reduced-motion alternatives for Tier 1 and Tier 2.
- Use device-tier fallbacks before enabling heavy scenes.
- Wrap R3F Canvas with runtime performance monitoring.
- Keep one R3F canvas visible at a time unless measured evidence supports otherwise.
- Use `min-h-[100dvh]` rather than `h-screen`.
- Avoid `key={index}` where list identity can change.
- Use semantic design tokens in components; keep project values in the token system.
- Set the correct document language.
- Preserve content and primary actions on mobile.

Typography is a project decision. The starter's Hanken Grotesk + Migra pairing is available, not mandatory. Common fonts are acceptable when justified by brand, reference, language, or concept and integrated through a deliberate type hierarchy.
