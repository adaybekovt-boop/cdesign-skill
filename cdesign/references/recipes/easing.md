# Recipe: Easing Curves

Calibrated cubic-bezier values used by top studios (Emil Kowalski standard).

## The four canonical eases

| Name | Tailwind class | Cubic-Bezier | Duration | Use case |
|------|----------------|--------------|----------|----------|
| `ease-out-expo` | `ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | 250–300ms | **DEFAULT for everything.** Modals, reveals, page transitions. |
| `ease-spring` | `ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 150–200ms | Micro-interactions, success states, button feedback |
| `ease-snappy` | `ease-snappy` | `cubic-bezier(0.4, 0, 0.2, 1)` | 100–150ms | UI toggles, structural changes |
| `ease-ios` | `ease-ios` | `cubic-bezier(0.32, 0.72, 0, 1)` | 300–400ms | Drawer slides, sheet reveals |

## Tailwind classes already in starter

The starter has all four mapped in `tailwind.config` / `@theme`:

```tsx
<motion.div transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} />
// or via Tailwind:
<div className="transition-transform duration-300 ease-out-expo" />
```

## GSAP equivalents

```ts
gsap.to(el, {
  x: 100,
  duration: 0.3,
  ease: "cubic-bezier(0.16, 1, 0.3, 1)",  // exact string
  // or GSAP's named equivalent:
  // ease: "power4.out"
});
```

## Banned eases

- `linear` — robot feel (only OK for marquees and continuous loops)
- `ease` (browser default) — generic, undefined character
- `ease-in` / `ease-out` / `ease-in-out` (browser defaults) — too generic

## Motion.dev spring physics

For drag-to-dismiss, organic interactions:

```tsx
<motion.div
  drag
  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
  transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.5 }}
/>
```

Spring tuning:
- `stiffness 100, damping 30` — gentle, modal
- `stiffness 200, damping 20` — snappy, button click feedback
- `stiffness 400, damping 15` — aggressive, attention-grabbing

DO NOT use spring physics on functional state changes (form submit, navigation) — feels chaotic. Use spring only for decorative/playful interactions.
