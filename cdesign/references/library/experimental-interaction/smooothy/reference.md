# Smooothy

- **URL:** https://smooothy.federic.ooo/
- **Category:** experimental-interaction
- **Slug:** `smooothy`

## Short description
Federico Valla's site-as-documentation for a tiny framework-agnostic slider built to stay in sync with WebGL. CSSDA WOTD Jul 2025.

## Why it is visually interesting
The library is demonstrated as a live instrument with food-item slides, numeric IDs, parallax readouts and an event API printed on the page. Documentation is the interface.

## Signature decision
A docs site where the object being documented (infinite/finite slider with lerp, snap, parallax, events) is the only hero, styled like a corner store receipt.

## Decisions that differ from a typical AI landing page
- Slides are dummy SKUs (Toast, Headless Fish, 33.23¥) instead of case-study photos
- On-page CONFIGURE / READ panels expose SPEED, CURRENT, TARGET, PROGRESS
- Parallax values printed per slide as instrumentation, not as a hidden data attribute
- Copy voice is dry and anti-marketing ('AKA fix it yourself')
- Framework-agnostic stance is a design decision: no React-only hero
- MIT-licensed core meant to sync DOM slides with WebGL, which is why the site exists
- No top nav — the slider and the spec are the page

## Reuse as a principle
When shipping a motion primitive, make the docs page a working bench with live readouts. Dummy inventory (repeated price, serial numbers) can carry more character than client logos.

## Do not copy directly
Do not copy the food SKU jokes, the 33.23¥ gag, or Federico's voice. Do not vendor the whole library into a generated landing unless the user asked for a slider.

## Brand-bound elements
Smooothy name, Federico Valla tone, dummy food catalog.
