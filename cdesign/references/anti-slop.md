# Anti-Slop — Shared Rules and Evidence-Based Audit

This file supplies baseline rules to cdesign creation and a standalone audit method. It does not define a second generation workflow and does not automatically trigger a redesign.

## Purpose

Anti-slop means:

- claims and proof are truthful;
- form follows something specific about the product, audience, material, or task;
- content earns its place;
- interaction works;
- motion has a deliberate role;
- familiar visual techniques are judged in context, not treated as errors by name.

## Rule priority

1. User requirements and supplied brand or reference material.
2. Truth, functionality, accessibility, and asset rights.
3. The selected project concept and locks in `.cdesign/INTENT.md`.
4. Performance and motion budgets.
5. Heuristics in this reference.

A lower-priority heuristic cannot invalidate a higher-priority decision without evidence of harm.

## Categories

### 1. Defect — must fix

A defect is independently actionable. Examples:

- fabricated testimonial, metric, client, award, ranking, certification, partnership, official status, or product claim;
- invented person, studio, location, or attribution presented as real;
- broken action, link, form, navigation, or interaction;
- clipped, unreadable, overlapping, or horizontally overflowing content;
- missing loading, error, or empty state for asynchronous content;
- inaccessible essential interaction or ignored reduced-motion preference;
- unlicensed or unattributed required asset;
- code or animation pattern that causes a concrete correctness or performance failure;
- reference requirement or explicit user instruction not implemented.

One defect is enough to require a targeted fix. Do not wait for a score threshold.

### 2. Template risk — investigate and explain

A template risk is a pattern that may make the result generic, interchangeable, or disconnected from its content. It is not a defect by itself.

Examples:

- the logo substitution test succeeds;
- the hero, feature grid, proof row, and CTA could belong to unrelated products;
- several sections repeat the same density, card shape, copy length, and hierarchy;
- decoration has no traceable relationship to product, identity, material, or concept;
- animation masks weak static composition;
- every capability is shown as an equal card despite unequal importance;
- the design repeats a recent project formula without a brand-system reason;
- copy relies on abstract promises instead of a capability, object, process, or next action.

Several visible signals may describe one underlying risk. Do not count background color, italic type, and accent color as three independent findings when they are one stylistic system.

### 3. Preference — do not require

A preference is a reviewer taste or an alternative that does not solve demonstrated harm.

Examples:

- preferring left alignment over a justified centered composition;
- preferring a different typeface, color temperature, amount of whitespace, or motion intensity;
- disliking white backgrounds, serif italics, gradients, bento layouts, glass, or 3D in principle;
- wanting a different genre while the current concept is coherent and usable.

Preferences may be offered as optional alternatives only. Never present them as audit failures.

## Non-negotiable truth rules

- Use proof only when supplied by the user or verified from an attributable source.
- Keep assumptions labeled as assumptions in `.cdesign/INTENT.md`; do not publish them as facts.
- Do not invent testimonials, statistics, client or partner logos, awards, team members, founder quotes, certifications, rankings, licenses, locations, official affiliations, scarcity, or health/security/performance claims.
- Real figures must retain their source and context. Do not turn an approximate or internal number into public proof.
- When proof is unavailable, show truthful process proof: workflow, material, interface state, document type, or method.
- Never fabricate copy to fill a visual slot. Remove or restructure the slot.

## Content quality signals

The following are review signals, not regex-based automatic failures:

- generic marketing verbs such as “unlock,” “elevate,” “empower,” “transform,” “раскройте потенциал,” or “почувствуйте разницу”;
- unsupported adjectives such as “innovative,” “best-in-class,” “seamless,” “премиальный,” “эксклюзивный,” or “революционный”;
- empty constructions such as “chaos into clarity,” “your one-stop shop,” “индивидуальный подход” without specifics, or “не просто X, а Y” where Y is abstract;
- portfolio cosplay labels such as `/ 01 — SECTION`, `CITY · KZ`, `EST. 2022`, `MADE BY`, or `SCROLL ↓`;
- slogans that do not answer what the product is or what the user can do.

For each occurrence, ask whether it carries specific meaning supported by the product. Rewrite only when it does not. Normal headings, truthful bylines, real dates, and useful orientation labels are allowed.

## Visual and structural signals

Investigate rather than ban:

- centered, split, symmetric, or asymmetric heroes;
- pure white or black fields;
- common typefaces;
- three-column grids, bento layouts, cards, dashboards, phone mockups, logo rows, or pricing comparisons;
- gradients, glass, grain, glow, shadows, parallax, 3D, or decorative type;
- repeated spacing values or conventional containers.

A finding requires observable harm, such as:

- hierarchy is unclear;
- content importance is flattened;
- the product disappears behind a reusable layout;
- contrast or readability fails;
- real brands or proof are implied without evidence;
- the concept changes arbitrarily between sections;
- effects compete, obscure content, or exceed the device budget;
- mobile loses the concept rather than adapting it.

Common warning combinations:

- centered headline + generic subhead + CTA + unrelated floating object;
- identical icon cards with equal size and interchangeable copy;
- “trusted by” logos with no supplied relationships;
- three equal pricing cards with an unsupported “most popular” claim;
- generic 3D geometry standing in for a missing product or brand asset;
- heavy motion in an otherwise unresolved composition;
- glass or effects reducing text readability;
- desktop art direction replaced by a plain mobile stack.

