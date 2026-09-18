# DESIGN_GENOME

The genome is a buildable visual specification. Every field needs a concrete decision and a reason. Adjectives alone are invalid.

## Required fields

| Field | Must specify |
| --- | --- |
| composition | dominant mass, alignment logic, empty-space behavior, hero and section structure |
| typography | type categories or actual families, contrast of roles, scale behavior, line/measure logic |
| geometry | recurring edges, planes, paths, crops, dividers, or spatial shapes |
| color | dominance ratio, surface relationships, accent behavior, contrast strategy |
| material | surface behavior such as paper, ink, glass, metal, flat UI, light, grain, or none |
| imagery | source, crop, treatment, sequencing, and fallback |
| motion | primary mechanism, rhythm, trigger, hierarchy, reduced-motion translation |
| interaction | hover/touch/focus behavior tied to meaning |
| navigation | location, structure, state changes, and mobile transformation |
| spatial rhythm | section density sequence, intentional compression/expansion, reading measures |
| responsive behavior | what recomposes, what remains invariant, what becomes cheaper |
| signature motif | one project-specific device, its recurrence, function, and limit |

Optional fields may describe data display, iconography, illustration, sound, or 3D when the brief needs them.

## Specificity test

Each field should let another designer sketch the result without guessing. Fail and rewrite any field that can be pasted unchanged into an unrelated project.

Fail:

- modern editorial layout
- premium typography
- bold geometry
- neutral palette
- smooth animation
- clean navigation

Pass:

- composition: a narrow product index occupies the left rail; the hero object crosses from the main field into the index, and later sections inherit that crossing.
- typography: compressed grotesk headlines use short stacked nouns; a restrained serif appears only in evidence captions, never in controls.
- color: warm gray occupies roughly 80% of the page, charcoal carries text and rules, and one cold blue appears only where the transaction state changes.
- motion: section boundaries advance in discrete rail-sized steps; the product plane moves continuously only in the hero; reduced motion preserves the state changes without interpolation.

## Reason contract

Use this compact form inside INTENT:

~~~yaml
composition:
  decision: asymmetric product shell with a permanent 18% process rail
  reason: the product is understood as a sequence, and the rail exposes that sequence
  expression: hero, proof section, closing CTA
  limit: rail never contains decorative labels
~~~

The numbers are project decisions, not reusable defaults.

## Genome lock

Freeze the approved genome before implementation. Code may reveal a feasibility issue; update the field and explain the change instead of silently drifting. QA compares the rendered result to this genome.
