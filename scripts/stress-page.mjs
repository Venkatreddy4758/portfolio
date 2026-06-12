import puppeteer from "puppeteer-core";
const URL = (process.argv[2] || "https://venkatreddy4758.github.io/portfolio/") + "?cb=" + Date.now();
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 800 });

let crashed = false;
const logs = [];
page.on("error", (e) => { crashed = true; logs.push(`[PAGE CRASH] ${e.message}`); });
page.on("pageerror", (e) => logs.push(`[pageerror] ${e.message}`));
page.on("console", (m) => { if (m.type() === "error") logs.push(`[console.error] ${m.text()}`); });
page.on("response", (r) => { if (r.status() >= 400) logs.push(`[http ${r.status()}] ${r.url().split("/").pop()}`); });

try {
  await page.goto(URL, { waitUntil: "networkidle2", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 7000)); // opening sequence
  // scroll through the whole page in steps to trigger GSAP/observers
  const h = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 600) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await new Promise((r) => setTimeout(r, 250));
  }
  await new Promise((r) => setTimeout(r, 1500));
  const heap = await page.evaluate(() => (performance).memory ? Math.round(performance.memory.usedJSHeapSize / 1048576) : -1);
  const bodyLen = await page.evaluate(() => document.body.innerText.length);
  logs.push(`[ok] scrollHeight=${h}px heapUsed=${heap}MB bodyText=${bodyLen} crashed=${crashed}`);
} catch (e) {
  logs.push(`[goto/scroll error] ${e.message}`);
}
console.log(logs.join("\n") || "(no errors)");
await browser.close();
