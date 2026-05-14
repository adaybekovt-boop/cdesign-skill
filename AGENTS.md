# cdesign runtime

Generate cinematic landing pages. Read all files in cdesign/ before generating anything.

## Bootstrap

```bash
npx create-next-app@latest <name> -e https://github.com/adaybekovt-boop/cdesign-starter
```

## Core rules

- One spectacle per viewport (no stacking shader + particles + magnetic in same section)
- Transform + opacity only for animations (never width/height/top/left/box-shadow)
- Stagger 0.015–0.025 (target 0.02)
- Default ease: cubic-bezier(0.16, 1, 0.3, 1)
- Motion hierarchy: hero > transitions > UI hover > ambient
- Temporal: micro 120–220ms / UI 300–500ms / scene 800–1400ms / ambient 3–12s

## Stack

Next 15 + React 19 + TypeScript + Tailwind v4 + Motion (motion/react) + GSAP 3.13 + Lenis 1.3 + R3F v9 + Drei

## Do NOT

- Invent new animation architecture — use starter components
- Use framer-motion package (use motion/react instead)
- Use Locomotive Scroll (use Lenis)
- Use Zustand for motion state (use MotionValue)
- Use Inter/Geist/Roboto fonts (use Hanken Grotesk + Migra)
- Add key={index}, h-screen, hardcoded hex, useState for mousemove

## References

- Vibes: cdesign/references/director-roll.md
- Banned patterns: cdesign/references/anti-slop.md
- Techniques: cdesign/references/recipes/
