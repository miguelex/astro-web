# CLAUDE.md — Contexto del proyecto

> Guía para retomar el desarrollo de forma coherente en cualquier equipo
> (este proyecto se inició en el PC del trabajo y puede continuarse en casa).

## Qué es

Web personal / portfolio / CV de **Miguel Ángel Delgado**, ingeniero de software
y desarrollador fullstack PHP con 15 años de experiencia.

- **Dominio:** https://miguedelgado.dev
- **Idiomas:** español (raíz `/`) e inglés (`/en`).
- **Tema:** claro / oscuro (conmutable, persiste en `localStorage`).
- **Sin base de datos:** todo el contenido vive en JSON y Markdown/MDX.

## Stack

- **Astro 5** (salida 100% estática) + **TypeScript** estricto.
- **Tailwind CSS v4** (vía `@tailwindcss/vite`, configuración CSS-first en `src/styles/global.css`).
- **Content Collections** (MDX) para el blog — `@astrojs/mdx`.
- **@astrojs/sitemap** para el sitemap.
- Fuentes self-host con `@fontsource-variable`: **Space Grotesk** (display),
  **Geist** (texto), **JetBrains Mono** (mono/detalles dev).

## Estructura

```
src/
  components/        UI y secciones (Hero, SkillsGrid, ProjectCard, SEO, JsonLd, Logo...)
  content/blog/      Posts del blog: es/*.mdx y en/*.mdx
  content.config.ts  Schema (Zod) de la colección de blog
  data/              Contenido en JSON (ver abajo) + index.ts tipado
  i18n/              ui.ts (textos de interfaz) + utils.ts (helpers idioma/rutas)
  layouts/           BaseLayout.astro
  lib/               blog.ts (helpers de posts)
  pages/             Rutas. Español en raíz; inglés bajo /en
  styles/global.css  Tailwind v4, tokens de tema y prose del blog
public/              favicon, imágenes, og, robots.txt, .htaccess
```

## Cómo se gestiona el contenido (sin tocar componentes)

Edita los JSON de `src/data/`. Los campos traducibles son objetos `{ "es": ..., "en": ... }`:

- **`profile.json`** — nombre, rol, resumen, ubicación, email, redes (LinkedIn/GitHub).
- **`skills.json`** — grupos por `category`: `tech | tools | databases | soft`.
- **`experience.json`** — empleos (`end: null` = actualidad).
- **`education.json`** — formación académica.
- **`projects.json`** — proyectos. `repo` y `demo` son opcionales (pon `null` si no aplica;
  si `repo` es `null` la tarjeta muestra "Repo privado"). `featured: true` los saca en la home.
- **`certifications.json`** — cursos/credenciales (Udemy, Coursera...). `url` opcional.

Textos de interfaz (menús, botones): `src/i18n/ui.ts`.

### Añadir un proyecto
Añade un objeto a `projects.json` y coloca su imagen en `public/images/projects/`
(referénciala con ruta absoluta, p. ej. `/images/projects/mi-proyecto.webp`).

### Añadir un post al blog
Crea `src/content/blog/es/mi-post.mdx` (y/o `en/...`) con frontmatter:
```yaml
---
title: "Título"
description: "Resumen breve"
pubDate: 2026-05-29
lang: "es"        # debe coincidir con la carpeta
tags: ["php", "astro"]
draft: false       # true = oculto en producción
---
```
La URL sale del nombre del fichero: `/blog/mi-post` (o `/en/blog/...`).

### CV en PDF
No hay PDF estático: la página `/cv` (y `/en/cv`) se genera desde los mismos JSON
y el botón "Descargar CV" abre el diálogo de impresión (`window.print()`) con CSS
de impresión que oculta cabecera/pie. Guardar como PDF desde ahí.

## Comandos

```bash
npm install      # instalar dependencias
npm run dev      # desarrollo en http://localhost:4321
npm run build    # build estático en dist/
npm run preview  # previsualizar el build
npm run check    # comprobación de tipos (astro check)
```

## Convenciones / decisiones

- i18n: español en raíz, inglés en `/en` (`prefixDefaultLocale: false`).
  Las rutas se localizan a mano en `Header.astro` porque los slugs difieren
  (`/proyectos` vs `/en/projects`).
- Colores vía CSS variables semánticas (`--bg`, `--fg`, `--brand`...) en `global.css`;
  el modo oscuro se activa con `[data-theme="dark"]` en `<html>`.
- Cero JS salvo scripts inline mínimos (tema, menú móvil, imprimir CV).
- Logo MD: `src/components/Logo.astro` (SVG) y `public/favicon.svg` (mantener en sincronía).

## Despliegue

Hosting propio (Apache/cPanel). Subir el contenido de `dist/` a la raíz web.
`public/.htaccess` ya incluye HTTPS forzado, cabeceras de seguridad (CSP, HSTS,
X-Frame-Options...), compresión y caché. Si algún día se usa Vercel/Netlify/
Cloudflare, ese `.htaccess` se ignora (usar el equivalente de cada plataforma).

## Pendiente / TODO

Ver **DEVLOG.md** para el estado y los siguientes pasos.
