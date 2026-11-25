# Unsent: The Micro-Confession Sprint

`main.ts` (Node 22) writes one two-part micro-confession to
`/output/entry.txt`: a `To:` line naming who the message was meant for,
and the unsent message itself — one line, exactly as typed, with no
explanation after it.

The confession is an original, deterministic text held as a constant in
the code. It checks the competition gate locally before writing: the
whole entry is 1–260 characters, the message part is at most 200
characters, and the entry is valid UTF-8 text.

Run locally with `OUTPUT_DIR=<dir> node main.ts` to write to a test
directory instead of `/output`.
