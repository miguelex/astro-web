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
