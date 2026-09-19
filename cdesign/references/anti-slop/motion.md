# Motion critique

Load for scroll-linked, pinned, staggered, kinetic, cinematic, continuous, or ambient motion.

Provenance: recurrence and coding-agent-default claims are heuristic/internal pattern research.

## DEFAULT REJECT

### M-01 — Motion hides weak composition

Many independent entrances create temporary hierarchy, but a paused screenshot has no anchor or dominant relationship. This is a critique signal, not an absolute ban: repair the still composition and restore only meaningful motion.

### M-02 — Universal fade-up pack

Most sections reuse opacity + small upward translation + identical trigger, duration, easing, and stagger. One reveal family can pass where sequence matters; it should not become page wallpaper.

### M-03 — Trigger on every section

Every section registers a scrub, pin, or reveal. Static rooms are valuable rest and make authored motion legible.

### M-04 — Split heading default

Several headings are divided into words or characters and revealed the same way. One title sequence can pass when the split encodes language, replacement, or identity.

### M-05 — Unscripted cinematic scroll

Multiple pins, horizontal translations, letterboxed scenes, or long scrub regions appear without named story beats. Write the beat list first; if there is no sequence, remove the film machinery.

### M-06 — Excessive parallax

Type, foreground, midground, and background all move at different rates, including on touch. Use depth only where spatial relationship or product inspection needs it.

### M-07 — Timing monoculture

Hover, navigation, reveal, scene, and ambient motion share one duration/easing family regardless of role. Mechanical sameness can be a deliberate system, but it must be a genome choice.

### M-08 — Fake preloader

A static or light page displays a timed percentage or logo intro unrelated to real asset readiness. A heavy scene may use a loader that tracks actual readiness and offers a fallback.

### M-09 — Decorative loops and progress chrome

Lottie icons, dividers, marquees, count-ups, or a short-page progress bar animate because the component supports it rather than because the content changes meaning.

## WATCHLIST

- smooth scrolling with no shared motion clock;
- once-only chrome fade;
- slow image scale on a static hero;
- underline growth as the only text hover language;
- pin longer than two viewports without navigation;
- one marquee with real sequential or catalog content;
- one staggered list where order matters.

## Delivery boundary

Scroll traps, document-level wheel/touch cancellation, continuous motion that ignores reduced-motion, broken focus/reading order, layout-triggering animation, and offscreen heavy scenes are strict QA failures. They are not converted into heuristic `SLOP_SCORE` points: fix them regardless of the score.

## Critique prompts

1. What single signal drives the primary motion system?
2. Which motion changes meaning rather than merely announcing presence?
3. Does the signature remain visible when motion is paused or reduced?
4. How many independent motion systems compete in each viewport?
