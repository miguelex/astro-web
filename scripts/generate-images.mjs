// ===========================================================================
//  Genera imágenes del sitio con Playwright (Chromium):
//   1. Captura de pantalla de las webs de proyectos en vivo (p. ej. dpeage.com).
//   2. Portadas de imagen para las entradas del blog (plantilla HTML -> JPG).
//
//  Uso:  node scripts/generate-images.mjs
//  Requiere una vez por equipo:  npx playwright install chromium
// ===========================================================================
import { chromium } from "playwright";
import { mkdirSync, writeFileSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const PROJECTS_DIR = join(ROOT, "public", "images", "projects");
const BLOG_IMG_DIR = join(ROOT, "public", "images", "blog");
const BLOG_SRC_DIR = join(ROOT, "src", "content", "blog", "es");

// --- Proyectos: capturas de la web en vivo (mismo formato que el resto) ------
const projectShots = [
  { url: "https://dpeage.com", out: "dpeage.jpg" },
];

// --- Portadas del blog -------------------------------------------------------
// Gradiente determinista (idéntico a src/lib/blog.ts -> coverGradient).
function coverGradient(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 360;
  const h2 = (h + 48) % 360;
  return `linear-gradient(135deg, hsl(${h} 70% 52%), hsl(${h2} 72% 46%))`;
}

// Lee título y primer tag del frontmatter de cada post.
function readPosts() {
  return readdirSync(BLOG_SRC_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map((file) => {
      const raw = readFileSync(join(BLOG_SRC_DIR, file), "utf8");
      const fm = raw.split(/^---$/m)[1] ?? "";
      const title = (fm.match(/title:\s*"([^"]+)"/) || [])[1] ?? file;
      const tag = (fm.match(/tags:\s*\[\s*"([^"]+)"/) || [])[1] ?? "";
      const slug = file.replace(/\.mdx?$/, "");
      return { slug, title, tag };
    });
}

function coverHtml({ title, tag, slug }) {
  return `<!doctype html><html><head><meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@1,9..144,300;1,9..144,500&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet">
  <style>
    *{margin:0;box-sizing:border-box}
    html,body{width:1200px;height:600px}
    .card{position:relative;width:1200px;height:600px;overflow:hidden;
      background:${coverGradient(slug)};color:#fff;
      font-family:'Fraunces',Georgia,serif;display:flex;flex-direction:column;justify-content:flex-end;padding:72px}
    .dots{position:absolute;inset:0;opacity:.25;
      background-image:radial-gradient(rgba(255,255,255,.6) 1.5px,transparent 1.5px);
      background-size:26px 26px;
      -webkit-mask-image:linear-gradient(135deg,#000,transparent 75%)}
    .glyph{position:absolute;right:48px;bottom:8px;
      font-family:'JetBrains Mono',monospace;font-weight:600;
      font-size:300px;line-height:1;color:rgba(255,255,255,.12)}
    .tag{position:absolute;left:72px;top:72px;
      font-family:'JetBrains Mono',monospace;font-weight:600;font-size:22px;
      letter-spacing:.02em;padding:8px 16px;border-radius:10px;
      background:rgba(0,0,0,.28);backdrop-filter:blur(4px)}
    h1{position:relative;font-style:italic;font-weight:500;
      font-size:74px;line-height:1.05;letter-spacing:-.02em;
      max-width:980px;text-shadow:0 2px 24px rgba(0,0,0,.25)}
    .by{position:relative;margin-top:28px;
      font-family:'JetBrains Mono',monospace;font-weight:500;font-size:22px;
      opacity:.9}
  </style></head>
  <body><div class="card">
    <div class="dots"></div>
    <div class="glyph">&lt;/&gt;</div>
    ${tag ? `<div class="tag">#${tag}</div>` : ""}
    <h1>${title.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</h1>
    <div class="by">miguedelgado.dev/blog</div>
  </div></body></html>`;
}

async function run() {
  mkdirSync(PROJECTS_DIR, { recursive: true });
  mkdirSync(BLOG_IMG_DIR, { recursive: true });

  const browser = await chromium.launch();

  // 1) Capturas de proyectos
  for (const { url, out } of projectShots) {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    });
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
      await page.waitForTimeout(1500);
      const buf = await page.screenshot({ type: "jpeg", quality: 82 });
      writeFileSync(join(PROJECTS_DIR, out), buf);
      console.log(`✓ proyecto  ${out}  (${url})`);
    } catch (e) {
      console.error(`✗ proyecto  ${out}  (${url}):`, e.message);
    } finally {
      await page.close();
    }
  }

  // 2) Portadas del blog
  const posts = readPosts();
  for (const post of posts) {
    const page = await browser.newPage({
      viewport: { width: 1200, height: 600 },
      deviceScaleFactor: 2,
    });
    try {
      await page.setContent(coverHtml(post), { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(300);
      const buf = await page.screenshot({ type: "jpeg", quality: 88 });
      writeFileSync(join(BLOG_IMG_DIR, `${post.slug}.jpg`), buf);
      console.log(`✓ blog      ${post.slug}.jpg`);
    } catch (e) {
      console.error(`✗ blog      ${post.slug}:`, e.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
