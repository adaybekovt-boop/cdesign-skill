# Lenis

- **URL:** https://lenis.dev/
- **Category:** experimental-interaction
- **Slug:** `lenis`

## Short description
Darkroom Engineering's smooth-scroll engine. Famous as butter-scroll; actually built to keep WebGL and DOM on one clock. MIT. Respects prefers-reduced-motion as of v1.3.26.

## Why it is visually interesting
The product is a clock. The site and manifesto argue that scroll interpolation exists so shaders and DOM can share a frame, not so landings feel 'premium'.

## Signature decision
Scroll-as-clock-sync: a public engine whose real job is WebGL/DOM alignment, with reduced-motion as a first-class switch.

## Decisions that differ from a typical AI landing page
- Manifesto states the real problem (WebGL/DOM drift) instead of selling 'smoothness'
- Native scrollbar remains
- prefers-reduced-motion honored in current releases
- React wrapper folded into the monorepo — one engine, many bindings
- Site is a developer instrument, not an agency reel
- Open MIT so generated projects can depend on it instead of forking hidden code
- Opposite of locomotive-v4's transform-on-container pitfalls

## Reuse as a principle
If you interpolate scroll, publish why (shared clock with WebGL). Always read prefers-reduced-motion. Do not hide the scrollbar.

## Do not copy directly
Do not copy Darkroom branding or manifesto jokes. Do not wrap every generated site in Lenis by default when the brief is static.

## Brand-bound elements
Lenis name, Darkroom Engineering, manifesto voice.
