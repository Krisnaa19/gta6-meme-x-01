// gta6-meme-x-01 entry program (Node 22, standard library only).
//
// The post on X is the entry: the house reads the post itself (its first
// picture and its text) and hands that to the judge. Nothing this program
// writes about the post is judged, so all it does is hand POST.json from
// this repository to the grader's output directory.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const rawPost = readFileSync(join(botDir, "POST.json"), "utf8");
const post = JSON.parse(rawPost) as { url?: unknown };

if (typeof post.url !== "string" || !post.url.startsWith("https://")) {
  console.error("POST.json does not name an https post URL");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "POST.json"), rawPost);

// Confirm the copy landed byte for byte: the gate reads /output/POST.json,
// so a truncated copy must fail loudly here instead of passing silently.
const copied = readFileSync(join(outDir, "POST.json"), "utf8");
if (copied !== rawPost) {
  console.error("POST.json copy does not match the repository file");
  process.exit(1);
}
