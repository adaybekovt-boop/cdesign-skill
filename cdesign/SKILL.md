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
- `references/recipes/animated-glass-gradient.md` — CSS animated gradient behind frosted glass
- `references/recipes/shader-gradient.md` — GLSL simplex noise gradient (Aurora/Vision Pro aesthetic)
- `references/recipes/velocity-skew.md` — scroll velocity → skew momentum (Stripe pattern)
- `references/recipes/css-scroll-driven.md` — native CSS animation-timeline API (zero JS)
- `references/recipes/shell-layout.md` — shell-first grid with named areas and empty rails
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

### Phase 5 — Self-audit (inline, no subagent)

Do NOT launch a Task subagent. Run this checklist yourself inline now.
Check each file you generated. Fix failures immediately — no iteration loop.

**Anti-slop (any failure = fix before proceeding):**

- [ ] No banned words EN+RU (check references/anti-slop.md lists)
- [ ] No editorial mono labels (/ 01 —, / CITY, KZ, CITY · KZ, EST. 2022, KIT BY, SCROLL ↓)
- [ ] No fabricated stats sections (number + uppercase tracked label patterns)
- [ ] No fictional signatures (— Name · City, Designed by X)
- [ ] No purple→pink gradients on CTAs (from-purple, to-pink, from-violet, to-fuchsia)
- [ ] No centered hero (headline + subhead + CTA all centered)
- [ ] No slop fonts (Geist, Inter, Roboto, Space Grotesk, Instrument Serif)
- [ ] No key={index}, h-screen, <img>, hardcoded hex bg-[#xxxxxx], useState for mousemove

**Motion quality:**

- [ ] 7+ motion techniques present
- [ ] Director's Roll vibe consistent throughout — no mixing
- [ ] Visual motif from chosen vibe repeats in hero + 1 other section minimum
- [ ] Spatial rhythm varies (not all sections same py-* value)
- [ ] One spectacle per viewport: if hero has WebGL/shader → no heavy parallax + particles + magnetic all in same viewport
- [ ] Motion hierarchy respected: UI hover less dramatic than hero animation
- [ ] Temporal discipline: hover 120–220ms / reveals 300–500ms / scene 800–1400ms

**Architecture:**

- [ ] Lenis bound to GSAP ticker (autoRaf: false in lib/lenis.tsx)
- [ ] Stagger 0.015–0.025 on all SplitText/SplitType reveals
- [ ] Default ease cubic-bezier(0.16, 1, 0.3, 1) appears at least once
- [ ] Background tonal (not pure #000000 or #ffffff)
- [ ] PerformanceMonitor wrapping R3F Canvas (if R3F used)
- [ ] Shell-first layout: hero has intentional empty rails, headline under 18ch
- [ ] No layout-triggering property animations (width/height/top/left/box-shadow/filter)

**If all pass:** proceed to Phase 6 with PASS.
**If any fail:** fix inline, then proceed with list of what was fixed.

### Phase 6 — Handoff

Final message:
1. One line: what was built
2. `cd <project> && npm run dev` instruction
3. Critic verdict
4. If FAIL: list remaining issues honestly
5. **Nothing else.** No marketing fluff, no emoji.

## Edit Mode (existing projects only)

Triggered when user asks to modify an already-generated cdesign project.
Signals: "измени", "поправь", "добавь", "переделай", "fix", "change", "update existing".

Steps:

1. Read .cdesign/INTENT.md in project root (if exists) — this tells you the vibe, motif, and design decisions
1. Apply the change as a DELTA — surgical edit, never full rewrite
1. Preserve invariants:
- Core visual metaphor and Director's Roll vibe
- Motion hierarchy (do NOT replace scroll animations with CSS fade-ins)
- Typography system (do NOT change fonts)
- Device tier fallbacks
- All anti-slop rules still apply
1. Do NOT simplify the hero scene
1. Do NOT remove animations unless explicitly asked
1. After change: update .cdesign/INTENT.md if art direction changed

## Hard rules

**Never:**

- Generate banned words (see references/anti-slop.md EN+RU lists)
- Add editorial mono labels (anywhere, including footer)
- Invent author/studio names — only use names user explicitly provided
- Create fake stats sections
- Mix vibes — Director's Roll picks ONE
- Rewrite starter components — import and compose
- Preload all recipes — Read them lazily as needed
- Skip Director's Roll → that's how sites end up looking identical
- Ship with <7 motion techniques
- Animate layout-triggering properties (width/height/top/left/margin/box-shadow/filter)
- Put parent-level hover/active state on card grids — use IsolatedAnimatedCard pattern
- Write 200-char className strings — extract into tv() variants or CSS utility classes

**Mobile-first animation budget (enforce on every page):**

- Max 1 pinned ScrollTrigger section active at once
- Max 1 R3F canvas visible at once
- Max 3 animated elements per viewport on mobile
- Max 1 backdrop-filter element per viewport
- No continuous blur/filter animation on mobile
- Mobile must preserve visual identity — reduce intensity, NOT remove design

**Spectacle budget:**

- One heavy visual effect per viewport — never stack shader + particles + magnetic + parallax in same section
- If hero has WebGL/shader → section cards must be static, no TiltCard glow, no additional particle systems
- Premium sites are extremely controlled. Selective spectacle. Not maximum effects.

**Motion hierarchy (enforce always):**

- Tier 1: Hero motion — the main cinematic statement
- Tier 2: Section transitions — defer to Tier 1
- Tier 3: UI hover (magnetic, card hover) — never louder than Tier 2
- Tier 4: Ambient (grain, slow gradients) — imperceptible background only
- Lower tiers must NEVER compete visually with higher tiers

**Temporal discipline:**

- Micro interactions (hover feedback): 120–220ms
- UI transitions (reveals, modals): 300–500ms
- Scene transitions (section enters, hero): 800–1400ms
- Ambient motion (background gradients, breathing): 3–12s
- Never use 800ms for a hover effect. Never use 120ms for a hero reveal.

**Always:**

- Use tv() from tailwind-variants for components with size/color/state variants
- Wrap animated sections in .motion-island class for render containment
- Use .motion-section (content-visibility: auto) on below-fold sections
- Use DeviceTierProvider tier checks before enabling heavy effects
- Wrap R3F Canvas with drei PerformanceMonitor for auto FPS degradation
- Use InstancedMesh or BatchedMesh for 10+ repeated 3D objects
- Use min-h-[100dvh], never h-screen
- Use Emil Kowalski curve cubic-bezier(0.16, 1, 0.3, 1) as default
- When user mentions "кинематографичный" / "video-like" / "как видео" → activate Phase 2.5 Shot List

**Glass gradient:**

- When user mentions "матовое стекло" / "glass" / "frosted" / "переливание цветов" → use GlassGradientBg (CSS) or ShaderGradientBg (GLSL)
- Read references/recipes/animated-glass-gradient.md or references/recipes/shader-gradient.md first
