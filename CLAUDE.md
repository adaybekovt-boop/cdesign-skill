# cdesign — Claude Code

## Trigger

When user types `/cdesign` or asks for a landing page → follow cdesign/SKILL.md exactly.

## Edit Mode

When user asks to modify an existing generated project:

- Apply change as DELTA — never rewrite from scratch
- Read .cdesign/INTENT.md in project root first (if exists)
- Preserve: visual metaphor, motion hierarchy, typography, material system, device tier fallbacks
- Do NOT replace scroll animations with CSS fade-ins
- Do NOT simplify hero scene
- Do NOT change fonts

## Key files

- Workflow: cdesign/SKILL.md
- Banned patterns: cdesign/references/anti-slop.md
- Vibes: cdesign/references/director-roll.md
- Techniques: cdesign/references/recipes/*.md (read lazily — only when using that technique)
