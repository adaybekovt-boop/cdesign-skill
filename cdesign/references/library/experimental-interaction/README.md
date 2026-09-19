# Experimental Interaction Library

Thirty-two analyzed sites provide atomic reference material for the generative Art Direction Engine. They are examples to reason from, not selectable aesthetics.

## Lazy-loading path

1. Read [CATEGORY_SUMMARY.md](CATEGORY_SUMMARY.md) only when the direction needs experimental interaction exploration.
2. Query [PATTERN_INDEX.json](PATTERN_INDEX.json) by the relevant axis: `heroes`, `navigation`, `typography`, `motion`, `interaction`, `responsive`, `materials`, or `storytelling`.
3. Choose one to three sources. Do not choose the closest-looking complete site; choose references that answer different design questions.
4. For each chosen source, read `reference.md` and only the needed detail:

| Question | File |
| --- | --- |
| full analyzed decision system | `design-genome.json` |
| composition, hierarchy, navigation, story | `patterns.md` |
| timing, scroll, hover, cursor, reduced motion | `motion.md` |
| breakpoint transformation and fallbacks | `responsive.md` |
| factual/source provenance | `source.json` |

Most tasks should load fewer than twelve files from this category. Do not recursively read the directory.

## Extraction contract

Extract a property in this form:

~~~text
property: pointer acts as a lens over one inspection field
reason: the product requires comparing material layers under one coordinate
adaptation: lens reveals verified layer metadata; touch uses a scrub slider
source: monopo-london
do_not_copy: source brand, exact shader, layout, type, palette, or cursor treatment
~~~

Use references to challenge or refine a provisional `DESIGN_GENOME`. The project’s brief, assets, content, and constraints remain the source of the final art direction.

Never copy a complete design, brand-bound object, character, wording, palette, font pairing, timing chart, or section sequence. Never use a site slug as a vibe label or write “make it like `<site>`” as the design decision.

## Provenance

The package preserves every original `source.json`. Empty fields mean the research did not retain that fact; do not fill them from memory. Statements in analysis files are research notes and should not be represented as externally verified facts unless `source.json` provides the source needed for the claim.
