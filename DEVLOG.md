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
