import { getCollection, type CollectionEntry } from "astro:content";
import type { Lang } from "../i18n/ui";

export type Post = CollectionEntry<"blog">;

/** Posts de un idioma, sin borradores en producción, ordenados por fecha desc. */
export async function getPosts(lang: Lang): Promise<Post[]> {
  const posts = await getCollection("blog", ({ data }) => {
    const visible = import.meta.env.PROD ? !data.draft : true;
    return data.lang === lang && visible;
  });
  return posts.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
  );
}

/** Quita el prefijo de idioma del id del post -> slug limpio. */
export function postSlug(id: string): string {
  return id.replace(/^(es|en)\//, "").replace(/\.(md|mdx)$/, "");
}

/** Formatea una fecha según el idioma. */
export function formatDate(date: Date, lang: Lang): string {
  return date.toLocaleDateString(lang === "es" ? "es-ES" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Minutos de lectura estimados a partir del cuerpo del post (~200 ppm). */
export function readingTime(post: Post): number {
  const words = (post.body ?? "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Gradiente determinista (mismo post -> mismo color) para la portada. */
export function coverGradient(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 360;
  const h2 = (h + 48) % 360;
  return `linear-gradient(135deg, hsl(${h} 70% 52%), hsl(${h2} 72% 46%))`;
}
