// Unsent: The Micro-Confession Sprint
// Writes one two-part micro-confession to /output/entry.txt:
// a "To:" line naming who it was meant for, and the unsent message
// itself, one line written exactly as typed, with no explanation after it.
//
// The text below is an original confession, written for this entry.
// It is deterministic: the same entry is produced on every run.
// No network, no files read outside this repository.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The confession, in its two parts. The "To:" line names the person it
// was meant for; the message is the line that was typed and never sent.
const ADDRESSEE = "my little sister, who moved overseas last year";
const MESSAGE =
  "i still wash your favourite mug by hand because the dishwasher feels like giving up on you coming home";

// The gate, checked locally before writing: the whole entry must be
// 1-260 UTF-8 characters and not only whitespace, and the message part
// at most 200 characters.
function buildEntry(to: string, message: string): string {
  const entry = `To: ${to}\n${message}`;
  if (entry.length < 1 || entry.length > 260) {
    throw new Error(`entry is ${entry.length} characters, outside 1-260`);
  }
  if (entry.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  if (message.length > 200) {
    throw new Error(`message is ${message.length} characters, over 200`);
  }
  if (message.includes("\n")) {
    throw new Error("message must be a single line");
  }
  return entry;
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), buildEntry(ADDRESSEE, MESSAGE), "utf8");
