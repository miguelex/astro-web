# miguedelgado.dev

Web personal, portfolio y CV de **Miguel Ángel Delgado** — ingeniero de software
y desarrollador fullstack PHP.

Construida con **Astro** + **Tailwind CSS v4**. Estática, bilingüe (ES/EN), con
tema claro/oscuro, blog sin base de datos y CV imprimible. Contenido en JSON para
un mantenimiento sencillo.

## Requisitos

- Node.js 18+ (probado con Node 24).
- npm.

## Puesta en marcha

```bash
npm install
npm run dev      # http://localhost:4321
```

## Scripts

| Comando            | Descripción                          |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Servidor de desarrollo               |
| `npm run build`    | Genera el sitio estático en `dist/`  |
| `npm run preview`  | Previsualiza el build                |
| `npm run check`    | Comprobación de tipos (astro check)  |

## Editar el contenido

Todo el contenido editable está en **`src/data/*.json`** (perfil, skills,
experiencia, formación, proyectos, certificaciones) y en **`src/content/blog/`**
(artículos en Markdown/MDX). Los textos de interfaz están en `src/i18n/ui.ts`.

> Guía detallada de mantenimiento y arquitectura: ver **`CLAUDE.md`**.
> Estado del proyecto y tareas pendientes: ver **`DEVLOG.md`**.

## Despliegue

Genera el build y sube el contenido de `dist/` a la raíz de tu hosting:

```bash
npm run build
```

El sitio es estático. En hosting **Apache/cPanel**, `public/.htaccess` (incluido en
el build) aplica HTTPS forzado, cabeceras de seguridad, compresión y caché. En
Vercel/Netlify/Cloudflare ese fichero se ignora; usa el equivalente de cada
plataforma y apunta el dominio allí.

Antes de publicar, revisa que `site` en `astro.config.mjs` apunta al dominio
correcto (actualmente `https://miguedelgado.dev`).

---

Hecho con [Astro](https://astro.build).
