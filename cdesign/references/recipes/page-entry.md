# Recipe: Page Entry / Preloader

OPTIONAL. Use when site has heavy 3D assets, video, or complex WebGL that takes >1s to load.
For simple text landings — skip the preloader entirely.

## The pattern

```
[Preloader screen] → fade out → [Hero reveal timeline]
```

Preloader shows brand logo or minimal loading indicator.
After assets ready → GSAP timeline starts:

```tsx
function onAssetsReady() {
  const tl = gsap.timeline();

  // Phase 1: Remove preloader
  tl.to(".preloader", {
    opacity: 0, duration: 0.6,
    ease: "power2.inOut",
    onComplete: () => preloader.remove()
  })

  // Phase 2: Reveal hero (overlap with preloader exit)
  .from(".hero-bg", { scale: 1.1, opacity: 0, duration: 1.0 }, "<0.2")
  .from(".hero-title", { y: 40, opacity: 0, duration: 0.7 }, "<0.25")
  .from(".hero-subtitle", { y: 20, opacity: 0, duration: 0.5 }, "<0.15")
  .from(".nav", { y: -30, opacity: 0, duration: 0.4 }, "<0.1");
}
```

## Key: overlap between preloader exit and content entry

The `"<0.2"` means content starts appearing 0.2s BEFORE preloader fully disappears.
This prevents the “black flash” between preloader and content.

## Preloader CSS

```css
.preloader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  place-items: center;
  background: var(--bg-page);
}
```

## When to skip preloader

- Text-only landing page
- No WebGL/R3F/heavy video
- LCP under 1.5s without preloader
- User explicitly says “no preloader”

## Anti-patterns

❌ Preloader that takes >3 seconds (users leave)
❌ Generic spinning loader (use brand element instead)
❌ Preloader blocks content that’s already loaded
❌ No preloader when 3D scene takes 4s to compile shaders (white screen)
