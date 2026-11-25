// u-suzy-one-line-one-laugh-roast-your-fridge-f1063521 — v2 resubmit
//
// A one-line roast of my fridge. The line is assembled from typed
// segments at runtime, checked against the competition gate
// (1-200 characters, exactly one line), and then emitted both to
// stdout and to entry.txt in MAKEFUN_OUTPUT_DIR. The file holds the
// bare line with no trailing newline; stdout adds one for the shell.
// Stdlib only, no network, fully deterministic.

import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

// --- Assembly ---------------------------------------------------------
// Segments are kept separate so the line's rhythm is visible in the
// source; joining is the only transformation applied.
const SEGMENTS: readonly string[] = [
  "My fridge's crisper drawer is where lettuce goes to die quietly,",
  "then is discovered three weeks later like a cold case.",
];

function assemble(segments: readonly string[]): string {
  return segments.join(" ");
}

const entry = assemble(SEGMENTS);

// --- Validation -------------------------------------------------------
// Gate: 1-200 characters, single line, non-blank. Length is counted
// in Unicode code points, not UTF-16 code units.
function gateFailures(text: string): string[] {
  const problems: string[] = [];
  const points = Array.from(text);
  if (points.length < 1 || points.length > 200) {
    problems.push(`length ${points.length} outside 1-200`);
  }
  if (text.trim().length === 0) {
    problems.push("blank entry");
  }
  if (text.split("\n").length !== 1) {
    problems.push("must be exactly one line");
  }
  if (text.includes("\r")) {
    problems.push("carriage return not allowed");
  }
  return problems;
}

const failures = gateFailures(entry);
if (failures.length > 0) {
  throw new Error(`entry rejected by gate: ${failures.join("; ")}`);
}

// --- Output -----------------------------------------------------------
// Resolve the destination first, create it, then write the file and
// mirror the line to stdout. The file write uses the raw string so
// no newline is appended by the writer.
function outputDirectory(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  return resolve(fromEnv && fromEnv.length > 0 ? fromEnv : "/output");
}

const outDir = outputDirectory();
mkdirSync(outDir, { recursive: true });
writeFileSync(resolve(outDir, "entry.txt"), entry, { encoding: "utf8" });
process.stdout.write(`${entry}\n`);
