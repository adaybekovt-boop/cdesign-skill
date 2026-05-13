# Recipe: Photo → 3D Plane

The starter has `<PhotoTo3D>` and `<FloatingObject>` in `components/three/`.

## When to use which

| Component | Input | Effect |
|-----------|-------|--------|
| `<PhotoTo3D>` | Any image (with or without background) | Image as scroll-controlled rotating plane |
| `<FloatingObject>` | PNG with **transparent** background | Object floats in 3D space, follows mouse |
| `<GeometricHero>` | No image needed | Abstract torus knot, scroll-driven rotation |

## Asset prep

For `<FloatingObject>` you NEED transparent background. Quick options:
- **macOS Preview**: right-click → Remove Background (built-in, instant)
- **iOS Photos**: long-press subject → Copy Subject
- **remove.bg**: https://www.remove.bg/ (3 free/day)
- **Adobe Express**: https://www.adobe.com/express/feature/image/remove-background (free unlimited)

Tell the user to do this BEFORE running `/cdesign` — Claude Code doesn't remove backgrounds.

## Usage

```tsx
import { PhotoTo3D } from "@/components/three/photo-to-3d";
import { FloatingObject } from "@/components/three/floating-object";

// Photo with rotation/zoom on scroll, with Bloom + Noise post-FX
<PhotoTo3D photoUrl="/hero-photo.jpg" withPostFX />

// Transparent PNG floating with mouse parallax
<FloatingObject imageUrl="/product-transparent.png" withPostFX />
```

## Performance notes

- R3F adds ~150KB gzip
- Bloom adds ~30KB
- DO NOT use on mobile-first sites without testing — these are heavy
- Disable on `prefers-reduced-motion` if hero is critical

## DO NOT

- Use drei `<ScrollControls>` — conflicts with Lenis (use `motion/react` `useScroll` instead — already done in starter components)
- Instantiate `new THREE.TextureLoader().load()` directly — memory leak. Use `useLoader` from `@react-three/fiber` (starter components already do this)
