# Recipe: Lenis + GSAP Ticker Sync

**You probably don't need this.** The starter (`adaybekovt-boop/cdesign-starter`) already has `lib/lenis.tsx` correctly configured. Read this ONLY if you're debugging a custom setup.

## The problem

Lenis runs its own RAF loop. GSAP runs its own ticker. If both run independently → 1-2 frame desync → scroll-tied animations jitter visibly.

## The fix

```tsx
"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05,
      wheelMultiplier: 1,
      syncTouch: true,
      autoRaf: false, // CRITICAL — disable Lenis' own RAF
    });

    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    lenis.on("scroll", ScrollTrigger.update);
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

## R3F compatibility

R3F has its own RAF inside `<Canvas>`. It coexists with Lenis+GSAP because R3F only updates the canvas — Lenis updates window scroll.

**Do NOT** use `<ScrollControls>` from `@react-three/drei` — it conflicts with Lenis. Instead use `useScroll` from `motion/react` (reads `window.scrollY` which Lenis updates).
