# Anti-Slop Reference

Compact checklist. Any violation = critic FAIL.

## Banned text patterns (regex-detectable)

```yaml
mono_labels:
  desc: "Awwwards portfolio cosplay clichés"
  patterns:
    - "/\\s*0\\d\\s*[—–-]\\s*[A-ZА-Я]"     # / 01 — SECTION
    - "/\\s*[A-ZА-Я]+,\\s*[A-Z]{2}"         # / AKTOBE, KZ
    - "[A-ZА-Я]+\\s*[·•]\\s*[A-Z]{2}"       # АКТОБЕ · KZ (banned everywhere incl footer)
    - "EST\\.\\s*\\d{4}"                    # EST. 2022
    - "(?i)KIT\\s+BY|MADE\\s+BY|BY\\s+[A-Z][a-z]+\\s+[A-Z]"  # KIT BY name
    - "(?i)<span[^>]*SCROLL\\s*[↓⬇]?"       # SCROLL ↓
  action: "Delete entirely. If section needs a label, use a normal heading."

fabricated_stats:
  desc: "Trust-by-numbers grids with invented metrics"
  signal: "<div> with text-5xl+ number AND sibling with uppercase + tracking-* + small text"
  examples:
    - "1 240 / РАСПИСАННЫХ ВЕЩЕЙ"
    - "38 / ГОРОДОВ ДОСТАВКИ"
    - "500+ / HAPPY CLIENTS"
    - "99% / SATISFACTION"
  action: "Delete the section. Show actual work instead. Exception: real numbers user explicitly provided, written as sentences."

fictional_signatures:
  desc: "Invented author/studio names"
  patterns:
    - "—\\s*[A-ZА-Я][a-zа-я]+\\s*[·•]\\s*[A-ZА-Я][a-zа-я]+"   # — Sagel · Актобе
    - "(?i)(designed|made|crafted|created)\\s+by\\s+[A-Z]"
    - "(?i)(studio|atelier|lab)\\s+[A-Z][a-z]+"
  action: "Delete. Only use names user EXPLICITLY provided in their prompt, only as plain footer text."
```

## Banned words

```yaml
english_verbs:
  [Unlock, Elevate, Delve, Supercharge, Unleash, Catapult, Harness, Foster,
   Revolutionize, Empower, Leverage, Streamline, Transform]
  context: when paired with "your X" or as marketing CTA

english_nouns:
  [Realm, Tapestry, Symphony, Arsenal, Underpinnings, Powerhouse, Landscape]
  context: when used metaphorically

english_adjectives:
  [Innovative, Robust, Holistic, Synergistic, Cutting-edge, State-of-the-art,
   Best-in-class, Next-generation, Game-changing, Seamless]

english_phrases:
  - "In today's fast-paced digital world"
  - "Ever wondered..."
  - "Chaos into clarity"
  - "The elephant in the room"
  - "Seamlessly integrate"
  - "Take it to the next level"
  - "Built with ❤️" / "Made with love"
  - "Powered by AI"
  - "Your one-stop shop"

russian_verbs:
  [Откройте_для_себя, Погрузитесь_в_мир, Раскройте_потенциал,
   Доверьтесь_профессионалам, Почувствуйте_разницу]

russian_nouns:
  [ваша_история, уникальный_характер, особая_атмосфера, мир_возможностей,
   путь_к_успеху, новая_эра]

russian_adjectives:
  [премиальный, премиум, эксклюзивный, изысканный, инновационный,
   революционный]

russian_phrases:
  - "Результат превзойдёт ожидания"
  - "Качество, проверенное временем"
  - "Создано с любовью"
  - "Внимание к деталям"
  - "Индивидуальный подход" (without specifics)
  - "В современном мире..."
  - "Не просто X, а Y" (when Y is empty abstraction)
```

## Banned visual patterns

