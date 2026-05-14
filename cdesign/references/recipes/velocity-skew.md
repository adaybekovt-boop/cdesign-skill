# Recipe: Velocity Skew (Stripe Pattern)

Scroll fast → elements skew on axis → spring back to rest. Stripe uses this on bento grids.

## When to use

Bento grids, card grids, hero elements that should feel “weighted”.

## Implementation

```tsx
"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function useVelocitySkew(
  selector: string,
  options: { max?: number; factor?: number; spring?: number } = {}
) {
  const { max = 12, factor = 150, spring = 0.3 } = options;

  useEffect(() => {
    const skewSetter = gsap.quickSetter(selector, "skewY", "deg");
    const clamp = gsap.utils.clamp(-max, max);
    let proxy = { skew: 0 };

    const trigger = ScrollTrigger.create({
      onUpdate: (self) => {
        const target = clamp(self.getVelocity() / -factor);
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

## Calibration

|Use case              |max  |factor|
|----------------------|-----|------|
|Subtle (product cards)|4–6  |250   |
|Standard (bento grid) |8–12 |150   |
|Aggressive (hero)     |12–16|100   |

## Anti-patterns

❌ max > 20 — looks broken
❌ Apply to text blocks — illegible during fast scroll
❌ Combine with rotation simultaneously
❌ Enable on mobile (disable via DeviceTier balanced/low)
