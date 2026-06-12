import puppeteer from "puppeteer-core";

const URL = process.argv[2] || "https://venkatreddy4758.github.io/portfolio/";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();

const logs = [];
page.on("console", (m) => logs.push(`[console.${m.type()}] ${m.text()}`));
page.on("pageerror", (e) => logs.push(`[pageerror] ${e.message}`));
page.on("requestfailed", (r) => logs.push(`[reqfailed] ${r.url()} — ${r.failure()?.errorText}`));
page.on("response", (r) => { if (r.status() >= 400) logs.push(`[http ${r.status()}] ${r.url()}`); });

try {
  await page.goto(URL, { waitUntil: "networkidle2", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 2500));
  const bodyLen = await page.evaluate(() => document.body.innerText.length);
  logs.push(`[ok] body text length = ${bodyLen}`);
} catch (e) {
  logs.push(`[goto error] ${e.message}`);
}

console.log(logs.join("\n"));
await browser.close();
