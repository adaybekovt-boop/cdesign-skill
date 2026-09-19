# Model Adaptation

Scale the workflow to available reasoning, context, review, and visual tools without changing the quality contract.

## Planning

- Keep SKILL.md and the engine documents in context for Generate Mode.
- Load content, traits, Art Direction references, Anti-Slop modules, recipes, and QA references only when their decision becomes active.
- For a short, well-specified page, one candidate may be enough if it still passes novelty and repetition checks.
- For an ambiguous or high-visibility project, compare two or three structurally different genomes before choosing.
- Do not spend context reproducing framework knowledge the model already has. Preserve only project-specific choices and fragile technical invariants.

## Implementation

- Use the starter as neutral infrastructure.
- Inspect existing components before reuse. A component is optional unless the approved genome calls for its behavior.
- Prefer project-specific composition over a large count of prebuilt effects.
- When a technique is unfamiliar or fragile, load its recipe. Do not load the whole recipe directory.
- When a draft genome needs reference challenge, use the library index to select one to three sources. Do not load a full category.

## Critique

If an independent critic or reviewer agent is available, use it after screenshots and deterministic checks. The critic receives:

- original brief and references;
- DESIGN_GENOME and SIGNATURE_DECISION;
- FINGERPRINT;
- viewport screenshots or preview;
- relevant constraints and known skips.

Ask for a verdict against the evidence, not a restatement of rules. The critic should identify visible mismatch, repetition, genericity, accessibility, performance risk, and content fabrication.

If no critic exists, perform the same review inline and record that it was inline. Never depend on a particular model name.

## Conflict handling

When a generated choice conflicts with a hard constraint:

1. preserve the concept;
2. replace the risky mechanism;
3. update the genome and locks;
4. recheck the signature.

Do not collapse a distinctive concept into the starter demo merely because one technique is unavailable.
