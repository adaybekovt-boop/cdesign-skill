# Director's Roll — Vibe Selector

**MANDATORY**: pick EXACTLY ONE vibe. Mixing is forbidden — it kills uniqueness.

Output to user before building: `Director's Roll: <VIBE_NAME> selected because <one-line reason>.`

Global art-direction rule: the chosen vibe must explain every visible decorative object. If a 3D star, trophy, blob, sphere, ribbon, or confetti element is not part of the user's product, logo, supplied reference, or industry metaphor, remove it. A page with fewer justified objects is stronger than a page with random cinematic props.

---

## VIBE A — Hardcore 3D

**For:** tech products, futuristic SaaS, hardware, product photos, object-focused hero scenes.

**Visual motifs:** orbital lines, coordinate grid, HUD readouts, single cursor-following glow.

**Stack from starter:**
- Hero: `<PhotoTo3D>` (user photo) OR `<GeometricHero>` (torus knot if no photo)
- One section: `<PinnedScrub>` with R3F visuals
- One section: `<TiltCard>` grid for features
- Required: Bloom + Noise post-processing on all R3F

**Motion intensity: 8/10** — aggressive, scroll-heavy, 3D everywhere.

**Layout formula:** asymmetric 60/40 hero — 3D object on one side, headline + sparse meta on the other. Alternating section density.
**Allowed components:** PhotoTo3D, GeometricHero, PinnedScrub, TiltCard, MagneticButton, Marquee (real names only).
**Forbidden:** centered 3D with headline above + CTA below, multiple Bloom passes, R3F in every section, neon purple→pink accents.
**Mobile downgrade:** static hero render instead of pinned scrub, Tilt off, R3F FPS cap 30, single accent glow only.

---

## VIBE B — Soft Editorial

**For:** fashion, architecture, luxury service, food, lifestyle photography, portfolio work.

**Visual motifs:** oversized italic words, diagonal dividers, large image crops, serif drop caps.

**Stack from starter:**
- Hero: large image + `<SplitTextReveal>` (NO 3D)
- One section: `<RevealImage>` gallery with clip-mask reveals
- One section: `<MultiLayerParallax>` with photography

**Motion intensity: 4/10** — slow, intentional, masked reveals, no aggressive parallax.

**Layout formula:** large image bleed on one side, oversized italic display word breaking the grid, ragged right column for body.
**Allowed components:** SplitTextReveal, RevealImage, MultiLayerParallax, FloatingObject (transparent PNG only).
**Forbidden:** R3F, neon, grain above 0.05, purple, centered hero, 3-column icon grid.
**Mobile downgrade:** parallax down to 2 layers, image stack vertical, italic display scales to clamp(2rem, 8vw, 3.5rem).

---

## VIBE C — Brutalist Developer

**For:** devtools, APIs, technical products, docs, infrastructure, precise SaaS.

**Visual motifs:** schematic SVG diagrams, terminal snippets, real code fragments, mono status indicators.

**Stack from starter:**
- Hero: `<SplitTextReveal>` left-aligned, no 3D, no images
- One section: `<SvgPathDraw>` for technical diagrams
- One section: code blocks + monospace
- `<Marquee>` only with real names

**Motion intensity: 5/10** — precise, snappy, no spring overshoot.

**Layout formula:** left-aligned hero with sparse meta column on right, code block as a hero element, schematic diagram between sections.
**Allowed components:** SplitTextReveal, SvgPathDraw, Marquee (real integrations only), real `<pre>` code blocks.
**Forbidden:** 3D, gradients, decorative illustrations, fake client logos, spring overshoot, animated rainbow mesh.
**Mobile downgrade:** schematic diagrams collapse to single-column flow, code blocks scroll horizontally inside a contained shell, monospace stays.

---

## VIBE D — SVG Logo Showcase

**For:** SVG logo uploads, brand identity, agency, studio, identity presentation.

**Visual motifs:** logo geometry grid, oversized logo glyphs, logo-derived dividers, path construction.

