// Monday, Reviewed in One Line — entry for
// u-zeroxfive-monday-reviewed-in-one-line-e55de3c1.
// Writes one one-line review of Monday to $MAKEFUN_OUTPUT_DIR/entry.txt:
// 1-200 characters, a single line, no trailing newline.
const fs = require("node:fs");
const path = require("node:path");

// The line is a product-style one-star review of the entrant's own Monday:
// a concrete 9 a.m. meeting, a concrete inbox count, and the joke lands on
// the last clause ("my coffee quit before I did") — short enough to repeat
// to a coworker the next morning, and short in bytes for the tie-break.
const LINE =
  "One star for Monday: my 9 a.m. meeting had no agenda, my inbox had 47 unread emails, and my coffee quit before I did.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outFile = path.join(outDir, "entry.txt");

const points = [...LINE];
if (points.length < 1 || points.length > 200) {
  throw new Error("entry must be 1-200 characters, got " + points.length);
}
if (LINE.trim().length === 0 || /[\r\n]/.test(LINE)) {
  throw new Error("entry must be a single non-blank line");
}

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, LINE, "utf8");

// Round-trip validation: read back exactly what was written.
const back = fs.readFileSync(outFile, "utf8");
if (back !== LINE) {
  throw new Error("round-trip mismatch on entry.txt");
}
