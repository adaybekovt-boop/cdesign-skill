# Content System

## Core rule

Copy must be specific to the user's industry, object, audience, and actual offer.
Do not fill sections with abstract promises.

## Global bans

- no fake stats
- no fake testimonials
- no fake client logos
- no fake awards
- no fake founder quotes
- no fake team names
- no "trusted by" unless user provided real brands
- no vague AI-marketing words from anti-slop.md
- no invented institutional claims like "ranked #1", "licensed", "certified" unless user provides proof

## Content obligations

Every page must make these answers easy to find. Their order follows the product and user task rather than a fixed landing-page sequence:

1. What is this?
2. Who is it for?
3. What can the user do here?
4. Why does it matter?
5. What is the next action?

---

## Industry modules

### College / school / academy

Use concrete topics:
- admissions
- grants
- programs
- schedule
- student portal
- documents
- contacts
- news
- audiences: parents / students / applicants

Avoid:
- "unlock your future"
- "premium education"
- fake rankings
- fake graduate employment percentages

---

### Fintech / payments / dashboard

Use:
- transactions
- reconciliation
- risk
- reporting
- audit trail
- integrations
- speed
- compliance only if user provides proof

Avoid:
- fake security claims
- fake uptime
- fake client logos
- crypto hype unless asked

---

### Physical product / drink / bottle

Use:
- taste / material / form
- ritual
- packaging
- ingredients only if user provides them
- use case
- sensory detail

Avoid:
- fake health claims
- fake awards
- fake "limited edition" unless user says so

---

### Developer tool / API

Use:
- SDKs
- API calls
- deploy flow
- logs
- latency only if user provides data
- docs
- CLI
- integration steps

Avoid:
- fake benchmarks
- fake GitHub stars
- generic "for developers by developers"

---

### Local / city / Kazakhstan projects

Use:
- city
- routes
- services
- partners
- local context
- documents
- map/network language

Avoid:
- fake government affiliation
- fake official status
- fake national statistics

---

### Luxury / high-ticket service

Use:
- process
- material quality
- discretion
- craft
- consultation
- case-specific language

Avoid:
- shouting "premium"
- too many adjectives
- fake exclusivity

---

## Section copy patterns

### Hero

Must answer what the page is about in one screen.
A vague slogan alone is not enough — pair it with a concrete descriptor.

### Features

Do not write 3 generic cards with marketing verbs.
Each feature must describe a real capability or a real content area.

### Proof

If no proof is provided, use **process proof** instead:
- show workflow
- show documents
- show interface states
- show before/after structure

Do not invent numbers, testimonials, or client names.

### CTA

CTA must match the industry. Examples:

| Industry | CTA copy |
|---|---|
| College | "Посмотреть программы", "Подать документы", "Узнать про гранты" |
| Fintech | "View dashboard flow", "Connect payments" |
| Product | "See the bottle", "Explore the taste" |
| Developer tool | "Read docs", "Install SDK" |

---

## Language

- If the user writes in Russian → write site copy in Russian unless they ask otherwise.
- If the user writes in English → write in English.
- If the project is local Kazakhstan and the user writes Russian → Russian copy is preferred.

---

## Progressive disclosure

Reveal information in the order the actual user task requires. A product demo may lead with interaction; an institution may lead with routes and deadlines; a physical object may lead with material evidence. Do not force every project into hero → features → proof → CTA.

Rules:
- Each section has one dominant job, even when it contains several related facts.
- No section repeats information already established unless repetition supports navigation or comparison.
- Body copy expands what the heading promised.
- If a section can be deleted without losing meaning, action, or rhythm, delete it.
- Record the project-specific section sequence in the fingerprint.

---

## DESIGN_LOCKS (for `.cdesign/INTENT.md`)

Items the model marks as locked once decided. Edit Mode cannot change locks without explicit user request.

Lock only decisions whose silent change would break the approved identity or product logic. Common locks:
- signature decision and motif
- composition relationship that carries the concept
- typography roles and contrast
- palette behavior, not necessarily literal values
- imagery source/treatment
- navigation behavior
- content or section order when the order expresses a real process

Do not lock arbitrary implementation details. Section order may change in Edit Mode when it is not part of the concept and the user request benefits from the change.

Locks live under `## DESIGN_LOCKS` in INTENT.md and are read by Edit Mode at start.
