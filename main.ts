// One Line, One Laugh: Roast Your Fridge
// A single-line roast of my own fridge, written for make.fun.
// The program writes the exact roast to stdout and to entry.txt
// (the sealed scorer reads entry.txt), with no trailing newline
// in the file. Stdlib only, no network, fully deterministic:
// the same roast comes out on every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The roast: my fridge hums away all night as if it were
// training for a marathon, yet the one thing it never manages
// to keep cold is my appetite for the leftovers sitting inside it.
const ENTRY =
  "My fridge hums all night like it's training for a marathon, yet the only thing it has ever chilled is my will to eat leftovers.";

// The gate allows 1 to 200 characters, counted as characters
// (not UTF-16 code units), so measure with a code-point spread.
const MAX_CHARS = 200;
const charCount = [...ENTRY].length;
if (charCount === 0 || charCount > MAX_CHARS || ENTRY.trim().length === 0) {
  throw new Error(`entry must be 1-${MAX_CHARS} non-blank characters, got ${charCount}`);
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");

// stdout may carry the entry plus a newline.
console.log(ENTRY);
