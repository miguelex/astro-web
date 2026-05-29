// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// NOTA: cambia `site` por tu dominio real cuando despliegues en Cloudflare Pages.
// Es necesario para sitemap, canónicos y hreflang.
export default defineConfig({
  site: "https://miguedelgado.dev",
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
      i18n: {
        defaultLocale: "es",
        locales: { es: "es-ES", en: "en-US" },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
