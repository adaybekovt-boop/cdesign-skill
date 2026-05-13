---
name: cdesign
description: Generate cinematic, production-grade landing pages that mimic Claude Design quality. Triggers on /cdesign command or any request to build a landing page, hero section, marketing site, or interactive prototype with award-winning motion. Uses a pre-configured starter (adaybekovt-boop/cdesign-starter) with Next 15 + Motion + GSAP + Lenis + R3F. Includes Director's Roll vibe selection and a strict critic agent.
---

# cdesign v2.0 — Cinematic Landing Page Generator

A pastiche of Claude Design for Claude Code. Spawns a pre-configured starter project, generates landing using built-in components, then runs a strict critic agent.

**v2.0 key change**: no more manual scaffolding. Uses the cdesign-starter template which has the entire stack (Lenis+GSAP sync, Motion, R3F, design tokens, anti-slop fonts) pre-configured. Saves ~70% of tokens compared to v1.

## When to use

Trigger automatically when the user:
- Types `/cdesign "idea"` (with optional reference image or URL)
- Asks for a landing page, hero section, marketing site, or interactive prototype
- Mentions "cinematic", "smooth scroll", "Awwwards-style", "Linear/Vercel/Stripe vibe", "claude design", "красивый лендинг"

## Workflow

### Phase 0 — Parse input

Command syntax: `/cdesign "<idea>" [reference] [--research]`

- **Image** (.png/.jpg/.webp) → Read tool
- **URL** → WebFetch
- **None** → judge by user's prompt alone

Optional flag `--research` → enable WebSearch for Awwwards SOTD references (~30s overhead).

If user provides video link — say plainly video is not supported, ask for screenshots or URL.

### Phase 0.5 — Research & Plan (brief, ≤3 tool calls)

