# Recipe: Animated Glass Gradient

CSS @property animated gradient behind a frosted glass layer.
Claude Code can implement this 100% without external assets.

## When to use
User mentions: "матовое стекло", "glass эффект", "градиент за стеклом",
"liquid glass background", "frosted glass", "переливание цветов"

## Architecture
[ Animated gradient — background layer, CSS only ]
[ Frosted glass overlay — backdrop-filter blur ]
[ Content — text, buttons on top ]

## Component: GlassGradientBg

Create components/ui/glass-gradient-bg.tsx:

```tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PALETTES = [
  ["#5e6ad2", "#a78bfa", "#6366f1"],
  ["#0ea5e9", "#6366f1", "#8b5cf6"],
  ["#10b981", "#0ea5e9", "#6366f1"],
  ["#f59e0b", "#ef4444", "#ec4899"],
];

interface GlassGradientBgProps {
  children: React.ReactNode;
  className?: string;
  glassIntensity?: "soft" | "strong";
}

export function GlassGradientBg({
  children,
  className,
  glassIntensity = "soft",
}: GlassGradientBgProps) {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bgRef.current) return;
    const el = bgRef.current;
    const ctx = gsap.context(() => {
      PALETTES.forEach((palette, i) => {
        ScrollTrigger.create({
          trigger: document.body,
          start: `${i * 25}% top`,
          end: `${(i + 1) * 25}% top`,
          onEnter: () => gsap.to(el, {
            "--color-1": palette[0],
            "--color-2": palette[1],
            "--color-3": palette[2],
            duration: 1.8,
            ease: "power2.inOut",
          }),
          onEnterBack: () => gsap.to(el, {
            "--color-1": palette[0],
            "--color-2": palette[1],
            "--color-3": palette[2],
            duration: 1.8,
            ease: "power2.inOut",
          }),
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className={cn("relative min-h-[100dvh] overflow-hidden", className)}>
      <div
        ref={bgRef}
        className="gradient-bg absolute inset-0 -z-10"
        aria-hidden
      />
      <div
        className={cn(
          "absolute inset-0 -z-[5]",
          glassIntensity === "soft"
            ? "backdrop-blur-[40px] backdrop-saturate-[1.8]"
            : "backdrop-blur-[60px] backdrop-saturate-[2]"
        )}
        aria-hidden
      />
      {children}
    </div>
  );
}
```

## CSS to add in globals.css

```css
@property --color-1 {
  syntax: "<color>";
  initial-value: #5e6ad2;
  inherits: false;
}
@property --color-2 {
  syntax: "<color>";
  initial-value: #a78bfa;
  inherits: false;
}
@property --color-3 {
  syntax: "<color>";
  initial-value: #6366f1;
  inherits: false;
}

.gradient-bg {
  background: conic-gradient(
    from var(--gradient-angle, 0deg) at 50% 50%,
    var(--color-1),
    var(--color-2),
    var(--color-3),
    var(--color-1)
  );
  animation: gradient-rotate 12s linear infinite;
  filter: blur(60px) saturate(1.4);
  transform: scale(1.2);
}

@keyframes gradient-rotate {
  to { --gradient-angle: 360deg; }
}

@property --gradient-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}
```

## Usage

```tsx
import { GlassGradientBg } from "@/components/ui/glass-gradient-bg";

<GlassGradientBg glassIntensity="soft">
  <Hero />
  <Features />
</GlassGradientBg>
```

## Performance
- CSS @property animation runs on compositor — zero CPU cost
- backdrop-filter is gated by DeviceTierProvider (balanced/low = reduced blur)
- GSAP only fires on scroll zone transitions, not on every scroll event
- No R3F canvas needed — pure CSS + GSAP

## Anti-patterns
❌ Never animate backdrop-filter continuously
❌ Never use on more than one full-page wrapper
❌ Never stack multiple backdrop-filter layers
❌ On data-tier="low" — disable backdrop-filter entirely
