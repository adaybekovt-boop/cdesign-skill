# Recipe: Dark Theme Token System

Concrete CSS variable values for premium dark themes.
Based on Vercel (#0a0a0a), Linear, Raycast, Arc patterns.

## Core principle: NEVER pure #000000

Pure black causes halation on OLED, smearing on scroll, and harsh contrast.
Use “atmospheric” dark values with subtle warm or cool undertones.

## Token system

```css
:root {
  /* Backgrounds — layered surfaces */
  --bg-page: #0a0a0a;        /* Main page background */
  --bg-surface: #111113;     /* Cards, panels (slightly elevated) */
  --bg-elevated: #1a1a1e;    /* Modals, dropdowns, hover surfaces */
  --bg-overlay: rgba(0,0,0,0.6); /* Overlay behind modals */

  /* Text — opacity-based hierarchy */
  --text-primary: rgba(255,255,255,0.92);    /* Headlines, important */
  --text-secondary: rgba(255,255,255,0.60);  /* Body copy, descriptions */
  --text-muted: rgba(255,255,255,0.38);      /* Captions, timestamps */
  --text-disabled: rgba(255,255,255,0.20);   /* Inactive states */

  /* Borders and dividers — barely visible */
  --border-default: rgba(255,255,255,0.12);
  --border-hover: rgba(255,255,255,0.20);
  --border-active: rgba(255,255,255,0.30);
  --divider: rgba(255,255,255,0.08);

  /* Accent — choose ONE per project */
  --accent: oklch(0.75 0.18 145);  /* Example: bright green */
  --accent-muted: oklch(0.55 0.12 145);
  --accent-glow: oklch(0.75 0.18 145 / 0.3);
}
```

## OKLCH for accent colors (no library needed)

CSS natively supports oklch(). No culori/chroma.js required.

```css
/* Generate accent scale using CSS oklch() */
--accent-100: oklch(0.95 0.05 145);
--accent-300: oklch(0.85 0.12 145);
--accent-500: oklch(0.75 0.18 145);
--accent-700: oklch(0.55 0.15 145);
--accent-900: oklch(0.35 0.10 145);
```

OKLCH prevents the “grey dead zone” that happens with RGB interpolation.

## Usage in globals.css

Already defined tokens are applied through Tailwind classes or direct var() references.
Components use semantic tokens (–text-primary), never raw hex values.

## Anti-patterns

❌ Pure #000000 as background
❌ Pure #ffffff as text color (use 0.92 opacity)
❌ Hardcoded hex in components instead of CSS variables
❌ Different opacity scales on different pages (keep consistent)
