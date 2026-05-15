# Recipe: Hero Reveal Choreography

Premium hero animation = layered entrance with overlapping timing.
Background loads first, then title, then supporting elements.

## The sequence (every premium hero follows this)

```
Phase 1 (0-500ms):    Background/3D scene fades in or scales from 1.15→1.0
Phase 2 (300-800ms):  Title reveals (translateY + opacity, or SplitText chars)
Phase 3 (600-1200ms): Subtitle/description appears
Phase 4 (900-1500ms): CTA button + nav elements
```

Key: phases OVERLAP. Phase 2 starts before Phase 1 ends.

## GSAP implementation

```tsx
const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

tl.from(".hero-bg", { scale: 1.15, opacity: 0, duration: 1.2 })
  .from(".hero-title", { y: 50, opacity: 0, duration: 0.8 }, "<0.3")
  .from(".hero-subtitle", { y: 30, opacity: 0, duration: 0.6 }, "<0.2")
  .from(".hero-cta", { y: 20, opacity: 0, duration: 0.5 }, "<0.15")
  .from(".nav-link", { y: -20, opacity: 0, stagger: 0.08, duration: 0.4 }, "<0.1");
```

## The “<0.2” overlap pattern

`"<0.2"` = start this tween 0.2 seconds before the end of the previous one.
This creates cinematic flow where elements bleed into each other.

Without overlap: robotic reveal (element by element, waiting for each to finish).
With overlap: cinematic reveal (everything flows together).

## With SplitText for premium title

```tsx
const split = new SplitType(".hero-title", { types: "chars" });

tl.from(".hero-bg", { scale: 1.15, opacity: 0, duration: 1.2 })
  .from(split.chars, {
    y: 100, opacity: 0, rotateX: -90,
    stagger: 0.02, duration: 0.8,
    ease: "back.out(1.7)"
  }, "<0.3")
  .from(".hero-subtitle", { y: 30, opacity: 0, duration: 0.6 }, "<0.2");
```

## Anti-patterns

❌ All elements appear simultaneously (no choreography)
❌ Sequential reveal with no overlap (feels like a slideshow)
❌ Each element has a separate ScrollTrigger (should be ONE timeline)
❌ Background loads AFTER text (feels broken)
