# Recipe: Split-Text Reveal

The starter already has `<SplitTextReveal>` in `components/ui/`. Just use it:

```tsx
import { SplitTextReveal } from "@/components/ui/split-text-reveal";

<SplitTextReveal as="h1" stagger={0.02} className="text-6xl font-medium tracking-tighter">
  Your headline here
</SplitTextReveal>
```

## Stagger calibration

No value is a universal quality threshold. Calibrate against unit, word count, language, line breaks, reading order, and the motion character in DESIGN_GENOME.

- Short character sequences can tolerate tighter offsets.
- Long multilingual headlines usually need words or lines, not character cascades.
- Mechanical motion may use discrete or uniform onset.
- Editorial motion may reveal by line or mask rather than visible per-word stepping.
- Reduced motion should render readable text immediately.

## Custom usage (if you need stagger by characters instead of words)

```tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";

useEffect(() => {
  const split = new SplitType(ref.current, { types: "lines,chars" });

  // Wrap each line in overflow:hidden for masked reveal
  split.lines?.forEach((line) => {
    const wrap = document.createElement("span");
    wrap.style.display = "block";
    wrap.style.overflow = "hidden";
    line.parentNode?.insertBefore(wrap, line);
    wrap.appendChild(line);
  });

  gsap.from(split.chars ?? [], {
    yPercent: 110,
    opacity: 0,
    duration: 0.9,
    stagger: 0.018,  // example only; tune to the actual phrase
    ease: "cubic-bezier(0.22, 0.7, 0, 1)",
    delay: 0.15,
  });

  return () => split.revert();
}, []);
```

## Choose the unit

- words: when word rhythm matters and line wrapping is stable;
- characters: only for short identity text where segmentation remains accessible;
- lines: when the composition is editorial and line masks reinforce it;
- no split: when still typography or another motion mechanism carries the concept.

Do not use split text merely because the component exists.
