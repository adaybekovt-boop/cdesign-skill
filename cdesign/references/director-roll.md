# Director's Roll — Vibe Selector

**MANDATORY**: pick EXACTLY ONE vibe. Mixing is forbidden — it kills uniqueness.

Output to user before building: `Director's Roll: <VIBE_NAME> selected because <one-line reason>.`

---

## VIBE A — Hardcore 3D (ORYZO / Apple / Linear-tech)

**When to pick:**
- Reference shows physical products, hardware, or tech objects
- User mentions "tech", "SaaS", "futuristic", "product launch"
- User uploaded a photo of an object (not a portrait, not abstract art)

**Visual motif** (pick ONE, repeat across page):
- Animated coordinate system / measurement grid overlaying 3D object
- Orbital lines circling the hero element
- HUD-style data readouts in monospace appearing on scroll
- Single accent color glow tracking the cursor across sections

**Stack from starter:**
- Hero: `<PhotoTo3D>` (user photo) OR `<GeometricHero>` (torus knot if no photo)
- One section: `<PinnedScrub>` with R3F visuals
- One section: `<TiltCard>` grid for features
- Required: Bloom + Noise post-processing on all R3F

**Palette:**
- Default: Linear-dark `#08090a` / `#5e6ad2` accent
- Bold variant: pure mono with one neon (Vercel-style)

**Typography:**
- Display: Migra (light weight, large size)
- Body: Hanken Grotesk

**Motion intensity: 8/10** — aggressive, scroll-heavy, 3D everywhere.

---

## VIBE B — Soft Editorial (Aesop / Atelier / luxury portfolio)

**When to pick:**
- Reference is fashion, architecture, food, design portfolio, luxury services
- User mentions "premium", "boutique", "editorial", "lookbook"
- Photos provided are portraits, products in soft lighting, lifestyle shots
- Palette feels warm or muted

**Visual motif** (pick ONE, repeat across page):
- Thin diagonal divider lines between sections (1px, warm gray)
- Oversized italic display words bleeding off the edge
- Hand-numbered section markers (II / III / IV — Roman numerals, never `/ 01`)
- A signature serif drop-cap opening each long-form section

**Stack from starter:**
- Hero: large image + `<SplitTextReveal>` for headline (NO 3D)
- One section: `<RevealImage>` gallery with clip-mask reveals
- One section: `<MultiLayerParallax>` with photography
- Optional: `<FloatingObject>` if user has transparent PNG product

**Palette:**
- Warm editorial: `#fdfbf7` background, `#1a1a1a` text, `#c4441c` terracotta accent
- Soft luxury: `#f1ece2` cream, `#3a3a3a` text, no accent (or muted gold)

**Typography:**
- Display: Migra Italic for headlines (large)
- Body: Hanken Grotesk regular

**Motion intensity: 4/10** — slow, intentional, masked reveals, no aggressive parallax.

**Anti-pattern for this vibe:** no R3F unless absolutely justified, no neon, no purple, no grain at >0.05.

---

## VIBE C — Brutalist / Developer (Vercel / Stripe Docs / Linear changelog)

**When to pick:**
- Reference is dev tools, SaaS, fintech, API products
- User mentions "developer", "dev tool", "documentation", "API"
- Tone is technical, factual

**Visual motif** (pick ONE, repeat across page):
- Animated SVG schematic diagrams between sections (Vercel-style)
- Inline monospace status indicators with subtle cursor blink
- Section numbers as large mono superscripts (`01.` `02.` `03.`)
- Animated terminal output / typewriter for product description

**Stack from starter:**
- Hero: `<SplitTextReveal>` left-aligned, no 3D, no images
- One section: `<SvgPathDraw>` for technical diagrams
- One section: code blocks + monospace
- One section: `<Marquee>` of company logos (no fake clients)

**Palette:**
- Strict mono: `#000` / `#ededed` (Vercel) OR `#fafafa` / `#0a2540` (Stripe-light)
- ONE muted accent: `#635bff` blurple OR `#5e6ad2` periwinkle
- No gradients

**Typography:**
- Headlines: Hanken Grotesk medium, tight tracking
- Body: Hanken Grotesk regular
- Code/data: JetBrains Mono (NOT decorative — only real code)

**Motion intensity: 5/10** — precise, snappy, no spring overshoot.

---

## VIBE D — SVG Logo Showcase (agency / studio / branding)

**When to pick:**
- User uploaded an SVG logo
- User is showcasing a brand identity / agency work
- Reference shows logo-centric design (e.g. Pentagram, Collins)

**Visual motif** (pick ONE, repeat across page):
- The logo's primary shape echoed as section dividers
- Construction grid (faint lines showing logo geometry) as background
- Logo color extracted as cursor follower / hover halo
- Single logo character oversized as section marker

**Stack from starter:**
- Hero: `<SvgLogo3D>` (the user's SVG, extruded, rotating)
- One section: `<SvgPathDraw>` showing logo construction lines
- One section: case study `<RevealImage>` grid
- Optional: `<FloatingObject>` for additional brand assets

**Palette:**
- Take colors directly from the user's logo
- Background: contrast (dark logo → light bg, light logo → dark bg)

**Typography:**
- Display: Migra or whatever matches the logo's character
- Body: Hanken Grotesk

**Motion intensity: 7/10** — logo is the star, everything orbits it.

---

## VIBE E — Wabi-Sabi / Anti-Design (artisan / craft / handmade)

**When to pick:**
- Reference is handmade goods, ceramics, art, craft, artisan products
- User mentions "handmade", "craft", "artisan", "imperfect", "human"
- Tone is anti-corporate, anti-perfectionist
- THIS IS A DEFENSIVE PICK — only when you're sure other vibes feel wrong

**Visual motif** (pick ONE, repeat across page):
- Hand-drawn underlines beneath key phrases (Caveat font, stroke-draw animated)
- Visible paper-texture seams between sections
- Asymmetric photo crops with intentional negative space on different sides
- A single repeating organic shape (ink blot, brush mark) as accent

**Stack from starter:**
- Hero: `<RevealImage>` with imperfect/grainy photo + handwritten-style headline
- One section: asymmetric `<MultiLayerParallax>` (NOT a grid)
- One section: long-form text with intentional ragged margins

**Palette:**
- Earthy: `#f1ece2` paper, `#2a2520` ink, `#8b7355` clay accent
- Off-whites and warm grays only — NO pure black/white

**Typography:**
- Display: Instrument Serif or Migra Italic
- Body: Hanken Grotesk regular
- Optional: a hand-script font for accents (Caveat from Google Fonts, used sparingly)

**Motion intensity: 3/10** — minimal, soft, breathing only. NO scrub. NO 3D.

**Critical:** this vibe is hard to get right. Don't pick it just because Editorial feels boring — Editorial is the safer choice.

---

## Selection logic

```
IF user uploaded SVG logo
  → VIBE D (Logo Showcase)
ELSE IF user uploaded product/portrait photo AND reference is tech/futuristic
  → VIBE A (Hardcore 3D)
ELSE IF reference is dev tool / SaaS / fintech / API
  → VIBE C (Brutalist Developer)
ELSE IF reference is fashion / luxury / portfolio / editorial
  → VIBE B (Soft Editorial)
ELSE IF reference is artisan / handmade / craft AND mood is anti-corporate
  → VIBE E (Wabi-Sabi)
ELSE (uncertain)
  → VIBE B (Soft Editorial) — the safe default
```

After selection, tell the user the vibe by name and a one-line justification.
