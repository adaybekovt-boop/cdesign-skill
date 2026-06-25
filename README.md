# cdesign

> Cinematic landing page generator for Claude Code. One command, premium output.

cdesign is a Claude Code skill that generates production-grade landing pages tier with Linear / Vercel / Stripe / Awwwards SOTD. It scaffolds a fully-configured Next.js 15 project from [`cdesign-starter`](https://github.com/adaybekovt-boop/cdesign-starter), then composes pre-built motion components into a cohesive cinematic page.

## Install

One command:

```bash
curl -sSL https://raw.githubusercontent.com/adaybekovt-boop/cdesign-skill/main/install.sh | bash
```

That's it. Restart Claude Code (`exit` then `claude`).

## Usage

```bash
/cdesign "a cinematic landing for my AI habit tracker"

/cdesign "lemonade brand, vibe Apple minimalism" ./bottle.png

/cdesign "fintech dashboard" https://linear.app --research

/cdesign "кинематографичный лендинг для GMG лимонада, как видео"
```

The skill will:
1. Parse your brief and reference (image / URL / both / neither)
2. Pick ONE vibe from Director's Roll (10 vibes: Hardcore 3D / Soft Editorial / Brutalist Dev / SVG Logo / Wabi-Sabi / Dark Institutional / Neo-Bank Minimal / Product Theatre / Cartographic System / Monolithic Luxury — selected via a deterministic decision tree)
3. Scaffold the project from the GitHub starter (one `npx` command)
4. Build in 3 passes: structure → tokens → motion
5. Run a layered QA pipeline:
   - **Self-audit** (anti-slop, motion, architecture — inline, no LLM call)
   - **Deterministic gate** (`npm run lint` + `npm run build` — hard block)
   - **Visual screenshot QA** (desktop 1440×900, tablet 1024×768, mobile 390×844 — skipped gracefully if no browser)
   - **Haiku 4.5 mobile/perf gate** (1 LLM call, mandatory, falls back to inline if unavailable)
   - **Optional second QA** (1 LLM call, only on FAIL or heavy cinematic page — max 2 LLM QA calls per page)
6. Generate `.cdesign/INTENT.md` (DESIGN_LOCKS / MOTION_LOCKS / MOBILE_NOTES / LAST_QA)
7. Hand off with a verdict

## What this prevents

- ❌ AI-slop fonts as lazy defaults (Geist, Inter, Roboto, Space Grotesk — allowed only when explicitly requested or paired with distinctive typography)
- ❌ Editorial mono labels (`/ 01 —`, `/ CITY, KZ`, `EST. 2022`)
- ❌ Fabricated stats sections (`1240 / HAPPY CLIENTS`)
- ❌ Fictional author signatures (`— SomeName · City`)
- ❌ Banned AI words EN+RU (Unlock, Elevate, Премиальный, Откройте для себя, etc.)
- ❌ Purple→pink gradients on CTAs
- ❌ Centered hero, symmetric 3-column Lucide grids
- ❌ Identical look across projects (Director's Roll picks a vibe per build)
- ❌ Uniform `py-24` everywhere (spatial rhythm is enforced)
- ❌ Width/height/box-shadow animations (compositor-only contract)
- ❌ Generic AI copy (content-system.md enforces industry-specific language)
- ❌ Random decorative 3D props (stars, trophies, blobs, spheres) unless they come from the product, brand, or supplied reference
- ❌ Mobile downgrade that destroys the art direction instead of only reducing motion/performance cost

## What this generates

- Cinematic landing with 7+ motion techniques
- Lenis smooth scroll bound to GSAP ticker
- Token-driven design system
- Asymmetric, vibe-consistent layouts
- Industry-aware copy via content-system.md
- ScrollFilm master timeline for "feels like a video" intent
- Liquid Glass UI with auto-degradation on weak devices
- Production-ready TypeScript (`npm run dev` works immediately)

## Stack (provided by [cdesign-starter](https://github.com/adaybekovt-boop/cdesign-starter))

- Next.js 15 + React 19 + TypeScript
- Tailwind v4 with full design token system
- Motion (motion/react v11+)
- GSAP 3.13 + ScrollTrigger + SplitText
- Lenis 1.3 bound to GSAP ticker
- React Three Fiber v9 + Drei + Postprocessing
- tailwind-variants for tokenized component variants
- Hanken Grotesk + Migra fonts (NOT Geist — slop marker)

## Skill structure

```
cdesign/
├── SKILL.md                          # Workflow definition
└── references/
    ├── director-roll.md              # 10-vibe matrix + per-vibe layout/forbidden/mobile rules
    ├── anti-slop.md                  # Banned patterns (regex + YAML + screenshot-visible slop)
    ├── content-system.md             # Industry-aware copy + progressive disclosure + DESIGN_LOCKS
    ├── qa-pipeline.md                # Five-gate QA flow (LLM calls capped at 2)
    ├── visual-qa.md                  # Screenshot QA viewports + blockers
    └── recipes/                      # Lazy-loaded technique recipes
        ├── lenis-gsap-sync.md
        ├── split-reveal.md
        ├── pinned-scrub.md
        ├── r3f-photo.md
        ├── multi-layer-parallax.md
        ├── canvas-scrub.md
        ├── scroll-film.md
        ├── liquid-glass.md
        └── easing.md
```

## Manual install (if curl is blocked)

1. Clone or download this repo
2. Copy the `cdesign/` folder to `~/.claude/skills/cdesign/`
3. Restart Claude Code

## Uninstall

```bash
rm -rf ~/.claude/skills/cdesign
```

## Update

Re-run the install command. Existing skill is automatically backed up with a timestamp before being replaced.

## Built by

[@adaybekovt-boop](https://github.com/adaybekovt-boop) in Aktobe, KZ.

## License

MIT
