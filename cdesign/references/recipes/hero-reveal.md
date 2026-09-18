# Recipe: Hero Reveal Choreography

Use a layered entrance only when the genome calls for a staged reveal. A strong hero may instead open statically, cut between states, expose content through interaction, or let the primary object lead.

## Example sequence

```
Phase 1 (0-500ms):    Background/3D scene fades in or scales from 1.15→1.0
Phase 2 (300-800ms):  Title reveals (translateY + opacity, or SplitText chars)
Phase 3 (600-1200ms): Subtitle/description appears
Phase 4 (900-1500ms): CTA button + nav elements
```

In this example, phases overlap. That creates continuity, but overlap is not mandatory for mechanical, document-like, or deliberately abrupt directions.

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

Without overlap the result is discrete; with overlap it is continuous. Choose deliberately from the motion field in DESIGN_GENOME.

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

❌ Reveal order contradicts reading order
❌ Every project repeats this exact timeline
❌ Independent triggers drift when the sequence should be coordinated
❌ Essential text waits on a decorative asset or failed animation
❌ No reduced-motion end state
