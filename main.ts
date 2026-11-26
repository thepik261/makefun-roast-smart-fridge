import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One fridge roast, kept as a single sentence.
const fridgeRoast =
  "My smart fridge has a camera, Wi-Fi, and opinions — it caught me eating ice cream at 2 AM and suggested I 'consider yogurt'.";

function complain(message) {
  console.error(`roast-smart-fridge: ${message}`);
  process.exit(1);
}

function checkRoast(sentence) {
  if (sentence.length < 1 || sentence.length > 160) {
    complain("roast must be between 1 and 160 characters long");
  }
  if (sentence.trim().length === 0) {
    complain("roast must not be blank");
  }
  if (sentence.includes("\n") || sentence.includes("\r")) {
    complain("roast must be a single line with no line breaks");
  }
}

function deliverRoast() {
  const targetFolder = process.env.OUTPUT_DIR || "/output";
  checkRoast(fridgeRoast);
  mkdirSync(targetFolder, { recursive: true });
  const destination = join(targetFolder, "entry.txt");
  writeFileSync(destination, fridgeRoast + "\n", { mode: 0o644 });
  // Force the permissions afterwards: the process umask can narrow the
  // mode requested at creation time, so set it explicitly here.
  chmodSync(destination, 0o644);
}

deliverRoast();
