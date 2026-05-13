# Recipe: ScrollFilm — Master Timeline (Cinematic Mode)

**When to use:** user asks for "cinematic", "immersive", "video-like", "scroll-driven film", or premium animated landing. NOT for regular landings — overkill.

**Core idea:** ONE pinned section = ONE GSAP master timeline. Multiple "shots" share the same scroll progress. Result feels like a directed video, not a collection of effects.

## When NOT to use

- Standard landing page with multiple sections
- Mobile-first sites (pinned sections + heavy timelines = janky on low-end)
- More than 2 ScrollFilm sections on one page (gets exhausting)

## The pattern

```tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ScrollFilm() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=400%", // 4× viewport height of scroll
          scrub: 1, // smooth interpolation, ties to scroll
          pin: true,
          anticipatePin: 1,
        },
        defaults: { ease: "none" }, // linear — scrub controls easing
      });

      // SHOT 1 — Establishing (0–25%)
      tl.fromTo(
        q('[data-shot="hero"]'),
        { scale: 1.15, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1 }
      );

      // SHOT 2 — Compression (25–50%)
      tl.to(q('[data-shot="hero"]'), { scale: 0.82, opacity: 0.2, duration: 1 });
      tl.fromTo(
        q('[data-shot="detail"]'),
        { yPercent: 80, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1 },
        "<0.35" // overlap with previous tween by 35%
      );

      // SHOT 3 — Reveal (50–75%)
      tl.to(q('[data-shot="detail"]'), {
        xPercent: -35,
        opacity: 0.35,
        duration: 1,
      });

      // SHOT 4 — Resolution (75–100%)
      tl.fromTo(
        q('[data-shot="final"]'),
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1 },
        "<0.25"
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative h-[100dvh] overflow-hidden bg-background text-foreground"
    >
      <div data-shot="hero" className="absolute inset-0 grid place-items-center">
        <h1 className="text-[clamp(4rem,14vw,13rem)] leading-none font-medium tracking-tighter">
          CINEMA
        </h1>
      </div>
      <div data-shot="detail" className="absolute bottom-16 left-8 max-w-xl">
        <p className="text-[clamp(1.5rem,4vw,4rem)] leading-tight">
          One continuous scroll-controlled sequence.
        </p>
      </div>
      <div
        data-shot="final"
        className="absolute inset-0 grid place-items-center bg-foreground text-background"
      >
        <h2 className="text-[clamp(3rem,10vw,10rem)] leading-none font-medium">
          FINAL FRAME
        </h2>
      </div>
    </section>
  );
}
```

## Key concepts

**`scrub: 1`** — animation progress is tied to scroll position, with 1-second smoothing. NOT `scrub: true` (instant, jittery). NOT `scrub: 0.5` (too tight). 1 is the sweet spot.

**`end: "+=400%"`** — pin lasts for 4 viewport heights. More shots = longer end. Roughly 100% per shot.

**Position param `"<0.35"`** — start this tween 35% into the previous one. Use it to overlap shots so they bleed into each other (cinematic feel).

**`ease: "none"`** in defaults — scrub controls the timing, individual ease would fight the scroll position.

## DOM ↔ R3F sync (the cinematic glue)

If you have R3F objects that should animate WITH the DOM timeline (e.g. 3D object rotates as text reveals), share scroll progress via Motion's MotionValue:

```tsx
"use client";

import { motionValue } from "motion/react";

// Module-level shared value (or use a context)
export const filmProgress = motionValue(0);

// In ScrollFilm component, expose progress to other components:
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: root.current,
    start: "top top",
    end: "+=400%",
    scrub: 1,
    pin: true,
    onUpdate: (self) => filmProgress.set(self.progress),
  },
});

// In R3F component:
import { useFrame } from "@react-three/fiber";
import { filmProgress } from "./scroll-film";

function FilmObject() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (!ref.current) return;
    const p = filmProgress.get();
    ref.current.rotation.y = p * Math.PI * 2;
    ref.current.position.z = -2 + p * 3;
    ref.current.scale.setScalar(1 + p * 0.8);
  });
  return <mesh ref={ref}>{/* ... */}</mesh>;
}
```

No Zustand needed — `motionValue` from `motion/react` is already in the starter.

## Shot count guidance

- 3 shots minimum — feels like a sequence, not just a long animation
- 4–5 shots — sweet spot for landing hero
- 6+ shots — risk of feeling exhausting / lost
- end: "+=400%" for 4 shots, +500% for 5, etc.

---

## Cinematic Montage Tools

ScrollFilm by itself produces smooth, continuous motion. That's already premium — but if the user asked for "like a video" / "кинематографичный", add **montage tools** to mark scene transitions and create rhythm.

