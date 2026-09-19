# SLOP_SCORE

Run on the rendered result after visual QA and before handoff. This is a combination detector, not an automatic design judge.

## Tally

| Signal | Score |
| --- | --- |
| any core `HARD BAN` from `INDEX.md` | immediate FAIL |
| `DEFAULT REJECT` without a written project-specific justification | `+2` |
| `WATCHLIST` pattern | `+1` |
| three or more WATCHLIST patterns in one viewport | additional `+2` stack penalty |

Count distinct patterns, not every DOM instance. Three identical cards represent one card-grid pattern.

A written justification must connect the pattern to product, content, supplied reference, brand asset, or interaction. “Premium,” “modern,” “cinematic,” or “looks good” does not neutralize a score. A justified default-reject pattern contributes `0`, but still inspect it in combination and record the reason.

## Verdict

- any `HARD BAN` → **FAIL**;
- `0–2` → scoring gate passes; AI Fingerprint Check still required;
- `3–4` → fix unjustified defaults and rescore before handoff;
- `5+` → redesign at least one structural/material system; do not polish the stack.

The score never overrides art-direction evidence. A weird, specific, accessible experiment may score zero. A polished page may score two and still fail AI fingerprint because it has no project-specific identity.

## Required record

~~~text
SLOP_SCORE: <number> | HARD BAN: <yes/no>
DEFAULT REJECT: <pattern → justification or fix>
WATCHLIST: <patterns>
STACK PENALTY: <0 or +2>
AI FINGERPRINT: <PASS/FAIL>
ACTION: <ship/fix/redesign>
~~~

Store the result in `LAST_QA`; do not add a new permanent metadata format.
