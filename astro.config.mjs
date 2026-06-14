// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// NOTA: cambia `site` por tu dominio real cuando despliegues en Cloudflare Pages.
// Es necesario para sitemap, canónicos y hreflang.
export default defineConfig({
  site: "https://miguedelgado.dev",
  // URLs canónicas con barra final (formato "directory"); los enlaces internos
  // también la llevan para evitar el 301 de DirectorySlash de Apache.
  trailingSlash: "always",
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: false, // español en la raíz "/", inglés en "/en"
    },
  },
  integrations: [
    mdx(),
    sitemap({
      // Excluye las páginas de impresión y el CV (noindex) del sitemap.
      filter: (page) => !/\/cv-pdf\/?$|\/cv\/?$/.test(page),
      i18n: {
        defaultLocale: "es",
        locales: { es: "es-ES", en: "en-US" },
      },
    }),
  ],
  vite: {
    // cast: el tipo de @tailwindcss/vite y el de Vite de Astro difieren ligeramente
    plugins: /** @type {any} */ ([tailwindcss()]),
  },
});