The remedy is the smallest structural change that restores meaning. Do not replace a coherent palette or typography system merely because it is familiar.

## Typography

No font is globally defective. Inter, Geist, Roboto, Space Grotesk, Instrument Serif, Hanken Grotesk, Migra, and other common choices are allowed when supported by:

- user or brand requirements;
- supplied references;
- appropriate language coverage;
- a deliberate role in the concept;
- customized hierarchy, spacing, and composition.

A common font becomes a template risk when it is the only art-direction decision or reproduces an unchanged starter look. Replacing one mandatory font pair with another does not create originality.

Do not change fonts during an ordinary edit or audit fix when typography is locked, unless the user authorizes it or the font causes a demonstrated defect.

## Motion

Motion may serve one or more of three purposes:

1. explain interaction, state, sequence, or causality;
2. direct attention and preserve hierarchy;
3. create an artistic impression required by the concept.

Artistic motion is valid. It must remain readable, leave primary actions usable, defer to the main spectacle, respect device capability, and provide a calm reduced-motion alternative.

Flag motion when:

- no purpose can be identified;
- lower-tier hover or ambient effects compete with the hero;
- several heavy systems share a viewport;
- motion is used to disguise a generic or broken composition;
- touch or reduced-motion users lose content or actions;
- continuous paint/layout work creates a measured or clearly reproducible performance issue.

### Technical motion rules

- Use `motion/react`, not `framer-motion`.
- Prefer transform and opacity for continuous runtime animation.
- Do not continuously animate layout or paint-heavy properties such as width, height, position offsets, margin, padding, box-shadow, blur/filter, backdrop-filter, or text-shadow.
- `clip-path` is acceptable for a small number of deliberate transitions after performance review.
- Do not use `transition: all`.
- Keep interactive state local to the smallest component; do not rerender a card grid for one card's hover.
- Use MotionValue rather than React state for pointer-frequency updates.
- Heavy R3F scenes require device-tier fallback and runtime performance monitoring.
- Repeated 3D objects should use instancing or batching when count justifies it.
- One spectacle per viewport remains the default budget.

These are defects when they cause correctness, accessibility, or performance harm. In source-only review, report unverified performance concerns as risks and state what runtime evidence is missing.

## Application correctness

Treat these as defects when applicable:

- unstable list identity such as `key={index}` for reorderable or stateful items;
- raw `<img>` where the framework's image component is required for the intended optimization;
- viewport sizing that breaks mobile browser chrome;
- missing loading, error, and empty states for asynchronous data;
- optimistic updates without error rollback;
- missing keyboard operation, focus visibility, labels, or adequate touch targets;
- permanent broad `will-change`;
- mounting and destroying heavy scenes repeatedly during scroll.

Do not flag a pattern mechanically when its context is safe. Explain the actual failure mode.

## Audit mode

Audit mode observes and reports. It does not edit or redesign unless the user separately authorizes changes.

### Inputs

Read, when available:

- `.cdesign/INTENT.md`, including facts, assumptions, concept, and locks;
- user brief and supplied references;
- relevant implementation;
- runtime page at target viewports;
- screenshots for composition;
- recording or live interaction for motion;
- build, lint, type, accessibility, and performance results.

Absence of a capability means **not checked**, never PASS.

### Finding format

Every required finding uses:

> **Where → Observation → Harm → Minimal fix → Preserve**

Example:

> Feature section → Three capabilities with different importance use equal cards and equal copy weight → The primary workflow is not identifiable → Enlarge and sequence the main workflow, then group the two supporting capabilities → Preserve the current palette, type scale, and image treatment.

Each finding must:

- cite direct visual, behavioral, content, or source evidence;
- identify the category: defect or template risk;
- avoid combining unrelated issues;
- preserve named successful decisions;
- distinguish observed behavior from inference;
- state missing evidence when verification was impossible.

Do not produce “too generic,” “bad typography,” or “rewrite it” without a causal explanation.

### Redesign threshold

Never redesign because a checklist reaches three matches.

Recommend concept-level reconsideration only when evidence shows that the core structure or concept cannot perform the page task—for example, the product remains unidentifiable across the hero and subsequent sections, the supplied reference anchors are absent, or the information architecture prevents the primary action.

Even then, audit mode recommends; it does not rewrite. A full redesign requires explicit user authorization.

## Honest verification status

Report independent statuses:

- `code`: PASS / FAIL / NOT CHECKED;
- `visual`: PASS / FAIL / NOT CHECKED;
- `motion`: PASS / FAIL / NOT CHECKED;
- `content_truth`: PASS / FAIL / NOT CHECKED;
- `accessibility`: PASS / FAIL / NOT CHECKED.

Examples:

- A successful build proves code compilation, not visual quality.
- A screenshot can verify composition and clipping, not animation smoothness.
- A recording can show choreography, but not establish asset licensing or claim truth.
- Source inspection can identify likely performance risks, but not measured frame rate.

Inline review, browser review, and a capable independent reviewer are all valid. Do not bind the audit architecture to a named model. Record which evidence and capabilities were actually used.
