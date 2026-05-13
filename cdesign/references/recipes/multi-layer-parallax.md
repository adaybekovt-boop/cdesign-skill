# Recipe: Multi-Layer Parallax

The starter has `<MultiLayerParallax>` in `components/sections/`. Use it:

```tsx
import { MultiLayerParallax } from "@/components/sections/multi-layer-parallax";
import Image from "next/image";

<MultiLayerParallax
  className="h-[100dvh]"
  layers={[
    {
      content: <div className="bg-gradient-to-b from-elevated to-background h-full" />,
      speed: 0.2, // slowest = background
    },
    {
      content: <Image src="/mid-photo.jpg" alt="" fill className="object-cover opacity-60" />,
      speed: 0.6, // medium = subject backing
    },
    {
      content: (
        <h2 className="absolute bottom-20 left-10 text-7xl font-medium tracking-tighter">
          Headline
        </h2>
      ),
      speed: 1.2, // fastest = foreground
    },
  ]}
/>
```

## Speed values

- `0` = static (no parallax)
- `0.2–0.4` = slow background
- `0.5–0.8` = medium midground
- `1.0–1.5` = foreground (moves faster than scroll for "rushing past" effect)

The component multiplies speed by `-50` internally → negative yPercent → element moves UP as user scrolls DOWN (true parallax).

## Combining with mouse-move parallax

For full X+Y depth, wrap the foreground layer in a Motion `useTransform` from mouse position. See `magnetic-button` source for the pattern.

## Anti-pattern

DO NOT use 5+ layers — diminishing returns and performance suffers. 3 layers (bg/mid/fg) is the sweet spot for cinematic depth.
