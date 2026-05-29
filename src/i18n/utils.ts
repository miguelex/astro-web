import { ui, defaultLang, languages, type Lang, type UIKey } from "./ui";

/** Extrae el idioma de una URL (`/en/...` -> "en", resto -> "es"). */
export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split("/");
  if (seg in languages) return seg as Lang;
  return defaultLang;
}

/** Devuelve una función traductora `t("clave")` para el idioma dado. */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/**
 * Construye una ruta respetando el idioma actual.
 * Español vive en la raíz; inglés bajo `/en`.
 * `localizePath("/proyectos", "en")` -> "/en/proyectos"
 */
export function localizePath(path: string, lang: Lang): string {
  const clean = "/" + path.replace(/^\/+/, "");
  if (lang === defaultLang) return clean === "/" ? "/" : clean;
  return clean === "/" ? "/en" : `/en${clean}`;
}

/** Quita el prefijo de idioma de un pathname para obtener la ruta "neutra". */
export function stripLangPrefix(pathname: string): string {
  const out = pathname.replace(/^\/en(?=\/|$)/, "");
  return out === "" ? "/" : out;
}

/** Selecciona el valor de un campo i18n `{ es, en }`. */
export function tField<T>(field: { es: T; en: T }, lang: Lang): T {
  return field[lang] ?? field[defaultLang];
}

/** Da la URL equivalente en el otro idioma (para el conmutador). */
export function alternateUrl(url: URL, target: Lang): string {
  const neutral = stripLangPrefix(url.pathname);
  return localizePath(neutral, target);
}

export type I18nField<T = string> = { es: T; en: T };
