# Recipe: Shell-First Layout

The difference between award-winning and generic Tailwind template.

Generic approach: pick components (hero, features, CTA), stack them, add animations.
Shell-first approach: design the grid shell with empty rails first, then fill it.

## The core insight

If your landing page can be rebuilt without loss using:
`max-w-7xl mx-auto px-6` + `lg:grid-cols-2` + uniform `py-24`
→ it reads as a template regardless of how good the animations are.

## Shell anatomy

A premium page shell has:
- 12–14 named tracks
- Intentionally empty rails (25–45% of width unused in hero)
- Headline measure: 14–18ch max
- Body measure: 56–68ch max
- Caption/aside measure: 24–32ch max

## Named areas grid

```css
/* globals.css */
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

@media (max-width: 64rem) {
  .grid-shell {
    grid-template-columns: 1rem repeat(8, minmax(0, 1fr)) 1rem;
    grid-template-areas:
      ". title title title title title title title title ."
      ". media media media media media media media media ."
      ". dek   dek   dek   dek   dek   dek   dek   dek   ."
      ". body  body  body  body  body  body  body  body  ."
      ". aside aside aside aside aside aside aside aside .";
  }
}
```

## Section rhythm tokens

```css
/* Already in globals.css via motion-section classes — add these: */
.section-quiet  {
  min-block-size: 80svh;
  padding-block: clamp(8rem, 12vw, 12rem);
}

.section-medium {
  min-block-size: 48svh;
  padding-block: clamp(4.5rem, 8vw, 7rem);
}

.section-dense {
  padding-block: clamp(2rem, 4vw, 4rem);
}
```

## Rhythm rule

**Never put 2 sections with same density class back-to-back.**

Correct sequence: quiet → dense → medium → dense → quiet
Wrong sequence: medium → medium → medium → medium

## Usage in page

```tsx
export default function Home() {
  return (
    <main>
      {/* Hero: quiet (breathing room, asymmetric grid) */}
      <section className="grid-shell section-quiet motion-section">
        <p className="ga-kicker text-xs uppercase tracking-widest text-muted">
          Product name
        </p>
        <h1 className="ga-title max-w-[16ch] text-6xl font-medium tracking-tighter leading-[0.92]">
          The headline lives in a narrow measure.
        </h1>
        <p className="ga-dek max-w-[56ch] text-lg text-muted">
          Supporting copy sits in its own zone.
        </p>
        <figure className="ga-media aspect-[4/5] overflow-hidden rounded-3xl bg-elevated" />
      </section>

      {/* Proof: dense (tight, energetic) */}
      <section className="section-dense motion-section px-6">
        {/* stats, logos, metrics */}
      </section>

      {/* Story: medium */}
      <section className="section-medium motion-section">
        {/* product walkthrough */}
      </section>

      {/* CTA: quiet (back to breathing room) */}
      <section className="section-quiet motion-section">
        {/* exit CTA */}
      </section>
    </main>
  );
}
```

## Self-check before building

Before writing components, ask:
- Where are the empty rails?
- Is the headline under 18ch?
- Do adjacent sections have different density?
- Does the layout work without any animations?

If layout breaks without animations → layout is weak.
Good layout looks intentional even as static HTML.

## Anti-patterns

❌ `max-w-7xl mx-auto` as the only shell structure
❌ All sections with same `py-24`
❌ Center-aligned hero (headline + subhead + CTA all centered)
❌ Symmetric 50/50 split everywhere
❌ No intentional empty space
