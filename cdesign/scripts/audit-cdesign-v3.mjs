#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const scriptPath = fileURLToPath(import.meta.url);
const skillRoot = resolve(scriptDir, "..");
const repoRoot = resolve(skillRoot, "..");
const failures = [];
const warnings = [];

const requiredFiles = [
  "SKILL.md",
  "engine/art-direction.md",
  "engine/design-genome.md",
  "engine/novelty-gate.md",
  "engine/anti-repetition.md",
  "engine/model-adaptation.md",
  "references/anti-slop.md",
  "references/content-system.md",
  "references/design-traits.md",
  "references/recipe-index.md",
  "references/qa-pipeline.md",
  "references/visual-qa.md",
  "templates/INTENT.md",
  "templates/FINGERPRINT.json",
];

function fail(message) {
  failures.push(message);
}

function warn(message) {
  warnings.push(message);
}

function read(path) {
  return readFileSync(join(skillRoot, path), "utf8");
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) walk(path, out);
    else out.push(path);
  }
  return out;
}

for (const path of requiredFiles) {
  if (!existsSync(join(skillRoot, path))) fail("missing required file: " + path);
}

if (existsSync(join(skillRoot, "references/director-roll.md"))) {
  fail("legacy director-roll.md still exists");
}

const skill = read("SKILL.md");
if (Buffer.byteLength(skill) > 14000) {
  fail("SKILL.md is too large for the compact entrypoint contract: " + Buffer.byteLength(skill) + " bytes");
}

const forbidden = [
  /pick EXACTLY ONE vibe/i,
  /Mixing is forbidden/i,
  /claude-haiku/i,
  /Haiku 4\.5/i,
  /at least 2 starter components/i,
  /stagger 0\.015[–-]0\.025 on all/i,
  /default ease .* appears at least once/i,
  /business type first, not the visual/i,
];

const textFiles = walk(repoRoot).filter(
  (path) => path !== scriptPath && [".md", ".mjs"].includes(extname(path)),
);
for (const path of textFiles) {
  const content = readFileSync(path, "utf8");
  for (const pattern of forbidden) {
    if (pattern.test(content)) fail(relative(repoRoot, path) + " contains legacy mandate " + pattern);
  }
}

const requiredIntentSections = [
  "## DESIGN_GENOME",
  "## SIGNATURE_DECISION",
  "## REJECTED_DEFAULT",
  "## FINGERPRINT",
  "## DESIGN_LOCKS",
  "## MOTION_LOCKS",
];
const intent = read("templates/INTENT.md");
for (const section of requiredIntentSections) {
  if (!intent.includes(section)) fail("INTENT template missing " + section);
}

const genomeFields = [
  "composition",
  "typography",
  "geometry",
  "color",
  "material",
  "imagery",
  "motion",
  "interaction",
  "navigation",
  "spatial_rhythm",
  "responsive_behavior",
  "signature_motif",
];
for (const field of genomeFields) {
  if (!intent.includes("- " + field + ":")) fail("INTENT template missing genome field: " + field);
}

const fingerprintKeys = [
  "hero_composition",
  "navigation_pattern",
  "typography_pairing_category",
  "palette_strategy",
  "dominant_geometry",
  "section_rhythm",
  "section_sequence",
  "motion_mechanism",
  "imagery_treatment",
  "signature_motif",
];

let fingerprint;
try {
  fingerprint = JSON.parse(read("templates/FINGERPRINT.json"));
} catch (error) {
  fail("FINGERPRINT template is invalid JSON: " + error.message);
}
if (fingerprint) {
  for (const key of fingerprintKeys) {
    if (!(key in fingerprint)) fail("FINGERPRINT template missing key: " + key);
  }
}

const markdownLink = /\[[^\]]+\]\(([^)]+)\)/g;
for (const path of textFiles.filter((item) => extname(item) === ".md")) {
  const content = readFileSync(path, "utf8");
  let match;
  while ((match = markdownLink.exec(content))) {
    const target = match[1].split("#")[0];
    if (!target || /^[a-z]+:\/\//i.test(target) || target.startsWith("#")) continue;
    const resolved = resolve(dirname(path), target);
    if (!existsSync(resolved)) fail(relative(repoRoot, path) + " has broken link: " + target);
  }
}

if (!read("engine/novelty-gate.md").includes("No implementation begins until the gate passes.")) {
  fail("Novelty Gate does not block implementation on failure");
}
if (!read("engine/anti-repetition.md").includes("change at least three major decisions")) {
  fail("anti-repetition mutation rule is missing");
}
if (!read("references/qa-pipeline.md").includes("independent critic")) {
  fail("QA is missing the independent critic path");
}
if (!read("references/qa-pipeline.md").includes("inline")) {
  fail("QA is missing the inline fallback");
}
if (!read("references/anti-slop.md").includes("Every visual decision must have a reason.")) {
  fail("anti-slop lost the visual reason gate");
}

const oldPathMentions = textFiles
  .filter((path) => readFileSync(path, "utf8").includes("references/director-roll.md"))
  .map((path) => relative(repoRoot, path));
if (oldPathMentions.length) warn("legacy path mentioned in: " + oldPathMentions.join(", "));

console.log("cdesign v3 audit");
console.log("================");
for (const message of failures) console.log("FAIL  " + message);
for (const message of warnings) console.log("WARN  " + message);
if (!failures.length) console.log("PASS  architecture, schemas, links, and legacy mandate scan");
console.log("\nSummary: " + failures.length + " FAIL, " + warnings.length + " WARN");

process.exit(failures.length ? 1 : 0);