**Stack from starter:**
- Hero: `<SvgLogo3D>` (user's SVG, extruded, rotating)
- One section: `<SvgPathDraw>` showing logo construction lines
- One section: case study `<RevealImage>` grid

**Motion intensity: 7/10** — logo is the star, everything orbits it.

**Layout formula:** logo centered or slightly offset, oversized — sections derived from logo geometry, palette pulled from logo colors.
**Allowed components:** SvgLogo3D, SvgPathDraw, RevealImage, FloatingObject for additional brand assets.
**Forbidden:** competing 3D objects, decorations unrelated to logo geometry, custom illustrations.
**Mobile downgrade:** disable extrusion rotation, render as 2D SVG with slow path-draw entrance.

---

## VIBE E — Wabi-Sabi / Anti-Design

**For:** handmade, craft, ceramics, artisan, human, anti-corporate products.

**Visual motifs:** paper texture seams, organic marks, imperfect image crops, hand-drawn underline.

**Stack from starter:**
- Hero: `<RevealImage>` with imperfect/grainy photo + handwritten-style headline
- One section: asymmetric `<MultiLayerParallax>` (NOT a grid)
- One section: long-form text with intentional ragged margins

**Motion intensity: 3/10** — minimal, soft, breathing only. NO scrub. NO 3D.

**Layout formula:** intentionally off-grid columns, photo bleeds with negative space on different sides per section, long-form ragged text.
**Allowed components:** RevealImage, MultiLayerParallax (asymmetric), SplitTextReveal with subtle stagger only.
**Forbidden:** R3F, scrub, neon, pure black/white, symmetric grids, sans-serif on every word.
**Mobile downgrade:** parallax to 1 layer, keep grain and paper texture, photos stack with same off-grid energy.

---

## VIBE F — Dark Institutional

**For:** colleges, schools, legal, government, serious local organizations, public-facing institutions.

**Visual motifs:** strict dark shells, document-like panels, campus/city grid, official navigation hierarchy.

**Stack from starter:**
- `<SplitTextReveal>`, `<PinnedScrub>` only if needed, `<SvgPathDraw>`, structured sections.

**Motion intensity: 4/10** — structured, formal, no decorative excess.

**Important:** copy should be practical — admissions, grants, schedules, documents, contacts. Avoid fake prestige language.

**Layout formula:** sharp grid shell, document-style panels, dense nav hierarchy, hero with single strong statement + practical primary CTA.
**Allowed components:** SplitTextReveal, SvgPathDraw, RevealImage for campus/document photos, structured tables.
**Forbidden:** R3F decoration, neon, animated gradients, "premium" language, fake rankings, fake employment %.
**Mobile downgrade:** keep dense nav as collapsible sections, panel grid stacks vertical, no parallax.

---

## VIBE G — Neo-Bank Minimal

**For:** fintech, dashboards, payments, analytics, trading-adjacent tools, B2B money products.

**Visual motifs:** calm data panels, thin graph lines, transaction rows, precise financial UI fragments.

**Stack from starter:**
- `<SplitTextReveal>`, `<PinnedScrub>`, `<Marquee>` only with real integrations, data cards.

**Motion intensity: 5/10** — calm, data-driven, no decorative distractions.

**Important:** no fake numbers, no fake client logos, no fake security claims.

**Layout formula:** hero with one large product UI fragment + concise statement, sections alternate between data panel and narrative copy.
**Allowed components:** SplitTextReveal, PinnedScrub for product flow, Marquee for real integrations, custom data card with token colors.
**Forbidden:** fabricated stats, fake "Trusted by", neon, purple→pink CTAs, 3D, decorative gradients.
**Mobile downgrade:** product fragments shrink to single most-important card, transaction rows scroll horizontally inside a shell, no pinned scrub.

---

## VIBE H — Product Theatre

**For:** one physical product, drink, bottle, device, merch, cosmetic, package, object-centered brand.

**Visual motifs:** single object spotlight, stage lighting, rotating product cutout, macro material details.

**Stack from starter:**
- `<FloatingObject>`, `<PhotoTo3D>` if image exists, `<RevealImage>`, controlled parallax.

**Motion intensity: 6/10** — product is the hero, everything defers to it.

**Important:** the product is the hero. Do not add unrelated bento sections.

**Layout formula:** product dominates ~55% of hero, sparse meta on the side, every section anchored to a product detail (taste, material, ritual).
**Allowed components:** FloatingObject, PhotoTo3D, RevealImage for macro shots, MultiLayerParallax with product crops only.
**Forbidden:** unrelated bento, 3-column "feature" grids, fake health claims, fake awards, "limited edition" without user confirmation.
**Mobile downgrade:** product crop scales to full width, parallax to 2 layers, FloatingObject stays but rotation slows.

---

## VIBE I — Cartographic System

**For:** city, region, Kazakhstan/local projects, logistics, maps, networks, ecosystem/partners.

**Visual motifs:** glowing street-grid lines, nodes, routes, map coordinates, single beacon point.

**Stack from starter:**
- `<SvgPathDraw>`, `<MultiLayerParallax>`, `<GeometricHero>` only as abstract map layer.

**Motion intensity: 5/10** — network-driven, purposeful, no decoration.

**Important:** no real map labels unless user provides real locations.

**Layout formula:** map/network as background motif behind hero, sections introduce nodes one at a time, beacon point marks the primary CTA.
**Allowed components:** SvgPathDraw (path-draw on scroll), MultiLayerParallax (map layers), GeometricHero abstracted as network.
**Forbidden:** real map labels without user data, fake government affiliation, decorative R3F, fake national statistics.
**Mobile downgrade:** map background simplifies to single layer, nodes stack vertical, parallax disabled.

---

## VIBE J — Monolithic Luxury

**For:** premium dark brand, high-ticket services, cinematic black/white identity, serious luxury.

**Visual motifs:** black monolith panels, huge restrained typography, single metallic/gold accent, slow cuts.

**Stack from starter:**
- `<SplitTextReveal>`, `<FrameCut>` max 1–2 times, `<RevealImage>`, minimal ambient gradients.

**Motion intensity: 4/10** — luxury = restraint, not many effects.

**Layout formula:** huge type takes ~70% of hero, single metallic accent (one line, one underline, one tag), generous negative space, slow scene transitions.
**Allowed components:** SplitTextReveal, FrameCut (max 2 per page), RevealImage, ambient gradient.
**Forbidden:** more than one accent color, multiple R3F scenes, shouting "premium" / "exclusive", busy backgrounds, more than 2 FrameCuts.
**Mobile downgrade:** type scales but stays large, FrameCut still allowed once, accent shrinks to single tag.

---

## Decision Tree

Use this tree to select a vibe. It is deterministic — follow top to bottom and stop at the first match.

```
IF user uploaded SVG logo
  → SVG Logo Showcase (D)
ELSE IF user provided one physical product image / bottle / package / device
  → Product Theatre (H)
ELSE IF user asks for college / school / university / academy / legal / government / official organization
  → Dark Institutional (F)
ELSE IF user asks for fintech / payments / bank / dashboard / analytics / trading / money product
  → Neo-Bank Minimal (G)
ELSE IF user asks for city / region / Kazakhstan / local ecosystem / logistics / partners / map-like concept
  → Cartographic System (I)
ELSE IF user asks for developer tool / API / infrastructure / docs / technical SaaS
  → Brutalist Developer (C)
ELSE IF user asks for handmade / craft / artisan / ceramics / human / anti-corporate
  → Wabi-Sabi / Anti-Design (E)
ELSE IF user asks for luxury / high-ticket / premium dark / black-white cinematic
  → Monolithic Luxury (J)
ELSE IF user asks for fashion / architecture / editorial / portfolio / lifestyle
  → Soft Editorial (B)
ELSE IF user asks for futuristic / 3D / immersive / Apple-like tech
  → Hardcore 3D (A)
ELSE
  → Soft Editorial (B) — safe default
```

**Conflict rule:** when two vibes match, choose the one that matches the user's **business type** first, not the visual effect request.

Examples:
- "college with WebGL" → **Dark Institutional (F)**, not Hardcore 3D
- "fintech with 3D" → **Neo-Bank Minimal (G)**, not Hardcore 3D
- "bottle brand with luxury vibe" → **Product Theatre (H)**, not Monolithic Luxury