### Scene Progress (sceneProgress helper)

Long timelines need named scenes. Use `sceneProgress` from `@/lib/scene-helpers`:

```tsx
import { sceneProgress } from "@/lib/scene-helpers";
import { filmProgress } from "@/components/sections/scroll-film";
import { useFrame } from "@react-three/fiber";

function FilmObject() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!ref.current) return;
    const p = filmProgress.get();

    // Named scenes — readable, maintainable
    const intro  = sceneProgress(p, 0,    0.22);
    const reveal = sceneProgress(p, 0.22, 0.58);
    const climax = sceneProgress(p, 0.58, 0.84);
    const outro  = sceneProgress(p, 0.84, 1);

    ref.current.rotation.y = reveal * Math.PI * 1.5;
    ref.current.position.z = -4 + climax * 3;
    ref.current.scale.setScalar(1 + intro * 0.2);
    (ref.current.material as THREE.MeshStandardMaterial).opacity = 1 - outro * 0.5;
  });

  return <mesh ref={ref}>{/* ... */}</mesh>;
}
```

Each scene is 0→1 independently — same logic works in DOM with `useTransform` or inline styles.

### Frame Cuts (intentional hard transitions)

Smooth motion + ONE hard cut = cinema. Use `<FrameCut>`:

```tsx
import { FrameCut } from "@/components/ui/frame-cut";
import { useMotionValueEvent } from "motion/react";
import { filmProgress } from "@/components/sections/scroll-film";
import { useState } from "react";

function MyFilm() {
  const [cut, setCut] = useState(false);
  const cutFiredRef = useRef(false);

  useMotionValueEvent(filmProgress, "change", (p) => {
    // Fire flash at 58% — between climax and outro scenes
    if (p > 0.58 && p < 0.62 && !cutFiredRef.current) {
      cutFiredRef.current = true;
      setCut(true);
      setTimeout(() => setCut(false), 250);
    }
    // Reset when scrolled back
    if (p < 0.55) cutFiredRef.current = false;
  });

  return (
    <>
      <ScrollFilm /* ... */ />
      <FrameCut active={cut} variant="flash" />
    </>
  );
}
```

**Variants:** `flash` (white blink), `black` (cut to black), `wipe-down` (mask sweeps down), `wipe-right` (mask sweeps across).

**HARD LIMIT: max 1-2 cuts per landing page.** More = cheap music video feel.

### Rhythm Pulses (visual bass-hit, not literal audio)

For ONE moment of impact per scene — a pulse that feels like a bass drop. Uses `hit` helper:

```tsx
import { hit } from "@/lib/scene-helpers";

useFrame(() => {
  const p = filmProgress.get();
  const bassHit = hit(p, 0.42, 0.035); // peak at 42% scroll, narrow window

  // SUBTLE scale punch — never exceed 1.05x
  ref.current.scale.setScalar(1 + bassHit * 0.05);
});

// In DOM:
<motion.div
  style={{
    filter: useTransform(filmProgress, (p) => `contrast(${1 + hit(p, 0.42) * 0.15})`),
  }}
/>
```

**HARD LIMITS** (do not exceed, in scene-helpers.ts):
- Scale: max `1 + hit * 0.05` (so peak is 1.05x)
- Contrast: max `1 + hit * 0.2`
- Position shift: max `0.5` units in 3D, `4px` in DOM
- Max 2 hits per ScrollFilm section

### Montage Recipe (combined)

A cinematic ScrollFilm should include:
1. **scene mapping** (4+ named scenes via `sceneProgress`)
2. **at least one intentional cut** (`<FrameCut>` at a scene transition)
3. **smooth motion as the base** (the 95%)
4. **maybe 1 rhythm accent** (`hit()` pulse at climax)

NOT all four at maximum intensity. The cut and pulse are the ACCENTS. The smooth motion is the song.

### Anti-patterns

ScrollFilm structure:
❌ Putting ALL sections inside one ScrollFilm — feels like an interactive video, not a website
❌ Using ScrollFilm without `pin: true` — scroll progress doesn't have time to play out
❌ `scrub: true` (instant) — feels jittery, missing cinematic smoothness
❌ Individual easing on each tween — fights the scroll progress

Montage tools:
❌ Cut at every scene transition (max 1-2 total per page)
❌ Bass pulse on every scroll moment (max 2 per section)
❌ Long FrameCut duration (>0.4s) — feels slow, breaks rhythm
❌ Visible color flashes during normal scroll (only on intentional cuts)
❌ Using these tools on standard landings — they're for explicitly cinematic intent only
