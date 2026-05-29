import * as si from "simple-icons";

interface SimpleIcon {
  title: string;
  path: string;
  hex: string;
}
const icons = si as unknown as Record<string, SimpleIcon | undefined>;

interface IssuerStyle {
  /** color de marca del emisor (hex con #) */
  color: string;
  /** path del logo (simple-icons) o null si no existe */
  iconPath: string | null;
}

/**
 * Estilo visual por emisor. Algunos (Udemy, Platzi) ya no están en
 * simple-icons por temas de marca: para esos guardamos solo el color y se usa
 * la inicial. La clave se compara en minúsculas y sin espacios.
 */
const issuers: Record<string, { color: string; siKey?: string }> = {
  udemy: { color: "#A435F0" },
  coursera: { color: "#0056D2", siKey: "siCoursera" },
  platzi: { color: "#98CA3F" },
  pluralsight: { color: "#F15B2A", siKey: "siPluralsight" },
  "linkedin learning": { color: "#0A66C2", siKey: "siLinkedin" },
  linkedin: { color: "#0A66C2", siKey: "siLinkedin" },
  freecodecamp: { color: "#0A0A23", siKey: "siFreecodecamp" },
  edx: { color: "#02262B" },
  google: { color: "#4285F4", siKey: "siGoogle" },
  "google cloud": { color: "#4285F4", siKey: "siGooglecloud" },
  aws: { color: "#FF9900", siKey: "siAmazonwebservices" },
  "amazon web services": { color: "#FF9900", siKey: "siAmazonwebservices" },
  microsoft: { color: "#0078D4", siKey: "siMicrosoft" },
};

const FALLBACK = "#38bdf8";

export function issuerStyle(name: string): IssuerStyle {
  const key = name.trim().toLowerCase();
  const cfg = issuers[key];
  if (!cfg) return { color: FALLBACK, iconPath: null };
  const iconPath = cfg.siKey ? (icons[cfg.siKey]?.path ?? null) : null;
  return { color: cfg.color, iconPath };
}
