import puppeteer from "puppeteer";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(ROOT, "temporary screenshots");

const url = process.argv[2] || "http://localhost:3000";
const label = process.argv[3] || "";

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const existing = fs
  .readdirSync(OUT_DIR)
  .map((f) => f.match(/^screenshot-(\d+)/))
  .filter(Boolean)
  .map((m) => parseInt(m[1], 10));
const next = existing.length ? Math.max(...existing) + 1 : 1;
const filename = `screenshot-${next}${label ? "-" + label : ""}.png`;
const outPath = path.join(OUT_DIR, filename);

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: "networkidle0" });

// Force scroll-triggered reveal animations into their final state so the
// full-page screenshot reflects the page as a user would eventually see it,
// rather than depending on flaky headless IntersectionObserver timing.
await page.evaluate(async () => {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in-view"));
  await new Promise((r) => setTimeout(r, 650));
});

await page.screenshot({ path: outPath, fullPage: true });
await browser.close();

console.log(`Saved ${outPath}`);
