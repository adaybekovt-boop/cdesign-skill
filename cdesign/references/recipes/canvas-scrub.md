# Recipe: Canvas Frame-by-Frame Scrub

Apple-style scroll-controlled "video" via image sequence on canvas. **Do NOT use `<video>` + `currentTime`** — it lags terribly because video codecs use delta frames.

The starter has `<CanvasScrub>` in `components/three/`.

## Asset preparation (REQUIRED BEFORE USE)

You need a pre-rendered image sequence:
- Format: `.webp` (best) or `.jpg`
- Dimensions: 1920×1080 ideal, 1280×720 minimum for mobile
- Frame count: 60–200 frames (more = smoother, but more bandwidth)
- Filenames: zero-padded numbers, e.g. `frame-0001.webp` → `frame-0150.webp`
- Location: `/public/sequence/`

How to make the sequence:
- From a video: `ffmpeg -i source.mp4 -vf fps=30 frame-%04d.webp`
- From a 3D render: most 3D tools export PNG sequence; convert with `ffmpeg -i frame-%04d.png frame-%04d.webp`

## Usage

```tsx
import { CanvasScrub } from "@/components/three/canvas-scrub";

<CanvasScrub
  frameCount={150}
  pathTemplate="/sequence/frame-%d.webp"
  width={1920}
  height={1080}
  padding={4}
  scrollDistance="+=300%"
/>
```

- `%d` in pathTemplate gets replaced with zero-padded frame number
- `padding` = digit count (4 → `0001`, `0150`)
- `scrollDistance` = how much scroll the scrub takes (300% = 3 viewport heights)

## When to use this vs R3F

| Use case | Pick |
|----------|------|
| Pre-rendered animation, fixed visual | CanvasScrub |
| Need real 3D camera control, lighting changes | R3F |
| Object that user uploaded | R3F + texture/plane |

CanvasScrub wins on: predictable frame quality, no GPU dependency, works on mobile.
R3F wins on: interactivity, dynamic lighting, lower bandwidth (no 150 image files).

## Performance

- Total payload: ~5MB per 150 frames at .webp 1280px
- Preload all frames upfront (the component does this) — otherwise canvas flickers
- Use IntersectionObserver to defer preload if scrub is below the fold
