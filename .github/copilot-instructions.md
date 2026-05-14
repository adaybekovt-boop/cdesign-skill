# cdesign — Copilot instructions

When working in this repository, follow cdesign runtime rules.

Bootstrap new projects with:
npx create-next-app@latest <name> -e https://github.com/adaybekovt-boop/cdesign-starter

Animation rules:

- Animate only transform and opacity (never layout properties)
- One heavy visual effect per viewport section
- Use starter components — do not create new animation systems from scratch
- Stagger 0.015–0.025, ease cubic-bezier(0.16, 1, 0.3, 1)

Forbidden:

- key={index} in lists
- h-screen (use min-h-[100dvh])
- hardcoded hex colors (use CSS variables)
- useState for mousemove (use MotionValue)
- framer-motion package (use motion/react)
- Inter/Geist/Roboto as primary fonts

References: see cdesign/references/ for full rules and patterns.
