# Ten Years Away — Studio375

- **URL:** https://ten.375.studio/en
- **Category:** experimental-interaction
- **Slug:** `ten-years-away`

## Short description
Scroll-driven interactive comic chronicling ten years of Studio375. Ten illustrated chapters inside a fixed WebGL canvas. Awwwards SOTD + FWA of the Day, June 2026.

## Why it is visually interesting
The scrollbar is the narrator. A camera drifts through comic panels; scroll velocity stretches a smoke shader; audio playback rate follows speed; the cursor leaves a halftone print trail.

## Signature decision
Horizontal comic camera inside a fixed canvas, with print-medium interactions (halftone cursor, scattered-then-aligned panel arrivals) and velocity-linked sound.

## Decisions that differ from a typical AI landing page
- Years are chapters, not timeline ticks on a corporate about page
- Camera moves through panels inside one fixed WebGL canvas rather than a DOM column of images
- GLSL background reads scroll velocity and stretches smoke shadows into directional streaks
- Cursor leaves a halftone dot trail that shrinks over clickable targets — print logic in the pointer
- New-year panels arrive scattered, then slide into alignment
- Each chapter has its own track; playback rate nudges with scroll speed
- Audio is killed on slow connections instead of becoming a muted autoplay headache

## Reuse as a principle
Map a chronological story onto a camera-through-panels mechanic. Bind secondary systems (shader smear, audio rate, print-style cursor) to the same velocity signal. Scatter-then-align is a reusable chapter-change.

## Do not copy directly
Do not copy Davide Grazi illustrations, Studio375 characters, the exact navy/ice palette, or chapter audio. Do not copy the comic's plot or captions.

## Brand-bound elements
Studio375 people and decade, Davide Grazi drawings, specific chapter tracks, 'one year later' line as their internal joke.
