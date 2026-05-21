# QA Pipeline

Five sequential gates. Each has a PASS/FAIL contract. **LLM QA calls capped at 2 per page.**

```
Gate 0  Self-audit (inline, 0 LLM calls)
Gate 1  Build & Lint (deterministic, 0 LLM calls)
Gate 2  Visual Screenshot QA (local reasoning, 0 LLM calls)
Gate 3  Haiku 4.5 Mobile/Perf Gate (1 LLM call, mandatory)
Gate 4  Optional Second QA (1 LLM call, conditional)
```

## Gate 0 — Self-audit

Run Phase 4 checklist (anti-slop / motion / architecture) yourself. Fix inline.

## Gate 1 — Build & Lint

- `npm run lint` → PASS
- `npm run build` → PASS

Hard block. Cannot advance otherwise.

## Gate 2 — Visual Screenshot QA

Read `references/visual-qa.md`. Capture 9 frames if browser available, inspect inline.

If unavailable: mark `LAST_QA.visual = SKIPPED (no_browser)` and proceed. Final handoff surfaces "Visual QA: skipped — manual review recommended".

## Gate 3 — Haiku 4.5 Mobile/Perf Gate (mandatory)

After Gate 2, launch ONE subagent on Haiku 4.5 (`claude-haiku-4-5-20251001`) to review:

- Mobile composition (390×844 frames, or DOM if no screenshots)
- Performance signals: R3F under PerformanceMonitor, transform/opacity-only animations, no continuous filter
- Spectacle budget on mobile (max 1 heavy effect per viewport)
- Touch targets ≥ 44×44
- Reduced-motion fallbacks present
- Tier-3/4 motion does not compete with Tier-1

Return contract: `PASS` or `FAIL + concrete fix list`. Apply fixes inline.

If Task tool or Haiku model unreachable:
- Run the checklist above inline yourself
- Mark `LAST_QA.mobile = PASS (inline)` in INTENT.md

## Gate 4 — Optional Second QA

Trigger ONLY when:
1. Gate 3 returned FAIL after one fix-and-rerun cycle, OR
2. Page is heavy cinematic (ScrollFilm active OR 2+ R3F sections OR scroll-driven master timeline)

Launch ONE Haiku 4.5 subagent reviewing overall coherence: motion hierarchy, vibe consistency across viewports, composition vs effect balance.

Skip otherwise.

## Hard cap

LLM QA calls per page = **2 maximum** (Gate 3 + optional Gate 4). Never more.

## Fallback matrix

| Missing resource | Behavior |
|---|---|
| Playwright / browser | Gate 2 → SKIPPED, note in LAST_QA |
| Task subagent / Haiku model | Gate 3 → inline checklist, note in LAST_QA |
| Both | Gates 2 + 3 inline, handoff marks "QA: manual review needed" |

Never abort handoff because a QA resource is missing. Degrade and document.
