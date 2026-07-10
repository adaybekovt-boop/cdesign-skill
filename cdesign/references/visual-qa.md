# Visual QA — Screenshot Audit

Runs in Phase 4.5, AFTER deterministic Build & Lint Gate. If browser/preview unavailable, skip gracefully — never block handoff.

## Required viewports

| Viewport | Width × Height | Purpose |
|---|---|---|
| Desktop wide | 1440 × 900 | Hero composition, motion choreography |
| Tablet | 1024 × 768 | Mid-width layout integrity |
| Mobile | 390 × 844 | Motion budget, touch targets, downgrade |

For each viewport capture 3 frames: scroll 0%, 50%, 100%. Total = 9 frames.

## Capture order (use first available)

1. Playwright MCP (`mcp__playwright__*` tools) — preferred
2. `npx playwright screenshot http://localhost:3000 --viewport-size=1440,900 out.png`
3. Puppeteer/Chromium MCP if exposed
4. Manual fallback: instruct user, mark `LAST_QA.visual = SKIPPED (no_browser)`

Never block handoff because screenshots are unavailable.

## Blockers (any one = FAIL — fix inline, then re-shoot only affected viewport)

- Horizontal scroll on mobile (390px viewport)
- Hero CTA below the fold on desktop (1440×900)
- Centered SaaS hero — headline + subhead + CTA all stacked center, no asymmetry, no anchor object
- First viewport has no intentional anchor object, visual field, or asymmetry; it looks like text placed over decoration
- Decorative 3D stars, trophies, blobs, spheres, confetti, or plastic props appear without a direct product/brand/reference reason
- A 3D hero uses generic geometry even though the brief calls for a product or brand model, or its GLB/GLTF is missing from `public/models/ASSETS.md`
- A GLB/GLTF asset is blank, unlit, missing, or visually indistinguishable on desktop or mobile
- When a reference is supplied, fewer than two matching visual anchors across composition, dominant silhouette, and typography or motion rhythm
- 3+ identical cards in a row (same icon weight, same caption length)
- Empty effect section — heavy motion, no copy, no anchor, no payoff
- Weak type scale — body and headline within 1.5× of each other
- Decorative motion masking poor composition — everything moves, nothing reads as primary
- Glass over body text — paragraph behind backdrop-filter, unreadable
- Pure `#000000` or `#ffffff` page background
- Slop fonts visible (Geist/Inter/Roboto as page-wide defaults)
- Purple→pink CTA gradient
- Stat block with fabricated numbers
- Mobile: parallax/scrub still active (should degrade)
- Mobile: text overflow / clipping
- Mobile: CTA hidden by sticky nav
- Mobile: visual identity disappears (same motif, palette, and hierarchy must remain even if motion is reduced)

## Non-blockers (record but don't fail)

- Stagger off by 0.01–0.02s
- Loading state at scroll 0 (acceptable if <500ms)
- Slight tier-degradation color drift between viewports

## Output

Record in `.cdesign/INTENT.md → LAST_QA`:

```
- Visual: PASS / FAIL / SKIPPED (<reason>)
- Viewports captured: desktop / tablet / mobile
- Blockers found: <list or "none">
- Fixes applied: <list>
```
