# Locomotive

- **URL:** https://locomotive.ca/
- **Category:** experimental-interaction
- **Slug:** `locomotive`

## Short description
Montreal studio whose site and MIT locomotive-scroll library defined viewport detection + smooth parallax as a public primitive. v5 is built on Lenis; docs live at scroll.locomotive.ca.

## Why it is visually interesting
The studio site treats scroll speed, in-view states and parallax offsets as visible craft, not hidden libraries. The open-source engine is a sibling of the marketing site.

## Signature decision
Scroll as a designed material: in-view triggers, speed-aware parallax, and a public API so other sites can reuse the same physics.

## Decisions that differ from a typical AI landing page
- Smooth scroll is a published primitive (MIT) rather than a secret sauce
- Parallax auto-disables on touch — a documented responsive rule, not an afterthought
- v5 dropped data-scroll-container hacks that caused layout shifts
- Studio work is shown through motion literacy, not through a 3D reel first
- Docs site (scroll.locomotive.ca) is part of the design system, not a GitHub README only
- Native scrollbar is kept (accessibility) while interpolation runs on top
- Dual IntersectionObserver strategy (triggers vs continuous) is an architectural pattern worth stealing

## Reuse as a principle
Publish the scroll physics you invent. Disable parallax on touch by default. Keep the native scrollbar. Split 'fire once' in-view from 'track while visible'.

## Do not copy directly
Do not copy Locomotive branding, project images, or the studio's exact page structure. Do not paste the library into a generated landing unless scroll is the product.

## Brand-bound elements
Locomotive wordmark, Montreal studio identity, client work.
