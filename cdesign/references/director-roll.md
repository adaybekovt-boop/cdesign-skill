# Director's Roll — Concept Development

Use this reference to develop an art direction from the product, not to assign the product to a preset genre.

## Core rule

Choose one coherent concept for this project. A concept is a product-specific relationship between:

- the fact, behavior, material, or tension that makes the product worth showing;
- the composition of the first viewport;
- the primary visual material;
- the way the page reveals further information;
- the role of motion.

Coherence is mandatory. Choosing one of the named directions below is not.

Industry controls truthful content, useful actions, and information architecture. It does not determine palette, typography, layout, or motion by itself.

## Evidence before aesthetics

Before proposing concepts, identify:

1. **Known facts** — supplied by the user or verified from provided material.
2. **Assumptions** — useful working hypotheses that must not be presented as facts.
3. **Available material** — real images, product UI, models, documents, diagrams, copy, or brand assets.
4. **Page task** — what the audience must understand or do.
5. **Reference anchors** — if a reference exists, record its composition, dominant silhouette or object, and typography or motion rhythm.

Do not invent a visual metaphor from an unsupported claim. Do not use a generic object as a substitute for missing product material.

## Develop three concepts

For a creation or explicitly authorized redesign, briefly form three materially different concepts before coding. This is an internal decision step, not a menu that must be shown to the user.

Each candidate defines:

- **Idea** — the product-specific fact or behavior that drives the direction.
- **Hero composition** — the dominant relationship between copy, material, action, and negative space.
- **Material** — what the viewer actually sees: product, interface, photography, documents, type, diagrams, or an intentional abstract field.
- **Page logic** — how later sections develop the idea rather than repeat the hero.
- **Motion role** — interaction explanation, attention direction, artistic impression, or none.
- **Feasibility** — whether the required assets and runtime capabilities exist, including a credible mobile fallback.

Candidates must differ in their underlying idea or information structure, not merely in color, font, or effect intensity.

Examples for a physical product:

- reveal its construction and components;
- stage the process or ritual of using it;
- build the page from the object's material, surface, and macro details.

With a precise user reference, shorten this step. Treat the reference as a chosen direction and compare only plausible interpretations needed to adapt it to the product. Do not force novelty against an explicit art direction.

## Select one concept

Choose the candidate with the strongest combination of:

1. product specificity;
2. usefulness to the page task;
3. strength in a static first viewport;
4. available real material;
5. continuity across sections and mobile;
6. implementation feasibility;
7. difference from recent approved cdesign work, when a project catalog exists.

Use two diagnostic tests:

- **Logo substitution test:** if an unrelated brand could replace the logo and most of the page would still make sense, the concept is too generic.
- **Effect removal test:** if removing motion destroys the hierarchy or meaning, solve the static composition first.

Do not demand novelty from every control. Familiar navigation, buttons, and forms may remain conventional. The authored quality can live in the composition, material, narrative, or motion.

## Record project rules

Write the selected direction into `.cdesign/INTENT.md` as concrete project rules, not only as a genre label.

Record:

- the concept and why it fits the product;
- hero composition and dominant material;
- typography roles, not just font names;
- image or asset treatment;
- section-to-section reveal principle;
- motion purpose and hierarchy;
- mobile continuity;
- fallback when a required asset or capability is unavailable.

Example:

> The product is shown through large crops of verified workshop material. Copy is physically aligned to those crops. Scrolling moves from the whole process to tool-level detail. Mobile preserves the same reveal order with fewer simultaneous layers.

Named directions may be cited as influences, for example `product theatre + cartographic restraint`, but the project rules above are authoritative. Combining compatible techniques is allowed when they serve the same concept; mixing unrelated decoration is not.

## Reference directions — technique library

These are starting points and vocabulary, not mandatory presets. Read only the relevant entries.

### Object / Product Theatre

Useful when a real physical object or licensed model carries the story.

