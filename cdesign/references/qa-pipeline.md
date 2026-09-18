# QA Pipeline

QA evaluates the delivered result against the brief, DESIGN_GENOME, SIGNATURE_DECISION, anti-slop gate, accessibility, and production constraints. It must not force a preferred component, exact easing, stagger, grid, or animation library pattern.

## Gate 0 — Direction fidelity

Review implementation and INTENT together:

- all required genome fields are specific and still true;
- the signature decision is plainly visible;
- the three identity decisions appear in the result;
- the rejected default did not creep back in;
- every major flourish has its recorded reason;
- reference anchors are preserved when supplied;
- final fingerprint describes the actual result.

Failure means fix the implementation or explicitly update the direction. Do not rewrite INTENT to excuse accidental drift.

## Gate 1 — Deterministic project checks

Run the commands the project exposes. For cdesign-starter projects:

~~~bash
npm run lint
npm run typecheck
npm run build
npm run audit:cdesign
~~~

Any non-zero exit is a hard failure. Fix the cause and rerun the affected checks. Record each result separately.

## Gate 2 — Visual and responsive QA

Read visual-qa.md. Capture the required viewports and states with the best available browser or screenshot tool.

Judge:

- composition and hierarchy before effects;
- fidelity to genome and reference anchors;
- signature motif across the page;
- content truth and anti-slop blockers;
- responsive recomposition and mobile identity;
- keyboard/touch usability and readable contrast;
- loading, empty, error, and asset-failure states when applicable;
- obvious jank, overflow, blank canvases, or overlapping fixed UI.

If capture is unavailable, mark visual QA SKIPPED with the exact reason. Do not report PASS.

## Gate 3 — Independent critique

When a critic/reviewer agent is available, give it:

- original brief and supplied references;
- INTENT and FINGERPRINT;
- screenshots for all captured viewports/states;
- relevant implementation files;
- command results and known skips.

Ask for exactly:

- verdict: PASS or FAIL;
- evidence for genome/signature fidelity;
- concrete blockers only;
- suspected repetition against any supplied prior fingerprints;
- fixes ordered by user-visible impact.

Do not bind this gate to a particular model. One capable independent pass is normally enough. A second pass is justified only after material fixes to a failed review or for a genuinely complex cinematic/WebGL build.

If no critic is available, run the same checklist inline and record PASS (inline) or FAIL (inline).

## Gate 4 — Final consistency

Before handoff:

- rerun checks affected by fixes;
- update LAST_QA honestly;
- finalize FINGERPRINT.json from the rendered result;
- verify Edit Mode locks match the delivered site;
- list unresolved blockers without softening them.

## Fallbacks

| Missing resource | Required behavior |
| --- | --- |
| browser or preview | visual = SKIPPED (reason); recommend manual review |
| independent critic | run inline critique and label it inline |
| prior fingerprints | record unavailable; still write the current fingerprint |
| optional heavy asset | use the approved fallback and update genome/locks |

Missing optional tooling does not justify fabricated results or a false PASS.
