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
  "references/anti-slop/INDEX.md",
  "references/anti-slop/composition.md",
  "references/anti-slop/typography.md",
  "references/anti-slop/visual.md",
  "references/anti-slop/motion.md",
  "references/anti-slop/interaction.md",
  "references/anti-slop/content.md",
  "references/anti-slop/responsive.md",
  "references/anti-slop/scoring.md",
  "references/anti-slop/ai-fingerprint.md",
  "references/content-system.md",
  "references/design-traits.md",
  "references/library/README.md",
  "references/library/experimental-interaction/README.md",
  "references/library/experimental-interaction/CATEGORY_SUMMARY.md",
  "references/library/experimental-interaction/PATTERN_INDEX.json",
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
    if ([".git", "node_modules"].includes(name)) continue;
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

const compatibilityEntry = read("references/anti-slop.md");
if (Buffer.byteLength(compatibilityEntry) > 1500) {
  fail("references/anti-slop.md must remain a compact compatibility entry point");
}
if (!compatibilityEntry.includes("anti-slop/INDEX.md")) {
  fail("anti-slop compatibility entry does not route to anti-slop/INDEX.md");
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

const jsonFiles = walk(skillRoot).filter((path) => extname(path) === ".json");
for (const path of jsonFiles) {
  try {
    JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    fail(relative(repoRoot, path) + " is invalid JSON: " + error.message);
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
if (!/Every visual decision must have a reason\b/.test(skill)) {
  fail("skill lost the visual reason gate");
}
if (!skill.includes("keep the genome provisional until the pre-code gates pass") || !skill.includes("lock the approved genome and begin implementation")) {
  fail("DESIGN_GENOME lock must happen after the pre-code gates");
}

const antiSlopIndex = read("references/anti-slop/INDEX.md");
for (const marker of ["HARD BAN", "DEFAULT REJECT", "WATCHLIST", "slop is usually a combination"] ) {
  if (!antiSlopIndex.toLowerCase().includes(marker.toLowerCase())) {
    fail("Anti-Slop index missing severity principle: " + marker);
  }
}
if (!antiSlopIndex.includes("heuristic/internal pattern research")) {
  fail("Anti-Slop index is missing the provenance disclaimer");
}

const scoring = read("references/anti-slop/scoring.md");
for (const marker of ["+2", "+1", "5+", "not an automatic design judge"]) {
  if (!scoring.includes(marker)) fail("SLOP_SCORE missing contract marker: " + marker);
}

const aiFingerprint = read("references/anti-slop/ai-fingerprint.md");
for (const marker of [
  "Which elements or regions look like a typical AI-generated website?",
  "Which three decisions could appear on almost any AI landing page?",
  "Which decorative elements can be removed without losing identity?",
  "What is specific to this product or brand?",
  "Is there a strong signature mechanism?",
]) {
  if (!aiFingerprint.includes(marker)) fail("AI Fingerprint check missing question: " + marker);
}

const antiSlopDir = join(skillRoot, "references", "anti-slop");
const antiSlopFiles = walk(antiSlopDir).filter((path) => extname(path) === ".md");
const ruleOwners = new Map();
for (const path of antiSlopFiles) {
  const content = readFileSync(path, "utf8");
  if (!content.includes("heuristic/internal pattern research") && !path.endsWith("scoring.md") && !path.endsWith("ai-fingerprint.md")) {
    fail(relative(repoRoot, path) + " is missing heuristic provenance");
  }
  for (const match of content.matchAll(/^###\s+([A-Z]+-\d{2})\b/gm)) {
    const owners = ruleOwners.get(match[1]) ?? [];
    owners.push(relative(repoRoot, path));
    ruleOwners.set(match[1], owners);
  }
}
for (const [id, owners] of ruleOwners) {
  if (owners.length > 1) fail("duplicate Anti-Slop rule ID " + id + " in " + owners.join(", "));
}

const responsiveSlop = read("references/anti-slop/responsive.md");
if (!responsiveSlop.includes("44×44 CSS px is a strong default, not an AI-slop classifier")) {
  fail("touch target guidance was not separated from AI-slop HARD BAN severity");
}
const motionSlop = read("references/anti-slop/motion.md");
if (!/## DEFAULT REJECT[\s\S]*### M-01 — Motion hides weak composition/.test(motionSlop)) {
  fail("motion-hides-composition must be a DEFAULT REJECT critique signal");
}
const compositionSlop = read("references/anti-slop/composition.md");
if (/^###\s+C-08\b/m.test(compositionSlop)) {
  fail("motion-hides-composition has duplicate scored IDs in composition and motion modules");
}
const contentSystem = read("references/content-system.md");
if (/^\s*-\s+fake\b/im.test(contentSystem) || /Do not invent numbers, testimonials, or client names/i.test(contentSystem)) {
  fail("content-system duplicates the authoritative Anti-Slop truth gate");
}

const libraryRoot = join(skillRoot, "references", "library", "experimental-interaction");
const siteFiles = [
  "reference.md",
  "design-genome.json",
  "patterns.md",
  "motion.md",
  "responsive.md",
  "source.json",
];
const siteDirs = readdirSync(libraryRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

if (!siteDirs.length) fail("experimental interaction library contains no site references");

for (const site of siteDirs) {
  for (const file of siteFiles) {
    if (!existsSync(join(libraryRoot, site, file))) fail("library reference missing " + site + "/" + file);
  }
}

const allLibraryRoot = join(skillRoot, "references", "library");
const sourceUrls = new Map();
for (const sourcePath of walk(allLibraryRoot).filter((path) => path.endsWith("source.json"))) {
  let source;
  try {
    source = JSON.parse(readFileSync(sourcePath, "utf8"));
  } catch {
    continue;
  }
  for (const key of ["site_url", "github_url"]) {
    if (!source[key]) continue;
    const normalized = source[key].trim().replace(/\/$/, "");
    const owners = sourceUrls.get(normalized) ?? [];
    owners.push(relative(allLibraryRoot, sourcePath) + ":" + key);
    sourceUrls.set(normalized, owners);
  }
}
for (const [url, owners] of sourceUrls) {
  if (owners.length > 1) fail("duplicate source URL " + url + " in " + owners.join(", "));
}

let patternIndex;
try {
  patternIndex = JSON.parse(readFileSync(join(libraryRoot, "PATTERN_INDEX.json"), "utf8"));
} catch {
  patternIndex = null;
}
if (patternIndex) {
  const seenPatterns = new Map();
  for (const [group, patterns] of Object.entries(patternIndex)) {
    if (!Array.isArray(patterns)) {
      fail("PATTERN_INDEX group is not an array: " + group);
      continue;
    }
    for (const pattern of patterns) {
      if (!siteDirs.includes(pattern.source)) fail("PATTERN_INDEX unknown source: " + pattern.source);
      const normalized = String(pattern.idea ?? "").trim().toLowerCase();
      const owners = seenPatterns.get(normalized) ?? [];
      owners.push(group + ":" + pattern.source);
      seenPatterns.set(normalized, owners);
    }
  }
  for (const [idea, owners] of seenPatterns) {
    if (idea && owners.length > 1) fail("duplicate indexed pattern idea in " + owners.join(", "));
  }
}

for (const path of walk(libraryRoot)) {
  if ([".DS_Store", "Thumbs.db"].includes(path.split(/[\\/]/).pop()) || path.includes("__MACOSX")) {
    fail("service junk in reference library: " + relative(repoRoot, path));
  }
}

const libraryReadme = read("references/library/README.md");
const experimentalReadme = read("references/library/experimental-interaction/README.md");
if (!/one to three references/i.test(libraryReadme) || !/Do not load every category/i.test(libraryReadme)) {
  fail("library README does not enforce targeted lazy loading");
}
if (!/Do not recursively read the directory/i.test(experimentalReadme)) {
  fail("experimental library README does not block recursive loading");
}

const oldPathMentions = textFiles
  .filter((path) => readFileSync(path, "utf8").includes("references/director-roll.md"))
  .map((path) => relative(repoRoot, path));
if (oldPathMentions.length) warn("legacy path mentioned in: " + oldPathMentions.join(", "));

console.log("cdesign v3 audit");
console.log("================");
for (const message of failures) console.log("FAIL  " + message);
for (const message of warnings) console.log("WARN  " + message);
if (!failures.length) {
  console.log("PASS  architecture, JSON, links, reference integrity, duplicate sanity, and legacy mandate scan");
}
console.log("\nSummary: " + failures.length + " FAIL, " + warnings.length + " WARN");

process.exit(failures.length ? 1 : 0);
