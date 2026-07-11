# Recipe: Real GLB/GLTF hero

Use this recipe when the chosen art direction needs a real product, brand, or supplied 3D object.
It is not a license to add a decorative model.

## Asset gate - complete before coding

Create public/models/ASSETS.md with one row per source asset:

| File | Subject | Source URL | License | Author credit | Optimization |
| --- | --- | --- | --- | --- | --- |
| bottle.glb | Product bottle | user supplied | user owned | n/a | Meshopt + KTX2 |

The model must be one of:

1. User-supplied or user-owned asset.
2. A clearly licensed asset whose license permits the intended commercial use and attribution.
3. A model generated for the user, with the provenance recorded in the manifest.

If none applies, do not invent a 3D object. Select PhotoTo3D, FloatingObject with a real
transparent product cutout, or a 2D composition instead.

## Implementation

Store the optimized model at public/models/<name>.glb, then use the starter component:

```tsx
import { ModelHero } from "@/components/three/model-hero"

<ModelHero modelUrl="/models/bottle.glb" ariaLabel="Glass bottle" scale={1.15}>
  <HeroCopy />
</ModelHero>
```

ModelHero already uses useGLTF, PerformanceMonitor, restrained Bloom/Noise, and one scroll signal.
Do not add a second Canvas, particle system, or magnetic effect in the same viewport.

## Optimization and fallback

- Prefer .glb; it is a single deployable file.
- Preserve perceptible silhouette and material detail, then optimize geometry and textures.
- Keep one R3F Canvas visible at a time. On mobile lower DPR and motion intensity; preserve the
  model and art direction.
- A model that fails to load is a visual QA blocker. Verify it in desktop and mobile screenshots.
- Do not replace a missing model with a torus, blob, trophy, or random primitive. Replace the
  entire hero treatment with its approved 2D fallback and update INTENT.md.
