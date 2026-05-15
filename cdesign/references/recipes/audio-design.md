# Recipe: Audio Design for Premium Sites

OPTIONAL. Only use when user specifically asks for sound/audio.
When not asked — skip entirely (the “Silence Test”).

## Rule #1: Mute by default — ALWAYS

```tsx
const sound = new Howl({ src: ['/audio/ui-sprite.mp3'], volume: 0 });
// Only unmute after explicit user interaction
```

Browser autoplay policy blocks unmuted audio. Respect it.

## When to add sound

- Scroll landmarks (entering a new major section)
- Hero reveal completion
- CTA click confirmation
- Page/scene transitions
- Interactive 3D object touch

## When NOT to add sound

- Every hover (creates noise wall)
- Every scroll pixel (overwhelming)
- Background music by default (annoying)
- Error states (stressful)

## Volume specs

|Trigger         |Duration  |LUFS      |Description               |
|----------------|----------|----------|--------------------------|
|UI click        |50-150ms  |-18 to -24|Short percussive tap      |
|Hover           |30-80ms   |-24 to -30|Barely perceptible texture|
|Scroll landmark |200-500ms |-16 to -20|Tonal swell or chime      |
|Scene transition|500-1500ms|-14 to -18|Sweeping tone             |
|Ambient bg      |continuous|-20 to -26|Barely audible atmosphere |

## Implementation with Howler.js

```tsx
import { Howl } from "howler";

const uiSprite = new Howl({
  src: ["/audio/ui-sprite.mp3"],
  sprite: {
    click: [0, 150],
    hover: [200, 80],
    transition: [400, 1200],
  },
  volume: 0.4,
});

// On button click
uiSprite.play("click");

// On section enter (via ScrollTrigger)
ScrollTrigger.create({
  trigger: ".section-2",
  start: "top 60%",
  onEnter: () => uiSprite.play("transition"),
  once: true,
});
```

## Mute/unmute UI pattern

Show a visual indicator (animated equalizer icon) that audio exists.
User clicks to unmute. Never auto-unmute.

```tsx
<button
  onClick={() => setMuted(prev => !prev)}
  aria-label={muted ? "Unmute audio" : "Mute audio"}
>
  {muted ? <VolumeXIcon /> : <Volume2Icon />}
</button>
```

## The “Silence Test”

Before adding audio: does the site feel complete without it?
If yes → don’t add continuous audio. Only add micro UI sounds if they improve UX.
If the site feels empty without sound → audio is justified.

## Anti-patterns

❌ Auto-playing background music
❌ Sound on every hover (noise wall)
❌ Bass-heavy UI clicks (muddy on mobile speakers)
❌ No mute button
❌ Hidden audio controls
