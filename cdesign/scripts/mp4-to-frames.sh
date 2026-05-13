#!/usr/bin/env bash
# mp4-to-frames.sh — convert MP4 to WebP frame sequence for CanvasScrub
# Usage: bash scripts/mp4-to-frames.sh input.mp4 [fps] [width]
# Example: bash scripts/mp4-to-frames.sh hero.mp4 30 1280
# Output: public/sequence/frame-0001.webp ... frame-NNNN.webp

set -euo pipefail

INPUT="${1:-}"
FPS="${2:-30}"
WIDTH="${3:-1280}"
OUT_DIR="public/sequence"

if [[ -z "$INPUT" ]]; then
  echo "Usage: bash scripts/mp4-to-frames.sh input.mp4 [fps] [width]"
  exit 1
fi

if ! command -v ffmpeg &> /dev/null; then
  echo "ffmpeg not found. Install: https://ffmpeg.org/download.html"
  exit 1
fi

mkdir -p "$OUT_DIR"
rm -f "$OUT_DIR"/frame-*.webp

echo "Converting $INPUT → $OUT_DIR/frame-%04d.webp"
echo "FPS: $FPS | Width: ${WIDTH}px"

ffmpeg -i "$INPUT" \
  -vf "fps=$FPS,scale=$WIDTH:-1:flags=lanczos" \
  -c:v libwebp \
  -quality 82 \
  -compression_level 4 \
  "$OUT_DIR/frame-%04d.webp" \
  -hide_banner -loglevel error

COUNT=$(ls "$OUT_DIR"/frame-*.webp 2>/dev/null | wc -l)
echo "Done: $COUNT frames → $OUT_DIR"
echo ""
echo "Use in your component:"
echo "  <CanvasScrub"
echo "    frameCount={$COUNT}"
echo "    pathTemplate=\"/sequence/frame-%d.webp\""
echo "    padding={4}"
echo "    scrollDistance=\"+=300%\""
echo "  />"
