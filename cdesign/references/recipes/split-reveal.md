# Recipe: Split-Text Reveal

The starter already has `<SplitTextReveal>` in `components/ui/`. Just use it:

```tsx
import { SplitTextReveal } from "@/components/ui/split-text-reveal";

<SplitTextReveal as="h1" stagger={0.02} className="text-6xl font-medium tracking-tighter">
  Your headline here
</SplitTextReveal>
```

## Stagger calibration (CRITICAL)

| Stagger | Result | Verdict |
|---------|--------|---------|
| 0.025+  | Generic AI feel, too slow | FAIL |
| 0.02    | Vercel/Linear tier | TARGET |
| 0.015   | Aggressive cinema | OK |
| <0.015  | Unreadable mush | FAIL |

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
    stagger: 0.015,  // char-by-char needs tighter stagger than word-by-word
    ease: "cubic-bezier(0.16, 1, 0.3, 1)",
    delay: 0.15,
  });

  return () => split.revert();
}, []);
```

## When to use what

- **Words stagger 0.02** — hero headlines (most common)
- **Chars stagger 0.015** — short impact phrases (logos, tagline, slogan)
- **Lines stagger 0.08** — body paragraphs (rare, only for editorial)
