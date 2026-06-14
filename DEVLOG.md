# DEVLOG — Registro de desarrollo

Registro cronológico para mantener continuidad entre equipos (trabajo ↔ casa).

---

## 2026-05-29 — Sesión 1 (PC trabajo): andamiaje completo

### Hecho
- **Proyecto Astro 5 + TypeScript estricto** creado desde cero.
- **Tailwind v4** (CSS-first) con tokens de tema claro/oscuro en `src/styles/global.css`.
- **Fuentes** self-host: Space Grotesk (display), Geist (texto), JetBrains Mono (mono).
- **i18n** español (raíz) / inglés (`/en`): `src/i18n/ui.ts` + `utils.ts`.
- **Contenido en JSON** (`src/data/`): profile, skills, experience, education,
  projects, certifications — con **placeholders realistas** y campos `{es,en}`.
- **Logo MD** en SVG (`Logo.astro`) + `favicon.svg` + imágenes OG/placeholder.
- **Componentes y layout**: BaseLayout (anti-FOUC, skiplink), Header (nav i18n +
  menú móvil), Footer, ThemeToggle, LangToggle, SEO (canonical, hreflang, OG/Twitter),
  JsonLd (Person), Hero (con tarjeta de código), SkillsGrid, ExperienceTimeline,
  EducationList, ProjectCard (repo/demo condicionales), SectionHeading.
- **Páginas**: home, /proyectos, /certificaciones, /cv (imprimible), /blog + post,
  y sus equivalentes en `/en`. Más `404.astro`.
- **Blog** con Content Collections (MDX), sin BD. 1 post de ejemplo por idioma.
- **SEO/seguridad**: sitemap, robots.txt, `.htaccess` con CSP/HSTS/cabeceras, OG image.
- **Dominio** configurado: `https://miguedelgado.dev`.
- ✅ `npm run build` correcto — 13 páginas generadas sin errores.

### Decisiones
- Framework Astro (estático, performance/SEO). Hosting propio Apache → `.htaccess`.
- Estética tech/dev + minimalista. Acento de marca índigo→cian.
- CV generado desde JSON (no PDF estático); descarga vía impresión del navegador.

### Pendiente / siguientes pasos
- [ ] **Sustituir placeholders por datos reales** en `src/data/*.json`
      (experiencia, formación, proyectos, certificaciones, URLs de LinkedIn/GitHub).
- [ ] Reemplazar imágenes `public/images/projects/placeholder-*.svg` por capturas reales.
- [ ] Crear una imagen OG en **PNG/JPG** (1200×630) — algunos servicios no renderizan SVG.
      Actual: `public/og/default.svg`.
- [ ] Confirmar el dominio exacto (¿`miguedelgado.dev` o `migueldelgado.dev`?).
- [ ] Escribir posts reales en `src/content/blog/`.
- [ ] (Opcional) Lighthouse y revisión de accesibilidad.
- [ ] (Opcional) Configurar deploy automático al hosting.

### Notas para retomar
- Arrancar con `npm install` (si es un equipo nuevo) y `npm run dev`.
- Toda la guía de mantenimiento está en `CLAUDE.md`.

---

## 2026-05-29 — Sesión 2 (PC trabajo): rediseño visual + CV PDF real

### Hecho
- **Rediseño visual** "terminal/dev sofisticado" con animación sutil.
- Tipografía: **Fraunces** (serif display) + Geist + JetBrains Mono.
- **CV como PDF real** (ATS-friendly) generado en el build con Playwright:
  `PrintLayout.astro` + `CvDocument.astro` + páginas `/cv-pdf` y `/en/cv-pdf`,
  renderizadas por `scripts/generate-cv-pdf.mjs` (usa `sirv` + Chromium) a
  `dist/cv.pdf` y `dist/cv.en.pdf`. Sin URL/fecha del navegador.
- **Blog solo en español**: eliminadas rutas y contenido `/en/blog`.
- Logo y favicon rediseñados; `SiteBackground` con aurora/grano.

