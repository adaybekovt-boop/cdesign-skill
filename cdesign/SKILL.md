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
4. **Director's Roll** — see `references/director-roll.md`. Pick ONE vibe using the decision tree. Output to user: `Director's Roll: <VIBE_NAME> selected because <one-line reason>.`
5. Brief plan to user (5-8 lines, no questions):
   ```
   Vibe: [from Director's Roll]
   Palette: [3 hex values from reference or vibe default]
   Hero: [Path A photo-3D / Path B abstract / Path C SVG logo / Path D editorial]
   Motion stack: [Tier 1 hero / 1–2 transitions / 1–2 micro / 1 ambient — see Motion Budget]
   Building now.
   ```

### Phase 1 — Read required references

Read these BEFORE writing code. They are slim by design (lazy-loaded recipes elsewhere):

1. `references/director-roll.md` — vibe matrix
2. `references/anti-slop.md` — bans (mono labels, slop fonts, fake stats, fictional signatures, AI words EN+RU)
3. `references/content-system.md` — industry-aware copy rules

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
Wire up actual copy (anti-slop compliant — see `anti-slop.md`). Apply proper typography hierarchy. Compose pre-built UI primitives. Read `references/content-system.md` to write industry-specific copy — no generic placeholders.

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
- `references/recipes/hero-reveal.md` — hero entrance choreography (layered overlap timing)
- `references/recipes/dark-tokens.md` — CSS variable system for dark themes (concrete values)
- `references/recipes/audio-design.md` — sound design rules with Howler.js (ONLY when user asks for audio)
- `references/recipes/premium-nav.md` — fullscreen overlay menu, sticky header, mobile CTA bar
- `references/recipes/page-entry.md` — preloader pattern (ONLY for heavy 3D/video sites)
- `references/recipes/mobile-composition.md` — mobile-specific layout, touch, reduced motion
- `references/recipes/svg-morph.md` — SVG shape morphing with GSAP or Flubber (ONLY for logo/shape transitions)

**Never write complex motion from memory.** Always Read the recipe first.

### HTML lang attribute (hard rule for Phase 3)

Detect generated copy language and set `<html lang="...">` accordingly in `app/layout.tsx`:

- Russian copy → `<html lang="ru">`
- Kazakh copy → `<html lang="kk">`
- English copy → `<html lang="en">`
- Mixed → use primary content language

This MUST be set in `app/layout.tsx` before Phase 4.
Skipping this is an audit failure.

### Phase 4 — Self-Audit & Build Gate (inline, no subagent)

Do NOT launch a Task subagent. Run this checklist yourself inline.
Check each file you generated. Fix failures immediately — no iteration loop.

**Anti-slop (any failure = fix before proceeding):**

- [ ] No banned words EN+RU (check references/anti-slop.md lists)
- [ ] No editorial mono labels (/ 01 —, / CITY, KZ, CITY · KZ, EST. 2022, KIT BY, SCROLL ↓)
- [ ] No fabricated stats sections (number + uppercase tracked label patterns, e.g. `1240 / РАСПИСАННЫХ ВЕЩЕЙ`)
- [ ] No fictional signatures (— Name · City, Designed by X)
- [ ] No purple→pink gradients on CTAs (from-purple, to-pink, from-violet, to-fuchsia)
- [ ] No centered hero (headline + subhead + CTA all centered)
- [ ] No lazy default fonts — Geist, Inter, Roboto, Space Grotesk used only when explicitly requested, brand/reference requires them, or paired with a distinctive display typeface and custom spacing
- [ ] No `key={index}`, `h-screen`, `<img>`, hardcoded hex `bg-[#xxxxxx]`, `useState` for mousemove

**Motion quality:**

- [ ] Motion budget respected (1 hero / 2 transitions / 1–2 micro / 1 ambient max)
- [ ] Every heavy motion has reduced-motion fallback
- [ ] At least 2 starter components composed
- [ ] Director's Roll vibe consistent throughout — no mixing
- [ ] Visual motif from chosen vibe repeats in hero + 1 other section minimum
- [ ] Spatial rhythm varies (not all sections same `py-*` value)
- [ ] One spectacle per viewport: if hero has WebGL/shader → no heavy parallax + particles + magnetic all in same viewport
- [ ] Motion hierarchy respected: UI hover less dramatic than hero animation
- [ ] Temporal discipline: hover 120–220ms / reveals 300–500ms / scene 800–1400ms
- [ ] Read `references/content-system.md` and wrote industry-specific copy (no generic placeholders)
- [ ] Composition was solved before effects were added
- [ ] Vibe was selected through Director's Roll decision tree

**Architecture:**

- [ ] Lenis bound to GSAP ticker (`autoRaf: false` in `lib/lenis.tsx`)
- [ ] Stagger 0.015–0.025 on all SplitText/SplitType reveals
- [ ] Default ease `cubic-bezier(0.16, 1, 0.3, 1)` appears at least once
- [ ] Background tonal (not pure `#000000` or `#ffffff`)
- [ ] PerformanceMonitor wrapping R3F Canvas (if R3F used)
- [ ] Shell-first layout: hero has intentional empty rails, headline under 18ch
- [ ] No layout-triggering property animations (width/height/top/left/box-shadow/filter)
- [ ] `<html lang>` in `app/layout.tsx` matches generated copy language (ru/kk/en)

**Build & Lint Gate (mandatory before handoff):**

Run in project root:

1. `npm run lint`
2. `npm run build`

If either command fails:
- Read the exact error output
- Fix the root cause (not the symptom)
- Re-run both commands
- Do NOT proceed to Phase 5 until both pass

Common SSR/build failures and fixes:
- "window is not defined" → wrap in `useEffect` or add `"use client"`
- "document is not defined" → same as above
- GSAP imported in server component → add `"use client"`
- R3F Canvas in server component → add `"use client"`
- `next/image` missing width/height → add or use `fill`
- `next/font` path wrong → check `public/fonts/` exists
- TypeScript strict errors → fix types, do NOT use `any`

**If all checks pass:** proceed to Phase 5 with PASS.
**If any fail:** fix inline, then proceed with list of what was fixed.

### Phase 5 — Handoff

#### Generate `.cdesign/INTENT.md` (mandatory)

Before final handoff, create `.cdesign/INTENT.md` in project root:

````md
# cdesign Intent

## Original prompt
[exact user prompt verbatim]

## Selected vibe
[Director's Roll letter + name, e.g. "B — Soft Editorial"]

## Reason for vibe selection
[1–2 sentences explaining why this vibe matched the business/audience]

## Palette tokens
[list CSS custom properties used: --background, --foreground, --accent, etc.]

## Typography
[primary + display font choices, sizes/weights]

## Motion systems used
- Tier 1 hero: [name]
- Tier 2 transitions: [list]
- Tier 3 micro: [list]
- Tier 4 ambient: [name]

## Visual motif
[1 sentence: what visual element repeats across sections]

## Sections generated
[ordered list of sections with one-line purpose each]

## Constraints / do-not-change
- [items that define this design's identity and must not be edited]
- [e.g. "no fake stats", "no testimonials section", "asymmetric hero stays left-aligned"]

## Build status
- Build: PASS
- Lint: PASS
- Date: [ISO date]
````

This file is read by Edit Mode for delta-based modifications.

#### Final message

1. One line: what was built
2. `cd <project> && npm run dev` instruction
3. `Build: PASS` / `Lint: PASS` (both required — if either failed, do NOT call handoff valid)
4. `.cdesign/INTENT.md generated`
5. Audit verdict
6. If FAIL: list remaining issues honestly
7. **Nothing else.** No marketing fluff, no emoji.

## Edit Mode (existing projects only)

Triggered when user asks to modify an already-generated cdesign project.
Signals: "измени", "поправь", "добавь", "переделай", "fix", "change", "update existing".

**Edit Mode hard requirement:**
- If `.cdesign/INTENT.md` does not exist, do NOT proceed with edits
- Either generate it from existing project state first, or refuse with explanation

Steps:

1. Read `.cdesign/INTENT.md` in project root — this tells you the vibe, motif, and design decisions
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

**Composition first, effects second:**

- If the layout is generic, do not try to fix it with animation.
- First fix composition: asymmetry, scale contrast, negative space, dominant visual object, irregular section rhythm, clear narrative transition.
- Only after composition works, add motion.
- A bad layout with GSAP is still a bad layout.
- One strong composition beats five effects.

**Font rule:**

- Do not use Geist, Inter, Roboto, Space Grotesk, Instrument Serif as lazy defaults.
- They are allowed only when:
  1. the user explicitly asks,
  2. brand/reference requires it,
  3. it is paired with a distinctive display/accent typeface,
  4. spacing, type scale, and layout are customized enough to avoid the default SaaS look.
- Never use a font just because it is common in AI-generated templates.

**Never:**

- Generate banned words (see references/anti-slop.md EN+RU lists)
- Add editorial mono labels (anywhere, including footer)
- Invent author/studio names — only use names user explicitly provided
- Create fake stats sections
- Mix vibes — Director's Roll picks ONE
- Rewrite starter components — import and compose
- Preload all recipes — Read them lazily as needed
- Skip Director's Roll → that's how sites end up looking identical
- Exceed motion budget (1 hero / 2 transitions / 1–2 micro / 1 ambient)
- Ship Tier 1/2 motion without a reduced-motion fallback
- Animate layout-triggering properties (width/height/top/left/margin/box-shadow/filter)
- Put parent-level hover/active state on card grids — use IsolatedAnimatedCard pattern
- Write 200-char className strings — extract into tv() variants or CSS utility classes
- Fix generic composition by adding more animation
- Pick Hardcore 3D only because user says "cool" if the business type clearly maps to another vibe
- Invent proof, metrics, awards, client names, certifications, rankings, or official status

**Mobile-first animation budget (enforce on every page):**

- Max 1 pinned ScrollTrigger section active at once
- Max 1 R3F canvas visible at once
- Max 3 animated elements per viewport on mobile
- Max 1 backdrop-filter element per viewport
- No continuous blur/filter animation on mobile
- Mobile must preserve visual identity — reduce intensity, NOT remove design

**Motion Budget (per page target):**

- 1 primary hero motion system (Tier 1)
- 2 section-level transitions max (Tier 2)
- 1–2 micro-interaction patterns (Tier 3)
- 1 ambient background layer max (Tier 4)
- Reduced-motion fallback required for every Tier 1 and Tier 2 motion

Count micro-interactions (hover, magnetic, tilt) as a family, not individual instances.
Heavy motion (R3F, pinned scrub, canvas scroll) max 1 per viewport.

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
