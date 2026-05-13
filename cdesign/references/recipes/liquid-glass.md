# Recipe: Liquid Glass

Apple-style glass on UI elements (buttons, nav pills, badges, floating controls). **Progressive enhancement, NOT default.**

## When to use

- **YES:** primary CTA button, navigation pill, floating action menu, small badge, label chip
- **NO:** large surfaces, content cards, anything containing dense text
- **NO:** as a "fill the page with glass everywhere" aesthetic

Apple themselves reduced transparency in macOS for readability — your landing should too.

## What's in the starter

**Already mounted in `app/layout.tsx`:**
- `<LiquidTierProvider />` — sets `data-liquid-tier="full|lite|off"` on `<html>` based on device
- `<LiquidGlassFilter />` — global SVG displacement filter (used only on `full` tier)

**Available components:**
- `<LiquidButton>` — `components/ui/liquid-button.tsx`

**CSS classes you can apply manually:**
- `.liquid-button` — base glass styling
- `.liquid-button-strong` — heavier blur/saturation variant
- `.liquid-refract` — adds SVG displacement (only activates on desktop + full tier)

## Performance tier system (auto-detected by DeviceTierProvider)

| Tier | When | Glass Effect |
|------|------|--------|
| `full` | Desktop, >4 cores, >4GB RAM, motion enabled | Full blur + SVG displacement |
| `balanced` | Mobile, low-end, coarse pointer | Reduced blur (lite), no displacement |
| `low` | `prefers-reduced-motion` | Flat fallback, no blur |

`DeviceTierProvider` sets both `data-tier` and `data-liquid-tier` on `<html>`. CSS reads both automatically.

## Usage

### Basic glass button

```tsx
import { LiquidButton } from "@/components/ui/liquid-button";

<LiquidButton>Get started</LiquidButton>

// Stronger blur for hero CTA:
<LiquidButton intensity="strong" onClick={handleClick}>
  Open the experience
</LiquidButton>
```

### Apply glass to existing element

```tsx
<div className="liquid-button liquid-refract">
  Custom glass surface
</div>
```

The `.liquid-refract` class activates SVG displacement only on desktop + full tier. On mobile/lite/off it gracefully falls back to plain blur.

### Glass nav pill

```tsx
<nav className="liquid-button fixed top-6 left-1/2 -translate-x-1/2 flex gap-6 px-6 py-3">
  <a href="#about">About</a>
  <a href="#work">Work</a>
  <a href="#contact">Contact</a>
</nav>
```

## Hard limits (CRITIC ENFORCES)

❌ **Never** apply glass to elements containing >2 lines of body text
❌ **Never** apply glass to full-width sections
❌ **Never** stack >3 glass elements visually overlapping
❌ **Never** put glass over a busy/photographic background without darkening overlay (text becomes unreadable)
❌ **Never** add custom mousemove loops on top of liquid effects — destroys 60fps budget

## Trade-offs to know

- This is NOT true refraction. SVG displacement is a fake but cheap approximation
- Backdrop-filter is expensive — keep glass surfaces SMALL (max ~30% of viewport at any time)
- `.liquid-refract` requires `<LiquidGlassFilter>` mounted (already in starter layout)
- Safari/Chromium handle backdrop-filter differently — test in both
- On very weak devices the `off` tier kicks in — that's correct behavior, not a bug

## When NOT to use any glass at all

If user's Director's Roll vibe is:
- **VIBE C (Brutalist Developer)** — no glass, pure flat surfaces (Vercel/Stripe don't use glass)
- **VIBE E (Wabi-Sabi)** — no glass, anti-digital aesthetic

Glass works great in:
- **VIBE A (Hardcore 3D)** — glass nav over 3D scene = premium
- **VIBE B (Soft Editorial)** — subtle glass on CTA = luxury feel
- **VIBE D (SVG Logo Showcase)** — glass for floating controls
