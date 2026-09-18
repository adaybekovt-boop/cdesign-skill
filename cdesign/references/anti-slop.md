# Anti-Slop Gate

Run this after an art direction exists and again on the rendered result. It rejects generic or fabricated output; it does not invent the concept. Any blocker is FAIL until fixed.

## Content blockers

### Fabrication

Never invent:

- metrics, percentages, benchmarks, uptime, rankings, or national statistics;
- testimonials, founders, authors, clients, integrations, partners, awards, or press;
- certifications, licenses, government affiliation, official status, health claims, or limited-edition claims;
- code, transactions, locations, documents, or product ingredients presented as real.

When proof is unavailable, show truthful process, interface states, supplied artifacts, or clearly labeled examples.

### Portfolio cosplay

Delete decorative metadata that pretends to be evidence:

~~~yaml
patterns:
  - "/ 01 — SECTION"
  - "/ CITY, KZ"
  - "CITY · KZ"
  - "EST. 2022"
  - "KIT BY / MADE BY"
  - "SCROLL ↓"
  - "Designed by [invented name]"
~~~

Plain section names, real locations, real dates, and user-provided attribution are allowed when they perform a real content or navigation job.

### Empty marketing language

Reject unsupported abstraction and category clichés, including:

- Unlock, Elevate, Delve, Supercharge, Unleash, Harness, Foster, Revolutionize, Empower, Leverage, Streamline
- Innovative, Robust, Holistic, Synergistic, Cutting-edge, State-of-the-art, Best-in-class, Next-generation, Game-changing, Seamless
- Realm, Tapestry, Symphony, Arsenal, Powerhouse, “chaos into clarity,” “take it to the next level,” “powered by AI”
- Откройте для себя, Погрузитесь в мир, Раскройте потенциал, Доверьтесь профессионалам, Почувствуйте разницу
- премиальный, премиум, эксклюзивный, изысканный, инновационный, революционный
- мир возможностей, путь к успеху, новая эра, “результат превзойдёт ожидания,” “создано с любовью,” “внимание к деталям”

These words are not banned when they are literal, quoted, part of a verified proper name, or necessary technical language. Marketing use without evidence fails.

## Visual blockers

### Generic composition

- centered headline, subhead, CTA, and decorative image stacked as the whole hero;
- three identical feature cards or pricing cards with equal emphasis;
- bento cells whose sizes do not express content priority;
- trusted-by logo strip without supplied real brands;
- floating phone or laptop mockup used as the only anchor;
- every section using the same centered container, split, padding, or density;
- motion used to distract from a weak still composition;
- first viewport without a dominant relationship, intentional empty space, or recognisable anchor;
- an effect-only section with no information or payoff.

Asymmetry is not mandatory. A deliberately symmetric system can pass when the reason and hierarchy are specific.

### Unjustified decoration

Remove stars, trophies, spheres, blobs, confetti, ribbons, particles, fake maps, coordinate labels, plastic objects, grain, glow, or 3D forms that have no connection to the product, content, brand, supplied reference, or interaction.

Every visual decision must have a reason. “It looks good” is not a reason.

### Color and material

- no purple-to-pink CTA gradient used as generic AI styling;
- no saturated neon used as a substitute for hierarchy;
- no pure black/white pair when it causes harsh legibility or OLED problems;
- no glass on dense text, full-page glass wrapper, stacked glass layers, or continuous blur animation;
- no blanket grain, glow, gradient, shadow, or material treatment unless the genome calls for it;
- no single flat shadow presented as material realism.

### Typography

- no default SaaS typography left unchanged;
- no font chosen because the starter already loaded it;
- no fixed “safe” pairing reused across projects;
- no display/body pairing without distinct jobs recorded in DESIGN_GENOME;
- no mono used as decorative pseudo-technical labeling;
- no all-caps control text that harms scanning or language-specific legibility;
- no hero/body scale so weak that hierarchy disappears.

Frequently overused fonts—including Inter, Geist, Roboto, Space Grotesk, Instrument Serif, Syne, Fraunces, Hanken Grotesk, and common system defaults—require a project-specific reason and custom role/spacing. A name alone neither passes nor fails; unexamined default use fails.

## Interaction and motion blockers

- several heavy effects compete in one viewport;
- secondary hover or ambient motion is louder than the primary mechanism;
- all elements share one reveal, duration, stagger, or easing regardless of role;
- hover-only access to necessary content;
- custom cursor or magnetic behavior on coarse pointers;
- animation erases reading order, input stability, or focus visibility;
- reduced-motion mode removes the information or identity instead of translating the behavior;
- mobile retains desktop-cost parallax, pinning, shaders, or canvases without evidence it performs acceptably;
- mobile drops the signature motif and becomes a generic vertical stack.

Exact timing values are not quality gates. Judge rhythm, hierarchy, response, and performance.

## Code and performance blockers

~~~yaml
react:
  - unstable list keys such as key={index}
  - useState for pointer tracking
  - missing loading/error/empty states for async data
  - optimistic updates without rollback
  - raw img when the project uses next/image

animation:
  - continuous width, height, inset, margin, padding, box-shadow, text-shadow, filter, or backdrop-filter animation
  - transition: all
  - permanent will-change across reusable elements
  - parent hover state rerendering an entire card grid
  - large-list layout animation without measured need

scroll_and_3d:
  - competing scroll clocks
  - R3F Canvas without performance adaptation
  - repeated 3D meshes without instancing when count makes it material
  - heavy offscreen scene running without visibility or frame-loop control
  - missing asset provenance or missing mobile/reduced-motion fallback

responsive:
  - raw 100vh where mobile browser chrome breaks the composition
  - horizontal overflow at supported mobile widths
  - controls below practical touch size
  - content hidden merely to make the layout fit
~~~

Use the stack's existing safeguards when they solve the problem, but do not require a specific helper or component when an equivalent tested implementation exists.

## Screenshot test

A reviewer should fail the page immediately when a screenshot shows:

- category-template hero or repeated card rhythm;
- decorative 3D/effects unrelated to the brief;
- weak type hierarchy;
- fake proof or portfolio metadata;
- illegible glass, clipped text, hidden CTA, horizontal scroll;
- reference anchors lost despite a supplied reference;
- signature decision absent from the rendered result;
- mobile identity collapse.

Fix the underlying composition or content. Adding another effect is not a fix.
