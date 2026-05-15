# Recipe: SVG Shape Morphing

OPTIONAL. For logo transitions, organic blob morphing, icon state changes.

## Simple path morph with GSAP (no extra dependency)

If source and target SVG paths have same number of points:

```tsx
gsap.to("#logo-path", {
  attr: { d: targetPathData },
  duration: 1.2,
  ease: "power2.inOut"
});
```

This works for simple shapes but breaks on paths with different point counts.

## Flubber (when paths have different point counts)

```bash
npm install flubber
```

```tsx
import { interpolate } from "flubber";

const morpher = interpolate(pathA, pathB, { maxSegmentLength: 2 });

gsap.to({ t: 0 }, {
  t: 1,
  duration: 1.5,
  ease: "power3.inOut",
  onUpdate: function() {
    pathElement.setAttribute("d", morpher(this.targets()[0].t));
  }
});
```

## Use cases

- Logo reveal on load (simple shape → full logo)
- Section transition (blob → angular shape for theme shift)
- Icon state change (menu → close, play → pause)
- Loading state (morphing abstract shapes)

## Anti-patterns

❌ Morphing very complex paths (>200 points) — performance issue
❌ Morphing on every scroll frame — use only for discrete transitions
❌ Morphing text directly — use SplitText reveals instead
