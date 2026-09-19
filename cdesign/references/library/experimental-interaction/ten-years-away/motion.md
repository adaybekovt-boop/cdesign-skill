## Entrance
Intro sequence, then the first panel. Not a logo sting plus fade to a landing.

## Scroll-linked behavior
Primary: camera X (or reading axis) mapped to scroll progress. Secondary: shader streak length and audio playbackRate mapped to velocity.

## Section transitions
Panels of the incoming year spawn offset, then ease into the grid. Outgoing year leaves through the gutter.

## Micro-interactions
Clickable hits shrink the halftone trail. Language toggle is instant.

## Hover
Targets announce themselves by changing the trail, not by growing a shadow.

## Cursor behavior
Halftone dots emit behind the pointer and decay. Smaller over UI. This is content, not decoration.

## Pinned sections
The canvas is pinned for the whole reading. DOM chapter chrome can stay.

## Parallax
Inside the camera world only (panel layers). Not DOM parallax on body text.

## Shader / WebGL
R3F / Three fixed canvas. One GLSL plane reads velocity. Spectacle budget: canvas + cursor + audio. Nothing else competes.

## Timing character
Camera = continuous. Chapter align = scene (800–1400ms). Trail decay = micro.

## Reduced-motion
Hard cut between static panel images. Kill shader smear, audio rate modulation, and trail.
