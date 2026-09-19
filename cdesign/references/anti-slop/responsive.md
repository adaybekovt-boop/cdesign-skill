# Responsive critique

Load when the direction includes non-trivial recomposition, canvas/WebGL, pinning, spatial navigation, large type, or interaction that cannot translate literally to touch.

Provenance: recurrence and generated-responsive-pattern claims are heuristic/internal pattern research.

## DEFAULT REJECT

### R-01 — Universal column collapse

Several distinct desktop structures all become the same source-order vertical stack without recrop, reweighting, resequencing, or type remap. A deliberately single-column document is valid.

### R-02 — Hero object deletion

The defining media, object, or mechanism disappears on small screens and leaves a centered text/CTA template. Swap engine or crop—canvas to poster, wide image to art-directed crop—while preserving the object’s role.

### R-03 — Motion killed instead of translated

Mobile disables every motion system without replacing the identity-bearing state change or rhythm. Lower cost independently from viewport; reduced-motion is a separate axis.

### R-04 — Compressed desktop type

One fluid scale creates overflow, orphaned short lines, or loss of hierarchy on mobile. Cropped poster type is allowed when it is the motif and has been tested.

### R-05 — Identity collapse

Desktop has a recognizable geometry, crop, type relationship, or motif; mobile retains only copy on a flat field. Preserve the relationship, not literal coordinates.

### R-06 — Breakpoint patchwork

Duplicated sections and many display-none rules substitute for one designed transformation. Separate DOM is justified when the interaction model genuinely changes, such as WebGL scene to static poster.

### R-07 — Tablet ignored

The layout jumps from desktop to phone logic and becomes cramped or wasteful in between. A two-mode product may intentionally reuse the phone composition if it is clean at tablet width.

## WATCHLIST

- same section padding at all widths;
- wide images become tiny letterboxed strips;
- full desktop nav squeezes onto phone;
- fixed chrome ignores safe areas;
- desktop multi-column form survives on phone;
- mobile and reduced-motion paths are identical;
- signature navigation becomes a generic hamburger without a trace of its state system.

## Strict responsive/accessibility QA issues — not SLOP_SCORE

Treat these as delivery failures in visual QA rather than Anti-Slop `HARD BAN`:

- page-level horizontal overflow;
- required touch targets below the project’s practical target (44×44 CSS px is a strong default, not an AI-slop classifier);
- primary CTA, price, contact, product image, or required content hidden merely to fit;
- hover-only required information;
- scroll/touch traps, body lock, or unskippable pinned sequences;
- fixed chrome obscuring actions or failing safe-area handling.

## Critique prompts

1. What is the dominant object at the narrowest viewport?
2. Which motif survives and how was it translated?
3. What became cheaper without changing meaning?
4. Would mobile and desktop screenshots still be recognized as the same project?