---

## 2026-05-29 — Sesión 3 (PC trabajo): paleta azul, contenido real y legal

### Hecho
- **Paleta cambiada a AZUL** (antes ámbar): marca azul-cian (`#0284c7` claro /
  `#38bdf8` oscuro) sobre neutros **slate** (se eliminaron los marrones). Oscuro
  más respirado (`#0f172a`, cards `#1c2740`). Acentos multicolor por categoría en
  skills (cian/turquesa/ámbar/violeta). Auroras de fondo en azul/índigo/teal.
- **Logos de tecnología** (simple-icons) en skills, experiencia y proyectos.
  Componente `TechTag.astro`. Helper `src/lib/techIcons.ts` (incluye Claude,
  Bootstrap, Java=OpenJDK, Kotlin, GitHub).
- **Formación** pasó de cards a timeline (igual que experiencia).
- **Kickers de sección traducidos** (es/en); "Stack" se mantiene igual.
- **Certificaciones** rediseñadas: cards con banner por emisor (`src/lib/issuers.ts`),
  logos de tech y soporte de imagen real (`image` opcional).
- **Blog**: cards con portada de gradiente determinista, nº, tag y tiempo de
  lectura (`readingTime`/`coverGradient` en `lib/blog.ts`).
- **DATOS REALES**:
  - `profile.json`: LinkedIn `miguelangeldelgadomarquez`, GitHub `miguelex`,
    ubicación Palos de la Frontera (Huelva), email `migue@miguedelgado.dev`,
    resumen sin redundancias.
  - `experience.json`: 3 entradas reales (Desarrollo y Digitalización Sectorial
    2022–act. — NetAsesor/Symfony/Claude; Ubrisecurity 2018–2020; SAD UHU
    2008–2013 unificando los 3 puestos del Servicio de Actividades Deportivas).
  - `education.json`: Grado Ing. Informática (UHU 2013–2015) + TFG reconocimiento
    facial (IA, 9, defensa 2023); B1 pendiente. (La técnica abandonada NO se pone.)
  - `skills.json`: stack real (incluye Claude, Agentes IA, Java, Kotlin, SQL Server…).
  - `projects.json`: 3 proyectos reales con **capturas propias**
    (`public/images/projects/*.jpg`), demo y repo: blog-de-cafe (HTML/CSS+BEM,
    2023), festival-musica (PHP+JS, 2023), rick-morty-api (React, 2022).
    Eliminados los placeholder SVG.
- **Páginas legales (RGPD)**: `/aviso-legal`, `/privacidad` (+ `/en/legal-notice`,
  `/en/privacy`) vía `LegalContent.astro`, enlazadas en footer. **Sin banner de
  cookies** (solo localStorage para el tema, exento). `LangToggle` mapea slugs es↔en.
  Email del CV (web y PDF) clicable (`mailto:`).
- **Fix botón Descargar CV**: `/cv.pdf` no existe en dev (daba error `cv.htm`);
  ahora en dev abre `/cv-pdf` y en prod descarga el PDF (`import.meta.env.PROD`).

### Pendiente / siguientes pasos (para casa)
- [ ] **Certificaciones reales**: `certifications.json` sigue con placeholders.
- [ ] (Opcional) Posts reales en `src/content/blog/es/` (hay 1 de ejemplo).
- [ ] (Opcional) Imagen OG en PNG/JPG 1200×630 (ahora SVG).
- [ ] **En el PC de casa**: `git pull` → `npm install` →
      **`npx playwright install chromium`** (necesario para el CV PDF).

### Estado
- Build OK (17 páginas + 2 PDFs), `astro check` 0 errores. Diseño validado por el
  usuario. Remoto GitHub: `github.com/miguelex/astro-web` (cuenta miguelex vía gh).

---

## 2026-06-14 — Sesión 4 (PC casa): plan de mejora (quick wins + SEO/UX)