```yaml
colors:
  - desc: "AI-tech purple→pink gradient on CTAs"
    forbidden_classes: ["from-purple", "to-pink", "from-violet", "to-fuchsia"]
    context: "primary buttons, hero CTAs"
  - desc: "Pure #000000 background"
    exception: "Vercel-mono vibe only"
  - desc: "Pure #ffffff text on dark"
    use_instead: "#f7f8f8 (off-white)"
  - desc: "Saturated neon accents (>80% saturation)"
    use_instead: "muted accent like #5e6ad2 periwinkle"

typography:
  forbidden_fonts:
    desc: "Slop-marked fonts (overused by AI agents in 2025-26)"
    list: [Inter, Roboto, Arial, "Open Sans", Lato, Poppins, Geist, "Space Grotesk", "Instrument Serif", Syne, Fraunces]
    use_instead: ["Hanken Grotesk", "Migra", "Satoshi", "Cabinet Grotesk", "Hanken Grotesk"]
    note: "Starter already uses Hanken Grotesk + Migra. Don't override."
  forbidden:
    - "ALL-CAPS button labels (unless ultra-small + tracked)"
    - "Center-aligned hero (headline + subhead + CTA all centered)"

layout:
  forbidden:
    - "3-column symmetric feature grid with identical Lucide icons"
    - "Bento Grid for narrative content (only OK when cell-size reflects content importance, like Apple)"
    - "Stacked centered hero (headline + subhead + CTA + image, all centered, vertically stacked)"
    - "Generic isometric illustrations (Storyset/unDraw/ManyPixels)"
    - '"Trusted by" logo row with 6 grayscale logos centered'
    - "Floating phone mockup next to centered headline"
    - "Three identical pricing cards with 'Most Popular' middle one"
  shell_violations:
    - "max-w-7xl mx-auto as the only grid structure"
    - "uniform py-24 on all sections (vary rhythm: quiet/medium/dense)"
    - "two sections with same density class back-to-back"
    - "headline wider than 18ch in hero"
    - "no intentional empty rails in hero section"
    - "symmetric 50/50 split for every section"

shadows:
  - desc: "Single-layer flat shadow"
    forbidden_pattern: "box-shadow: 0 \\d+px \\d+px rgba\\(0,\\s*0,\\s*0"
    use_instead: "Multi-layer shadow with hue from environment (starter has --shadow-sm/md/lg/xl tokens)"

effects:
  forbidden:
    - "Glassmorphism on every card (use sparingly, ONE element max)"
    - "Animated rainbow gradient mesh (distracting)"
    - "Spinner for loading states (use slate shimmer skeleton)"
    - "Cursor follower that's larger than 20px"
  glass_misuse:
    forbidden:
      - "backdrop-filter on more than one full-page wrapper"
      - "continuous backdrop-filter animation (animating blur value)"
      - "stacking multiple glass layers"
      - "glass over dense body text blocks"
      - "gradient-bg without blur overlay (naked gradient = cheap)"
```

## Banned code patterns (architectural)

```yaml
react_violations:
  - "key={index}"           # Breaks reconciliation
  - "h-screen"              # Use min-h-[100dvh] instead
  - "useState for mousemove"  # Use useMotionValue
  - "<img>"                 # Use next/image
  - "framer-motion package"  # Use motion/react

compositor_only_violations:
  desc: "Runtime animations may only animate compositor-accelerated properties"
  allowed:
    - transform (translate, rotate, scale)
    - opacity
    - clip-path (rare — hero transitions only, max 2 elements)
    - CSS variables that drive transform/opacity
  forbidden_in_continuous_animations:
    - width
    - height
    - top / left / right / bottom
    - margin / padding
    - box-shadow
    - filter (blur, brightness, etc.)
    - backdrop-filter
    - border-radius (on many elements simultaneously)
    - text-shadow
    - layout animations on lists (layout={true} with motion on large grids)
  rule: "If an expensive effect is required, animate a small overlay layer — NOT the whole section. Max 1–2 such elements at a time."
  will_change_rule: "will-change is TEMPORARY only. Set on interaction start, remove after 350ms. Never permanent. See hooks/use-temporary-will-change.ts"

isolated_animation_rule:
  desc: "Interactive animation state must be local to the smallest component"
  forbidden:
    - parent-level hover/active state for card grids
    - useState tracking which card is hovered at parent level
    - animating ALL cards when ONE card is pressed
    - layout={true} on large lists
  rule: "Use IsolatedAnimatedCard pattern (memo + local state). See components/ui/isolated-animated-card.tsx"

state_violations:
  - desc: "Missing Loading/Error/Empty states"
    rule: "Every async data fetch must have all three"
  - desc: "Optimistic UI without rollback"
    rule: "If you update state before server confirms, you must catch + revert"

styling_violations:
  - desc: "Hardcoded hex in components"
    forbidden_pattern: "(bg|text|border)-\\[#[0-9a-fA-F]{3,8}\\]"
    use_instead: "Tailwind utilities from --color-* tokens"
  - desc: "Magic numbers in spacing"
    use_instead: "Tokens (--space-* / Tailwind spacing scale)"

performance_violations:
  - "R3F Canvas without PerformanceMonitor (use drei PerformanceMonitor for auto FPS degradation)"
  - "10+ repeated 3D objects without InstancedMesh or BatchedMesh"
  - "GSAP velocity effects without quickSetter (use quickSetter not gsap.to in loops)"
  - "transition: all (implicitly animates layout/paint properties — always list specific properties explicitly: transition: transform 0.3s, opacity 0.3s)"
  - "mounting/unmounting heavy R3F sections on scroll (use VisibilityGate component instead)"
```

