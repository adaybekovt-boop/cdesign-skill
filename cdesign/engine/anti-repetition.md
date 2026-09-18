# Anti-Repetition System

Create .cdesign/FINGERPRINT.json for every generated site. It records visible traits, not code choices.

## Required schema

~~~json
{
  "schema_version": 1,
  "hero_composition": "",
  "navigation_pattern": "",
  "typography_pairing_category": "",
  "palette_strategy": "",
  "dominant_geometry": "",
  "section_rhythm": "",
  "section_sequence": [],
  "motion_mechanism": "",
  "imagery_treatment": "",
  "signature_motif": ""
}
~~~

Values must be descriptive enough to compare. “dark”, “editorial”, “sans + serif”, and “parallax” are too vague.

## Comparison

When fingerprints from earlier projects are available, compare each field as:

- **different** — materially different visual behavior;
- **related** — shares a family but differs in structure or purpose;
- **same** — would produce substantially the same visible result.

Treat a proposal as too similar when any condition is true:

- six or more fields are same;
- hero composition, navigation pattern, and signature motif are all same;
- dominant geometry, section rhythm, and motion mechanism are all same;
- a side-by-side sketch would differ mostly by copy, color, or imagery.

Do not use embeddings or numeric similarity infrastructure.

## Mutation rule

When too similar, change at least three major decisions before implementation. Major decisions are:

- hero composition
- navigation pattern
- typography structure
- palette strategy
- dominant geometry
- section rhythm or sequence
- primary motion mechanism
- imagery treatment
- signature motif

At least one change must be structural: hero, navigation, section sequence, or spatial rhythm. Replacing the accent color, swapping one font, and changing easing does not count.

Re-run the Novelty Gate after mutation.

## Lifecycle

1. Draft the fingerprint from the approved genome.
2. Compare it with available prior fingerprints.
3. Mutate if needed.
4. After visual QA, update the fingerprint to match the rendered result.
5. Keep the fingerprint beside INTENT so Edit Mode can preserve identity and future projects can avoid it.

If prior fingerprints are unavailable, do not pretend comparison happened. Still create the final fingerprint.
