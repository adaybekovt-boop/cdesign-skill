# Visual QA

Run after deterministic checks. Review still composition, responsive states, and representative motion states—not only the first loaded frame.

## Required viewports

| Viewport | Size | Primary concern |
| --- | --- | --- |
| desktop | 1440 × 900 | intended art direction, hierarchy, primary interaction |
| tablet | 1024 × 768 | recomposition and navigation stability |
| mobile | 390 × 844 | identity preservation, touch, cost, overflow |

Capture top, middle, and end states for each. For pinned, stateful, or cinematic work, also capture the signature transition or interaction state. Add project-specific widths around known layout breakpoints when needed.

Use the first available browser, preview, Playwright, or screenshot facility. If none exists, mark the gate SKIPPED; never infer a visual PASS from source code.

## Blockers

### Direction

- rendered composition contradicts DESIGN_GENOME;
- SIGNATURE_DECISION is absent, too subtle to recognize, or confined to disposable decoration;
- the rejected category default returned;
- reference image/site supplied by the user has less influence than a category stereotype;
- the signature motif repeats mechanically without changing purpose;
- surface effects are doing work the composition should do.

### Anti-slop evidence

- always apply the truth gate in [anti-slop/INDEX.md](anti-slop/INDEX.md);
- use screenshots to identify only the modular composition, typography, visual, motion, interaction, content, or responsive patterns actually present;
- carry those observations into `SLOP_SCORE` and the AI Fingerprint Check after this visual pass;
- judge stacks and missing project identity, not one fashionable component in isolation.

### Responsive and access

- horizontal scroll, clipping, broken wrapping, overlapping fixed UI, or hidden CTA;
- touch target is impractical or required content depends on hover;
- focus state disappears against the surface;
- mobile becomes a plain stack and loses the motif, geometry, typography relationship, or anchor;
- performance downgrade changes meaning rather than translating the mechanism;
- reduced-motion state hides content or destroys navigation.

### Runtime

- blank or unlit canvas, missing image/model/font, layout shift that changes hierarchy;
- pinned or scroll-linked section jumps, traps scroll, or ends in the wrong state;
- animation competes with reading, creates obvious jank, or runs unnecessarily offscreen;
- loading, error, or empty state breaks the art direction or access to the next action.

## Evidence

Record in LAST_QA:

- status: PASS, FAIL, or SKIPPED with reason;
- viewports and states captured;
- blockers found;
- fixes applied;
- remaining blockers;
- genome/signature fidelity verdict.

`SLOP_SCORE` and AI Fingerprint results are recorded after this pass under the QA pipeline; do not guess them from source alone.

Re-capture only affected states after a local fix, but rerun the full sweep after a structural change.
