/**
 * Genera los PDF del CV (ATS-friendly, sin cabeceras/pies del navegador) a
 * partir de las páginas /cv-pdf y /en/cv-pdf ya construidas en dist/.
 *
 * Se ejecuta tras `astro build` (ver "build" en package.json). Levanta un
 * servidor estático local sobre dist/, renderiza con Chromium (Playwright) y
 * escribe dist/cv.pdf y dist/cv.en.pdf.
 */
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import sirv from "sirv";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "../dist");
const PORT = 4399;

const targets = [
  { url: "/cv-pdf", out: "cv.pdf" },
  { url: "/en/cv-pdf", out: "cv.en.pdf" },
];

async function main() {
  // Playwright es una dependencia de desarrollo; import dinámico para que el
  // build del sitio no falle si aún no está instalado.
  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch {
    console.warn(
      "\n⚠  Playwright no está instalado. Omitiendo la generación del PDF del CV.\n" +
        "   Ejecuta: npm install && npx playwright install chromium\n",
    );
    return;
  }

  const handler = sirv(distDir, { dev: false, single: false });
  const server = createServer((req, res) => handler(req, res));
  await new Promise((r) => server.listen(PORT, r));

  let browser;
  try {
    browser = await chromium.launch();
    const page = await browser.newPage();

    for (const { url, out } of targets) {
      const full = `http://localhost:${PORT}${url}`;
      await page.goto(full, { waitUntil: "networkidle" });
      await page.pdf({
        path: resolve(distDir, out),
        format: "A4",
        printBackground: true,
        displayHeaderFooter: false, // sin URL ni fecha del navegador
        margin: { top: "0", bottom: "0", left: "0", right: "0" },
      });
      console.log(`✓ PDF generado: dist/${out}`);
    }
  } finally {
    await browser?.close();
    server.close();
  }
}

main().catch((err) => {
  console.error("Error generando el PDF del CV:", err);
  process.exitCode = 1;
});
