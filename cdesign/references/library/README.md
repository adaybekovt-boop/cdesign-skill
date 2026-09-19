# Art Direction reference library

This library contains analyzed sites and design evidence for the Art Direction Engine. It is not a preset catalog.

## Categories

| Category | Use | Entry point |
| --- | --- | --- |
| experimental interaction | composition principles, hero mechanics, navigation, motion systems, interaction, responsive transformations, signature motifs | [experimental-interaction/README.md](experimental-interaction/README.md) |
| product 3D / cinematic | provenance-aware product-object and spatial references | `product-3d-cinematic/<site>/` |

## Retrieval contract

1. Draft the project’s `DESIGN_GENOME` from the brief, assets, and user-supplied references first.
2. Open only the category index relevant to a concrete gap or hypothesis.
3. Select one to three references whose individual properties can challenge or refine the draft.
4. Extract properties—never a whole site, named style, palette, font stack, or motion package.
5. Record why each extracted property fits the project and what must not be copied.
6. Prefer a user-supplied reference over this library when they conflict.

Do not load every category or every site on each run. Do not select a site and treat its `design-genome.json` as the project genome.

## Provenance

Each site directory owns its provenance in `source.json`. Preserve those files. Do not invent missing URLs, licenses, measurements, awards, or technical facts. A reference analysis is design research, not permission to copy brand assets or implementation.
