# Recipe: CSS Scroll-Driven Animations

Native browser API. Zero JavaScript. Runs on compositor thread.
Use for simple scroll-linked effects. Use GSAP for complex choreography.

## When to use CSS (not GSAP)

- Simple parallax (background moves slower than content)
- Fade in/out on scroll
- Progress bars
- Scale/opacity reveals for non-critical elements
- Background gradient reveals

## When to use GSAP instead

- Pinned sections with complex timelines
- Velocity-driven effects
- Sequenced multi-element choreography
- Anything requiring JavaScript state

## Core syntax

```css
/* Link animation to scroll position */
.element {
  animation: my-animation linear forwards;
  animation-timeline: scroll();           /* whole page scroll */
  /* OR */
  animation-timeline: view();             /* element's own visibility */
  animation-range: entry 0% cover 50%;   /* when to play */
}

/* animation-range values:
   entry 0%   = element starts entering viewport
   entry 100% = element fully entered
   cover 0%   = element starts covering viewport
   cover 100% = element covers fully
   exit 0%    = element starts leaving
   contain    = while fully visible
*/
```

## Parallax background

```css
.hero-bg {
  animation: parallax-scroll linear forwards;
  animation-timeline: scroll();
}

@keyframes parallax-scroll {
  from { transform: translateY(0); }
  to   { transform: translateY(-15%); }
}
```

## Text fade reveal

```css
.reveal-text {
  animation: fade-up linear forwards;
  animation-timeline: view();
  animation-range: entry 10% entry 60%;
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## Gradient wipe on text (Linear-style)

```css
.gradient-text {
  background: linear-gradient(
    to right,
    #ffffff 0%, #ffffff 50%,
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

@keyframes text-wipe {
  to { background-position: 0% 0; }
}
```

## Browser support check

```css
/* Wrap CSS scroll-driven in @supports
   If not supported, elements stay at final state (opacity:1, transform:none) */

@supports (animation-timeline: scroll()) {
  /* ... scroll-driven rules here */
}
```

## Performance vs GSAP

| Aspect | CSS Scroll-Driven | GSAP ScrollTrigger |
|--------|------------------|--------------------|
| JS payload | 0 KB | ~23 KB |
| Thread | Compositor | Main thread |
| Complexity | Simple | Complex |
| Sequencing | No | Yes |
| Velocity | No | Yes |
| Browser support | Chrome/Edge/Safari/FF 2025+ | All |

## Anti-patterns

❌ Use for pinned sections — GSAP does this better
❌ Complex multi-element timelines — GSAP only
❌ Velocity effects — impossible in CSS
