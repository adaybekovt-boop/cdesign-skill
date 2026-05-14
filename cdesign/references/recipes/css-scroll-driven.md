# Recipe: CSS Scroll-Driven Animations

Native browser API. Zero JavaScript. Compositor thread. Use for simple effects.

## When CSS (not GSAP)

Simple parallax, fade reveals, progress bars, gradient wipes, scale on scroll.

## When GSAP instead

Pinned sections, velocity effects, complex sequencing, physics.

## Parallax background

```css
.hero-bg {
  animation: parallax linear forwards;
  animation-timeline: scroll();
}
@keyframes parallax {
  from { transform: translateY(0); }
  to   { transform: translateY(-15%); }
}
```

## Fade reveal

```css
.reveal {
  animation: fade-up linear forwards;
  animation-timeline: view();
  animation-range: entry 10% entry 60%;
}
@keyframes fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

## Gradient text wipe (Linear-style)

```css
.gradient-text {
  background: linear-gradient(to right,
    #fff 0%, #fff 50%,
    rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 100%
  );
  background-size: 200% 100%;
  background-position: 100% 0;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: text-wipe linear forwards;
  animation-timeline: view();
  animation-range: entry 10% cover 50%;
}
@keyframes text-wipe { to { background-position: 0% 0; } }
```

## Anti-patterns

❌ Use for pinned sections (GSAP is better)
❌ Complex multi-element timelines (GSAP only)
❌ Velocity effects (impossible in CSS)