1. If image attached → Read it. Extract dominant colors, mood, 3D potential (is this a product/portrait/abstract that could become R3F texture?)
2. If URL attached → WebFetch it. Note layout, typography, motion aggression
3. If `--research` flag → ONE WebSearch like `Awwwards 2026 [concept] [vibe]`
4. **Director's Roll** — see `references/director-roll.md`. Pick ONE vibe. Output to user: `Director's Roll: <VIBE_NAME> selected.`
5. Brief plan to user (5-8 lines, no questions):
   ```
   Vibe: [from Director's Roll]
   Palette: [3 hex values from reference or vibe default]
   Hero: [Path A photo-3D / Path B abstract / Path C SVG logo / Path D editorial]
   Motion stack: [list 7+ techniques to include]
   Building now.
   ```

### Phase 1 — Read required references

Read these BEFORE writing code. They are slim by design (lazy-loaded recipes elsewhere):

1. `references/director-roll.md` — vibe matrix
2. `references/anti-slop.md` — bans (mono labels, slop fonts, fake stats, fictional signatures, AI words EN+RU)
3. `references/critic-prompt.md` — what the critic checks

Do NOT preload all recipes. They are in `references/recipes/*.md` and you read each only when you decide to use that technique.

### Phase 2 — Scaffold from starter (CRITICAL — saves 70% tokens)

Run ONE command instead of writing dozens of boilerplate files:

```bash
npx create-next-app@latest <project-name> -e https://github.com/adaybekovt-boop/cdesign-starter
cd <project-name>
npm install
```

The starter already includes:
- Next 15 + Tailwind v4 + TS configured
- Lenis bound to GSAP ticker (`lib/lenis.tsx`)
- Design tokens with multi-layer shadows (`app/globals.css`)
- Hanken Grotesk + Migra fonts (NOT Geist — that's slop)
- ScrollProgress + GrainOverlay mounted in layout
- 7 UI primitives in `components/ui/` (MagneticButton, RevealImage, TiltCard, Marquee, SplitTextReveal, SvgPathDraw)
- 2 sections in `components/sections/` (PinnedScrub, MultiLayerParallax)
- 5 R3F components in `components/three/` (PhotoTo3D, GeometricHero, SvgLogo3D, FloatingObject, CanvasScrub)

**You do NOT rewrite these.** You import them and compose. If you need a new variant, look at the existing component first.

After scaffold, tell user to add fonts (one-time): see `public/fonts/README.md` in the starter.

### Phase 2.5 — Shot List (CONDITIONAL — only for cinematic intent)

**Trigger words:** if user prompt contains "cinematic", "immersive", "video-like", "scroll-driven film", "feels like a video", "кинематографичный", "как видео" — enter ScrollFilm mode.

**Otherwise: SKIP this phase entirely.** Standard landings don't need shot lists.

If triggered:
1. Read `references/recipes/scroll-film.md`
2. Before writing components, output a Shot List (4 shots min) for the hero ScrollFilm section:
   ```
   Shot 01 — Establishing Frame (0–25%)
     Camera: scale-in from 1.15 to 1, opacity 0→1
     FG: headline locks center, grain visible
     BG: dark, idle particle drift
     Text: SplitTextReveal stagger 0.02

   Shot 02 — Compression (25–50%)
     Camera: hero scales down to 0.82, opacity 0.2
     FG: subtitle slides in from bottom
     BG: subtle parallax
     Transition: 35% overlap with Shot 01

   Shot 03 — Reveal (50–75%)
     ...
   Shot 04 — Resolution (75–100%)
     ...
   ```
3. Implement ONE `<ScrollFilm>` master timeline matching the shot list
4. **Use montage tools** from the recipe:
   - `sceneProgress()` helper for named scenes (read `lib/scene-helpers.ts`)
   - `<FrameCut>` at ONE scene transition (max 2 cuts per page)
   - Optional `hit()` rhythm pulse at climax (subtle: max 1.05x scale)
5. If R3F is involved, share progress via Motion's `motionValue` (NOT Zustand) — pattern in recipe

**Result:** Hero section feels like a directed video with scene structure, intentional cuts, and rhythm — not a collection of effects.

### Phase 3 — Build (Zoom-In Method)

Three sequential passes. Do not skip ahead.

**Pass 1 — Macro structure (50%)**
Write `app/page.tsx` as ONLY a section list using starter components:
```tsx
export default function Home() {
  return (
    <main>
      <Hero />          {/* you'll build this */}
      <SectionTwo />    {/* you'll build this */}
      <SectionThree />  {/* you'll build this */}
      <Footer />
    </main>
  );
}
```
No motion yet. Just structure + headings + body text. Verify left-aligned hero, asymmetric grids, no banned patterns.

**Pass 2 — Design tokens & content (80%)**
Wire up actual copy (anti-slop compliant — see `anti-slop.md`). Apply proper typography hierarchy. Compose pre-built UI primitives.

**Pass 3 — Motion & micro-interactions (100%)**
Now add scroll triggers, split-text reveals, R3F scenes, hover choreography. For each technique you're unsure about, READ the recipe file:
- `references/recipes/lenis-gsap-sync.md` — only if writing custom Lenis logic (starter has it)
- `references/recipes/split-reveal.md` — stagger calibration
- `references/recipes/pinned-scrub.md` — pinned ScrollTrigger pattern
- `references/recipes/r3f-photo.md` — photo to 3D plane
- `references/recipes/multi-layer-parallax.md` — 3-layer depth
- `references/recipes/canvas-scrub.md` — frame-by-frame video alternative
- `references/recipes/scroll-film.md` — cinematic master timeline (Phase 2.5 only)
- `references/recipes/liquid-glass.md` — Apple-style glass with auto-degradation
- `references/recipes/easing.md` — exact cubic-bezier values

**Never write complex motion from memory.** Always Read the recipe first.

### Phase 4 — Self-audit (inline, before launching critic)

Quick check, if any fail → fix:
- [ ] No banned words (EN+RU lists in anti-slop.md)
- [ ] No editorial mono labels (`/ 01 —`, `/ CITY, KZ`, `CITY · KZ`, `EST. 2022`, `KIT BY`, `SCROLL ↓`)
- [ ] No fabricated stats sections (`1240 / РАСПИСАННЫХ ВЕЩЕЙ` patterns)
- [ ] No fictional author signatures (`— SomeName · City`)
- [ ] No purple→pink gradients on CTAs
- [ ] No center-aligned hero
- [ ] At least 7 motion techniques present
- [ ] At least 2 starter components composed
- [ ] Director's Roll vibe consistent throughout (no mixing)
- [ ] **Visual motif from chosen vibe repeats across page** (NOT just in hero)
- [ ] **Spatial rhythm varies** (sections use different `py-*` values, not all `py-24`)
- [ ] No hardcoded hex — only CSS vars / Tailwind utilities from tokens
- [ ] No `h-screen` (use `min-h-[100dvh]`)
- [ ] No `key={index}` in lists

### Phase 5 — Critic subagent (up to 3 iterations)

Launch via Task tool with the prompt from `references/critic-prompt.md`. The critic returns JSON verdict (PASS / PASS+ / FAIL).

Loop:
- Iteration 1 → critic. PASS or PASS+ → done. FAIL → fix critical issues.
- Iteration 2 → critic again. Same.
- Iteration 3 (final) → if still FAIL, present to user with explicit list of remaining issues. Never claim PASS when critic said FAIL.

### Phase 6 — Handoff

Final message:
1. One line: what was built
2. `cd <project> && npm run dev` instruction
3. Critic verdict
4. If FAIL: list remaining issues honestly
5. **Nothing else.** No marketing fluff, no emoji.

## Hard rules

- **Never** generate banned words (see `anti-slop.md` EN+RU lists)
- **Never** add editorial mono labels (anywhere, including footer)
- **Never** invent author/studio names — only use names user explicitly provided
- **Never** create fake stats sections
- **Never** mix vibes — Director's Roll picks ONE
- **Never** rewrite starter components — import and compose
- **Never** preload all recipes — Read them lazily as needed
- **Never** skip Director's Roll → that's how sites end up looking identical
- **Never** ship with <7 motion techniques
- **Never** use uniform spacing across all sections
- **Never** animate layout-triggering properties (width, height, top, left, margin, box-shadow, filter) in runtime animations — only transform + opacity + clip-path
- **Never** put parent-level hover/active state on card grids — use IsolatedAnimatedCard pattern
- **Never** write 200-char className strings — extract into `tv()` variants or CSS utility classes

**Mobile-first animation budget (enforce on every page):**
- Max 1 pinned ScrollTrigger section active at once
- Max 1 R3F canvas visible at once
- Max 3 animated elements per viewport on mobile
- Max 1 backdrop-filter element per viewport
- No continuous blur/filter animation
- No scroll animation on large text blocks on mobile
- Mobile must preserve visual identity — reduce intensity, NOT remove design

**Always:**
- Use `tv()` from `tailwind-variants` for any component with size/color/state variants
- Wrap animated sections in `.motion-island` class for render containment
- Use `.motion-section` (content-visibility: auto) on below-fold sections
- Use `DeviceTierProvider` tier checks before enabling heavy effects
- Use `min-h-[100dvh]`, never `h-screen`
- Use the Emil Kowalski curve `cubic-bezier(0.16, 1, 0.3, 1)` as default
