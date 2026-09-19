# AI Fingerprint Check

Run on the rendered result after visual QA and `SLOP_SCORE`, before independent/inline final critique and handoff.

This check detects a generic combination, not the mere presence of popular techniques. Do not automatically delete a familiar pattern that is justified and integrated.

## Mandatory written answers

1. **Which elements or regions look like a typical AI-generated website?** Name visible regions and mechanisms. If none, cite concrete counter-evidence.
2. **Which three decisions could appear on almost any AI landing page?** Name exact arrangements or components, not adjectives.
3. **Which decorative elements can be removed without losing identity?** Remove unnecessary ones or explain the functional reason each remains.
4. **What is specific to this product or brand?** Name the supplied object, workflow, content structure, reference-derived property, or interaction relationship.
5. **Is there a strong signature mechanism?** State the mechanism as element + behavior/transformation + project connection, and verify it is visible beyond one disposable hero flourish.

Invalid answers include “premium design,” “big type,” “asymmetric layout,” “smooth motion,” “custom cursor,” “cinematic scroll,” “serif accent,” “bento,” “glass,” or “shader background” without a project-specific relationship.

## Verdict

**PASS** only when:

- question 4 names identity that would not survive a product-name swap;
- question 5 names a visible mechanism tied to the brief;
- generic decisions from question 2 are absent, justified and isolated, or fixed;
- the core truth gate passes.

**FAIL** when project-specific identity is absent, the signature is a trend rather than a mechanism, or removing decoration leaves a stock landing page. On FAIL, redesign at least one structural decision and rerun visual QA, scoring, and this check.

## Required record

~~~text
AI_FINGERPRINT
looks_ai: <regions/mechanisms>
generic_three: <a>; <b>; <c>
removable: <elements and actions>
project_specific: <evidence>
signature_mechanism: <one concrete sentence>
result: PASS | FAIL
~~~
