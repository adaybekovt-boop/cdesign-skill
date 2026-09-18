# Recipe: Easing Selection

Choose easing from the physical or interaction logic recorded in MOTION_LOCKS. One curve across an entire site often creates the same generic cadence.

## Useful families

| Character | Example | Good for |
| --- | --- | --- |
| decisive deceleration | cubic-bezier(0.16, 1, 0.3, 1) | entrances, drawers, direct UI response |
| controlled standard | cubic-bezier(0.4, 0, 0.2, 1) | structural state changes |
| soft material | cubic-bezier(0.22, 0.7, 0, 1) | editorial/image movement |
| slight overshoot | cubic-bezier(0.34, 1.35, 0.64, 1) | rare tactile feedback |
| linear | linear | marquees, scrubbed progress, constant mechanical travel |

These are starting points, not mandatory values.

## Selection

- Match duration and curve to distance, mass, trigger, and user expectation.
- Scroll-scrubbed progress is usually linear; the scroll interpolation supplies the feel.
- Functional state changes should settle predictably.
- Overshoot needs a product or material reason and should not affect navigation or form state.
- Related motions may share a curve family, but hierarchy should remain visible through distance, duration, and onset.

## QA

Fail when:

- every animation uses the same duration and curve;
- hover feedback feels slower or louder than the primary motion;
- easing fights scroll input;
- motion suggests weight or elasticity that the visual material does not have;
- reduced motion leaves a delayed or partially hidden state.
