# Recipe: Mobile-Specific Composition

Mobile is NOT “compressed desktop”. It’s a different composition.

## Layout changes (not just responsive)

Desktop and mobile may use different spatial arrangements. Preserve the identity-bearing relationship rather than mechanically stacking desktop columns.

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

Use separate type decisions when the mobile measure, hierarchy, or crop changes. These values are examples:

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

Translate expensive mechanisms into cheaper equivalents while keeping the motif, hierarchy, and state meaning.

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

## Mobile performance gate

- Avoid simultaneous heavy pinned, WebGL, video, or filter systems in one viewport.
- Keep one visible canvas unless profiling proves more is safe.
- Do not continuously animate blur or backdrop-filter.
- Remove pointer-only behavior and expose the same action to touch and keyboard.
- Tune density and timing to the actual device and content; do not apply a universal stagger or percentage reduction.
- Test the real breakpoint and interaction. Source inspection is not enough.

## Anti-patterns

❌ Same parallax layers on mobile as desktop (janky, battery drain)
❌ Custom cursor on touch devices (useless)
❌ backdrop-filter: blur() on multiple cards simultaneously (kills Safari)
❌ Same animation duration on mobile and desktop (mobile should be snappier)
❌ Hiding content entirely on mobile instead of simplifying layout