```yaml
spectacle_budget:
  rule: "One spectacle per viewport. Never stack multiple heavy effects in same viewport."
  forbidden:
    - "particles + shader background + magnetic buttons all in hero simultaneously"
    - "bloom + parallax + stagger + custom cursor all competing at once"
    - "every section having its own independent heavy motion system"
    - "hero with WebGL scene AND heavy card hover AND particle system"
  correct:
    - "Hero with ShaderGradientBg → cards in that section are static"
    - "Editorial section with typography choreography → static background, no WebGL"
    - "Showcase with one 3D object → no extra motion systems in same viewport"
  principle: "Premium sites are extremely controlled. Selective spectacle. Not maximum effects."

motion_hierarchy:
  rule: "Lower motion tiers must NEVER compete with higher tiers"
  tiers:
    tier1: "Hero motion — the main cinematic statement. Everything defers to this."
    tier2: "Section transitions — must not distract from tier1 when active"
    tier3: "UI hover (magnetic buttons, card hover) — subtle, never louder than tier2"
    tier4: "Ambient motion (grain, slow gradients, breathing) — background, imperceptible"
  forbidden:
    - "tier3 UI hover as dramatic as tier1 hero animations"
    - "card hover scale/glow more intense than hero reveal"
    - "multiple tier1-level animations on same page"
    - "every element having same animation intensity"

temporal_discipline:
  rule: "Duration must match motion tier"
  ranges:
    micro: "120–220ms — hover feedback, button press, tooltip"
    ui: "300–500ms — reveals, modals, page element enters"
    scene: "800–1400ms — hero reveals, section transitions, cinematic moments"
    ambient: "3000–12000ms — background gradients, grain, breathing"
  forbidden:
    - "hover effect with 800ms duration (too slow for micro)"
    - "hero reveal with 150ms duration (too fast for scene)"
    - "all animations using same 300ms duration (robotic feel)"

shell_violations:
  - "max-w-7xl mx-auto as the only grid structure"
  - "uniform py-24 on all sections (vary rhythm: quiet/medium/dense)"
  - "two sections with same density class back-to-back"
  - "headline wider than 18ch in hero"
  - "no intentional empty rails in hero section"
  - "symmetric 50/50 split for every section"

performance_violations:
  - "R3F Canvas without PerformanceMonitor (always wrap with drei PerformanceMonitor)"
  - "10+ repeated 3D objects without InstancedMesh or BatchedMesh"
  - "GSAP velocity effects without quickSetter (use quickSetter not gsap.to in loops)"
  - "will-change set permanently on many elements (use useTemporaryWillChange hook)"
  - "transition: all (implicitly animates layout/paint properties — always list specific properties explicitly: transition: transform 0.3s, opacity 0.3s)"
  - "mounting/unmounting heavy R3F sections on scroll (use VisibilityGate component instead)"
```
