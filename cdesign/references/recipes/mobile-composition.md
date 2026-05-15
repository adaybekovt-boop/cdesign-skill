# Recipe: Mobile-Specific Composition

Mobile is NOT “compressed desktop”. It’s a different composition.

## Layout changes (not just responsive)

Desktop: asymmetric grid with empty rails, hero spans 5+7 columns
Mobile: single column, full-width media, stacked content

```css
@media (max-width: 768px) {
  .grid-shell {
    grid-template-columns: 1rem 1fr 1rem;
    grid-template-areas:
      ". title ."
      ". media ."
      ". body .";
  }
}
```

## Typography scale changes

Desktop hero title: clamp(4rem, 14vw, 13rem)
Mobile hero title: clamp(2rem, 8vw, 3.5rem)

Use separate clamp() ranges, not just viewport scaling:

```css
h1 {
  font-size: clamp(2rem, 8vw, 3.5rem);
}
@media (min-width: 768px) {
  h1 {
    font-size: clamp(4rem, 8vw, 10rem);
  }
}
```

## Motion reduction (not removal)

Desktop: 5-layer parallax, particles, shader background, magnetic buttons
Mobile: 2-layer parallax, no particles, CSS gradient, standard buttons

The IDENTITY stays the same. The INTENSITY decreases.

```tsx
const tier = useDeviceTier(); // from DeviceTierProvider

return (
  <>
    {tier === "full" && <ShaderGradientBg />}
    {tier === "balanced" && <div className="css-gradient-fallback" />}
    {tier === "low" && <div className="static-bg" />}
  </>
);
```

## Touch replaces hover

Desktop: magnetic button, tilt card, custom cursor
Mobile: tap scale feedback, swipe galleries, no custom cursor

```css
@media (hover: none) {
  .magnetic-btn { pointer-events: none; /* disable magnetic pull */ }
  .custom-cursor { display: none; }
}

button:active {
  transform: scale(0.97);
  transition: transform 120ms ease;
}
```

## Mobile animation budget (enforced)

- Max 1 pinned ScrollTrigger section
- Max 1 R3F canvas visible
- Max 3 animated elements per viewport
- Max 1 backdrop-filter element per viewport
- No continuous blur animation
- Stagger on mobile: 0.03-0.05 (wider than desktop 0.02)
- Duration on mobile: 20-30% shorter than desktop

## Anti-patterns

❌ Same parallax layers on mobile as desktop (janky, battery drain)
❌ Custom cursor on touch devices (useless)
❌ backdrop-filter: blur() on multiple cards simultaneously (kills Safari)
❌ Same animation duration on mobile and desktop (mobile should be snappier)
❌ Hiding content entirely on mobile instead of simplifying layout
