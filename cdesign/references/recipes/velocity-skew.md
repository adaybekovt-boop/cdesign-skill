# Recipe: Velocity Skew (Stripe Pattern)

Scroll fast → elements skew on their axis → spring back to rest.
Adds physical inertia feel. Stripe uses this on bento grids and hero elements.

## When to use
- Bento grid sections
- Card grids
- Hero elements that should feel "weighted"
- Any section where premium kinetic feel is needed

## Core concept

Velocity = change in scroll position over time.
Map velocity → skewY degrees → spring back to 0.

## Implementation

```tsx
"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * useVelocitySkew — apply scroll-velocity-driven skew to elements
 *
 * Usage:
 *   useVelocitySkew(".bento-card")
 *   useVelocitySkew(".hero-element", { max: 8, factor: 200 })
 */
export function useVelocitySkew(
  selector: string,
  options: {
    max?: number;    // max skew degrees. Default 12. Lower = subtler.
    factor?: number; // velocity divisor. Higher = less sensitive. Default 150.
    spring?: number; // spring tension 0-1. Default 0.3.
  } = {}
) {
  const { max = 12, factor = 150, spring = 0.3 } = options;

  useEffect(() => {
    const skewSetter = gsap.quickSetter(selector, "skewY", "deg");
    const clamp = gsap.utils.clamp(-max, max);

    let proxy = { skew: 0 };

    const trigger = ScrollTrigger.create({
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        const target = clamp(velocity / -factor);

        if (Math.abs(target) > Math.abs(proxy.skew)) {
          proxy.skew = target;

          gsap.to(proxy, {
            skew: 0,
            duration: 0.9,
            ease: `elastic.out(1, ${spring})`,
            overwrite: true,
            onUpdate: () => skewSetter(proxy.skew),
          });
        }
      },
    });

    return () => trigger.kill();
  }, [selector, max, factor, spring]);
}
```

## Usage in component

```tsx
import { useVelocitySkew } from "@/hooks/use-velocity-skew";

export function BentoGrid() {
  useVelocitySkew(".bento-card", { max: 8, factor: 200 });

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bento-card rounded-2xl bg-elevated p-6">...</div>
      <div className="bento-card rounded-2xl bg-elevated p-6">...</div>
      <div className="bento-card rounded-2xl bg-elevated p-6">...</div>
    </div>
  );
}
```

## Calibration guide

| Use case | max | factor | spring |
|----------|-----|--------|--------|
| Subtle (product cards) | 4–6 | 250 | 0.4 |
| Standard (bento grid) | 8–12 | 150 | 0.3 |
| Aggressive (hero) | 12–16 | 100 | 0.25 |

## Anti-patterns

❌ max > 20 — looks broken, not premium
❌ Apply to text blocks — illegible during fast scroll
❌ Combine with rotation — too much happening
❌ Use on mobile — disable via DeviceTier check
