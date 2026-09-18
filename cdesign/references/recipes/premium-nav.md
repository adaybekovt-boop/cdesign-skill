# Recipe: Premium Navigation Patterns

Choose navigation from the genome. The patterns below are mechanics, not a default progression from sticky header to fullscreen menu.

## Fullscreen overlay menu

When user clicks hamburger → full-screen dark overlay with large staggered links.

```tsx
const menuTl = gsap.timeline({ paused: true });

menuTl
  .to(".menu-overlay", { opacity: 1, pointerEvents: "all", duration: 0.4 })
  .from(".menu-item", {
    y: 40, opacity: 0,
    stagger: 0.08, duration: 0.5,
    ease: "power3.out"
  }, "<0.15");

// Open
menuButton.addEventListener("click", () => menuTl.play());
// Close
closeButton.addEventListener("click", () => menuTl.reverse());
```

Tune type, onset, and curve to the project's typography and motion logic. Uppercase and stagger are optional.

## Sticky header — shrink on scroll

```css
.header {
  position: sticky;
  top: 0;
  height: 80px;
  transition: height 0.3s ease, background-color 0.3s ease;
}
.header.scrolled {
  height: 56px;
  background: rgba(10,10,10,0.85);
  backdrop-filter: blur(12px);
}
```

```js
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const current = window.scrollY;
  header.classList.toggle("scrolled", current > 100);
  header.classList.toggle("hidden", current > lastScroll && current > 300);
  lastScroll = current;
}, { passive: true });
```

Threshold: hide after 300px down, reveal on any scroll up.

## Mobile: bottom action bar (optional)

When landing page has one primary CTA, pin it to bottom on mobile:

```css
@media (max-width: 768px) {
  .mobile-cta-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 12px 16px env(safe-area-inset-bottom);
    background: rgba(10,10,10,0.95);
    backdrop-filter: blur(12px);
    z-index: 50;
  }
}
```

## Anti-patterns

❌ Navigation response feels sluggish or blocks access to the destination
❌ backdrop-filter: blur() on header without will-change (janky)
❌ Menu choreography contradicts the motion logic recorded in MOTION_LOCKS
❌ Hamburger without aria-label and aria-expanded
