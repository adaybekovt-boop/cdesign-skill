# Recipe: Pinned Scroll Scrub

The starter has `<PinnedScrub>` in `components/sections/`. Use it directly:

```tsx
import { PinnedScrub } from "@/components/sections/pinned-scrub";

<PinnedScrub
  steps={[
    {
      title: "First step",
      body: "Description of what happens here.",
      visual: <Image src="/step-1.png" alt="..." width={600} height={600} />,
    },
    {
      title: "Second step",
      body: "...",
      visual: <Image src="/step-2.png" alt="..." width={600} height={600} />,
    },
    {
      title: "Third step",
      body: "...",
      visual: <Image src="/step-3.png" alt="..." width={600} height={600} />,
    },
  ]}
/>
```

## How it works

- Container pins at `top top`, scrolls for 300% of viewport height
- Each step trigger fires at its own scroll position
- On enter → crossfade target visual to opacity 1, others to 0
- Easing: `power2.inOut` on opacity (gentle), duration 0.5s

## Variants

For **video scrub instead of image crossfade** — use `<CanvasScrub>` (see canvas-scrub.md recipe).

For **horizontal scroll** instead of vertical content swap — change container layout from `grid-cols-2` to a horizontal flex with `xPercent` translation. But this is rare and usually overkill.