### Hecho
- **Trailing slash unificado**: `trailingSlash: "always"` en `astro.config.mjs` y
  barra final en TODOS los enlaces internos (Header desktop+móvil, Footer, LangToggle
  con normalizador, HomeSections, BlogList, BlogArticle, SocialButtons preview).
  Evita el 301 de `DirectorySlash` de Apache. Canonical y enlaces ya coinciden.
- **Quitado el meta `generator`** (Astro vX.Y.Z) de `BaseLayout.astro` — no expone
  la versión del framework.
- **JSON-LD `Person` enriquecido** (`JsonLd.astro`): dirección estructurada real
  (`addressLocality`/`addressRegion`/`addressCountry`), `image` y `knowsAbout`.
  (El bloque Person ya existía; el punto del plan estaba prácticamente cubierto.)
- **Contacto directo**: email visible + icono `mailto:` en el Footer.
- **Proyecto destacado nuevo: dpeage** (sustituye al festival de música en
  `projects.json`): Next.js + React + TypeScript en Vercel, repo privado, demo
  `https://dpeage.com`, `year 2026`. Iconos Next.js/Vercel añadidos a `techIcons.ts`.
- **2.º post del blog**: `src/content/blog/es/php-template.mdx` (php-template).
- Verificado: `astro check` 0 errores; `npm run build:site` 18 páginas; canonical,
  enlaces y ausencia de `generator` confirmados en el HTML generado.

### Pendiente / siguientes pasos
- [ ] **Imagen de dpeage**: colocar la captura real en
      `public/images/projects/dpeage.jpg` (el JSON ya la referencia; hasta entonces
      la tarjeta muestra imagen rota).
- [ ] **og:image por página** (Home/Proyectos/Blog/CV): requiere generar las
      imágenes (p. ej. `astro-og-canvas`/satori en build). Pendiente de decidir.
- [ ] **Imágenes de proyectos a `<Image>`** (WebP/AVIF + srcset): implica mover las
      capturas a `src/assets` e importarlas (vía `import.meta.glob`). Pendiente.
- [ ] **Medir Core Web Vitals reales** (Lighthouse/PSI sobre la home).
- [ ] **Responsive real**: revisar en móvil el snippet `Developer.php` (overflow) y
      la rejilla de proyectos.
- Nota: cabeceras de seguridad (`.htaccess`: HSTS/CSP/X-Frame-Options/…) y
  `robots.txt`→`sitemap` ya estaban correctos; `aria-label` en iconos ya presentes.
  El enlace "Blog" en `/en` → `/blog` se mantiene a propósito (blog solo en español).

### 2026-06-14 — Sesión 4b (revisión del usuario)
- **Festival de música restaurado** como proyecto normal (`featured: false`); solo
  salía de *destacados*, no debía desaparecer. Home muestra 3 destacados
  (php-template, asinco, dpeage); `/proyectos` muestra los 6.
- **Imágenes generadas con Playwright** (`scripts/generate-images.mjs`,
  `npm run images`):
  - `dpeage.jpg`: captura real de `https://dpeage.com` (1440×900), igual que el
    resto de proyectos.
  - Portadas del blog `public/images/blog/<slug>.jpg` (plantilla on-brand: gradiente
    determinista + Fraunces + glyph). Helper `postCover()` en `lib/blog.ts`; se usan
    en el listado (con fallback a gradiente), en la cabecera del artículo y como
    `og:image` del post (→ og:image por página, otro punto del plan cubierto).
- **Paginación 9/página (3×3)** en proyectos y certificaciones (es/en) con
  `paginate()` y rutas `[...page].astro`. Certificaciones pasa de 2 a 3 columnas.
  Componente reutilizable `Pagination.astro`. (Con 6 ítems hoy hay 1 sola página.)
- **Bug i18n arreglado** (preexistente): el conmutador de idioma en `/proyectos` y
  `/certificaciones` iba a `/en/proyectos` (404). `LangToggle` ahora traduce el
  primer segmento del slug (proyectos↔projects, certificaciones↔certifications,
  legal/privacidad) conservando nº de página y slug de post.