- Materials: real product photography, transparent cutouts, macro details, verified GLB/GLTF.
- Composition: object scale and silhouette lead; copy and actions defer to it.
- Motion: controlled rotation, reveal, or material close-up.
- Avoid: unrelated props, invented models, feature grids disconnected from the object.

### Editorial Material

Useful when photography, text, archives, craft, fashion, architecture, or cultural material carries the story.

- Materials: image crops, documents, texture, long-form type.
- Composition: image/text relationships, rhythm, deliberate cropping, asymmetric or centered layouts when justified.
- Motion: masked reveals, pacing, restrained parallax.
- Avoid: decorative editorial labels, empty slogans, aesthetic texture with no source.

### Technical / Interface-Led

Useful when the product is best understood through real code, UI, data flow, or system behavior.

- Materials: verified interface states, code, logs, diagrams, transactions, schemas.
- Composition: information priority determines panel size and sequence.
- Motion: demonstrate state change, flow, or causality.
- Avoid: fake metrics, fake integrations, uniform dashboard fragments, terminal cosplay.

### Institutional / Documentary

Useful when practical information, documents, place, history, or public service creates trust.

- Materials: real documents, campus or place photography, schedules, maps, archival material.
- Composition: clear navigation and evidence can coexist with expressive imagery or type.
- Motion: supports orientation or a deliberate ceremonial tone.
- Avoid: invented rankings, official status, generic seals, automatic dark styling.

### Spatial / Cartographic

Useful when routes, relationships, geography, logistics, or ecosystems explain the product.

- Materials: verified locations, paths, nodes, network diagrams.
- Composition: spatial relationships drive hierarchy.
- Motion: traces a route, reveals dependencies, or directs attention.
- Avoid: fabricated labels, meaningless coordinates, network decoration without data.

### Brand-Geometry

Useful when supplied identity assets contain a strong shape or construction system.

- Materials: real logo geometry, type system, brand colors, identity applications.
- Composition: derive grids, dividers, crops, or transitions from the identity.
- Motion: path construction, restrained morph, or dimensional treatment.
- Avoid: competing shapes or a generic 3D logo pedestal.

### Atmospheric / Cinematic Field

Useful when a mood or perceptual transition is part of the requested experience and product fit.

- Materials: licensed film, generated or verified imagery, shader fields, light, sound only when requested.
- Composition: one dominant field with readable copy and action.
- Motion: creates an intended artistic impression while preserving usability.
- Avoid: spectacle without a product connection, multiple heavy effects in one viewport, inaccessible motion.

### Human / Process-Led

Useful when making, service, participation, or a sequence of actions is more distinctive than the final artifact.

- Materials: real people, tools, stages, gestures, artifacts, before/after states.
- Composition: sequence and causality organize the page.
- Motion: clarifies progression or adds tactile pacing.
- Avoid: fictional testimonials, staged proof presented as fact, generic lifestyle imagery.

## Asset and effect gates

- A user-supplied reference has authority over generic category expectations.
- A real product or brand model requires recorded provenance and license.
- If the needed 3D asset does not exist, choose an approved photo or 2D treatment; never insert a torus, blob, sphere, trophy, or other placeholder geometry.
- Decorative objects must come from the product, identity, supplied reference, or an explained concept.
- One spectacle per viewport. Select recipes because the concept needs them, never to meet a component quota.
- Artistic motion is valid when it creates the intended impression, provided it does not obstruct reading or action, does not compete with another spectacle, and has a calm reduced-motion alternative.

## Early concept check

Before implementing the full page, render the real first viewport and one following section in a static or minimally animated state.

Check:

- Is the idea visible without the author's explanation?
- Does the next section develop the concept rather than switch to a template?
- Could the page belong to an unrelated product after a logo swap?
- Is hierarchy clear before motion?
- Does mobile preserve the material, sequence, and character?

If this check fails, revise the concept or composition before adding animation.
