#!/usr/bin/env bash
set -euo pipefail

# cdesign skill installer
# Usage:
#   curl -sSL https://raw.githubusercontent.com/adaybekovt-boop/cdesign-skill/main/install.sh | bash

REPO="adaybekovt-boop/cdesign-skill"
BRANCH="main"
SKILL_NAME="cdesign"
SKILLS_DIR="$HOME/.claude/skills"
TARGET="$SKILLS_DIR/$SKILL_NAME"
TMP_DIR="$(mktemp -d)"

# ─── Colors ────────────────────────────────────────────────────
RED=$'\033[0;31m'
GREEN=$'\033[0;32m'
YELLOW=$'\033[0;33m'
BLUE=$'\033[0;34m'
BOLD=$'\033[1m'
RESET=$'\033[0m'

echo ""
echo "${BOLD}${BLUE}cdesign skill installer${RESET}"
echo "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo ""

# ─── Check prerequisites ───────────────────────────────────────
if ! command -v curl &> /dev/null; then
  echo "${RED}✗ curl not found${RESET}"
  echo "  Install curl first: https://curl.se/download.html"
  exit 1
fi

if ! command -v unzip &> /dev/null; then
  echo "${RED}✗ unzip not found${RESET}"
  echo "  On Ubuntu/Debian: sudo apt install unzip"
  echo "  On macOS: already installed"
  echo "  On Windows: use Git Bash or WSL"
  exit 1
fi

# ─── Backup existing skill if present ──────────────────────────
if [[ -d "$TARGET" ]]; then
  BACKUP="$TARGET.backup-$(date +%Y%m%d-%H%M%S)"
  echo "${YELLOW}⚠ Existing skill found at: $TARGET${RESET}"
  echo "  Backing up to: $BACKUP"
  mv "$TARGET" "$BACKUP"
  echo ""
fi

# ─── Download ──────────────────────────────────────────────────
echo "${BLUE}→${RESET} Downloading cdesign skill from $REPO..."
curl -sSL "https://github.com/$REPO/archive/refs/heads/$BRANCH.zip" -o "$TMP_DIR/skill.zip"

if [[ ! -s "$TMP_DIR/skill.zip" ]]; then
  echo "${RED}✗ Download failed${RESET}"
  echo "  Check that https://github.com/$REPO exists and is public"
  exit 1
fi

# ─── Extract ───────────────────────────────────────────────────
echo "${BLUE}→${RESET} Extracting..."
unzip -q "$TMP_DIR/skill.zip" -d "$TMP_DIR/extracted"

# Repo extracts as "cdesign-skill-main" — find the `cdesign` folder inside
EXTRACTED_ROOT="$(find "$TMP_DIR/extracted" -maxdepth 1 -type d -name "cdesign-skill-*" | head -n 1)"
SKILL_SRC="$EXTRACTED_ROOT/cdesign"

if [[ ! -d "$SKILL_SRC" ]]; then
  echo "${RED}✗ Could not find cdesign/ folder in repo${RESET}"
  echo "  Expected at: $SKILL_SRC"
  exit 1
fi

# ─── Install ───────────────────────────────────────────────────
mkdir -p "$SKILLS_DIR"
echo "${BLUE}→${RESET} Installing to $TARGET..."
mv "$SKILL_SRC" "$TARGET"

# ─── Cleanup ───────────────────────────────────────────────────
rm -rf "$TMP_DIR"

# ─── Verify ────────────────────────────────────────────────────
if [[ ! -f "$TARGET/SKILL.md" ]]; then
  echo "${RED}✗ Install verification failed: SKILL.md not found${RESET}"
  exit 1
fi

# ─── Done ──────────────────────────────────────────────────────
echo ""
echo "${GREEN}${BOLD}✓ cdesign skill installed${RESET}"
echo ""
echo "${BOLD}Location:${RESET} $TARGET"
echo ""
echo "${BOLD}Next steps:${RESET}"
echo "  1. Exit your current Claude Code session (type ${YELLOW}exit${RESET})"
echo "  2. Restart with ${YELLOW}claude${RESET}"
echo "  3. Try it:"
echo "     ${BLUE}/cdesign \"a cinematic landing for my startup\"${RESET}"
echo ""
echo "${BOLD}Docs:${RESET} https://github.com/$REPO"
echo ""
