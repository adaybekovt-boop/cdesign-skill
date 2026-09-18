# Recipe: Project-Specific Shell

Use a custom shell when the DESIGN_GENOME depends on persistent rails, crossings, indexes, or unequal fields. Do not use one shell formula for every site.

## Define relationships first

Answer:

- What is the dominant mass?
- Where does empty space perform a job?
- Which boundary, rail, baseline, or crop repeats?
- What changes between sections and what remains fixed?
- How does the relationship translate on narrow screens?

Then encode named areas or grid tracks that express those answers.

## Named-area example

~~~css
.project-shell {
  display: grid;
  grid-template-columns: var(--outer) var(--index) minmax(0, 1fr) var(--outer);
  grid-template-areas:
    ". index title ."
    ". index media ."
    ". note  body  .";
}
~~~

The track count, ratios, and areas must come from the project. A conventional centered container is valid when the signature lives elsewhere and the content benefits from it.

## Rhythm

Define a project-specific density sequence such as compression → release → interruption → resolution. Avoid uniform spacing, but do not alternate densities mechanically. Content length, image crop, navigation state, and motif recurrence should explain the change.

## Self-check

- Does the still layout communicate hierarchy without motion?
- Can the signature relationship be sketched in a few lines?
- Are repeated alignments intentional?
- Is the reading measure appropriate?
- Does mobile recompose the relationship rather than merely stack it?
- Would deleting an empty rail or boundary weaken the concept? If not, it is decoration.

## Failure patterns

- one generic max-width container used without consideration;
- symmetric split repeated through every section;
- arbitrary 12-column complexity;
- identical section padding and density;
- custom shell that exists only to look unusual;
- desktop grid that becomes an unrelated mobile template.
