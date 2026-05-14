# Recipe: Shell-First Layout

If your landing page can be rebuilt without loss using max-w-7xl + lg:grid-cols-2 + uniform py-24
→ it reads as a template regardless of animations.

## Shell anatomy

- 12–14 named tracks
- Intentionally empty rails (25–45% width unused in hero)
- Headline: 14–18ch max
- Body: 56–68ch max
- Caption/aside: 24–32ch max

## Named areas grid

```css
.grid-shell {
  display: grid;
  grid-template-columns:
    minmax(24px, 1fr)
    repeat(12, minmax(0, clamp(4rem, 5vw, 5.5rem)))
    minmax(24px, 1fr);
  gap: clamp(1rem, 1.6vw, 2rem);
  grid-template-areas:
    ". kicker kicker kicker title title title title title media media media media ."
    ". dek    dek    dek    title title title title title media media media media ."
    ". body   body   body   body  body  body  aside aside aside aside aside aside .";
}
.ga-kicker { grid-area: kicker; }
.ga-title  { grid-area: title; }
.ga-dek    { grid-area: dek; }
.ga-media  { grid-area: media; }
.ga-body   { grid-area: body; }
.ga-aside  { grid-area: aside; }
```

## Section rhythm (never 2 same density back-to-back)

```css
.section-quiet  { min-block-size: 80svh; padding-block: clamp(8rem,12vw,12rem); }
.section-medium { min-block-size: 48svh; padding-block: clamp(4.5rem,8vw,7rem); }
.section-dense  { padding-block: clamp(2rem,4vw,4rem); }
```

## Correct rhythm sequence

quiet → dense → medium → dense → quiet

## Self-check before building

- Where are the empty rails?
- Is headline under 18ch?
- Do adjacent sections have different density?
- Does layout work without animations? (if not → layout is weak)

## Anti-patterns

❌ max-w-7xl mx-auto as only shell structure
❌ All sections with same py-24
❌ Center-aligned hero
❌ Symmetric 50/50 split everywhere
❌ No intentional empty space
