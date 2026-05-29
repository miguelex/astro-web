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
  devtalles: { color: "#8B5CF6" },
  frogames: { color: "#22C55E" },
  mouredev: { color: "#27272A" },
  "mouredev pro": { color: "#27272A" },
  "metal code": { color: "#F97316" },
  metalcode: { color: "#F97316" },
  holamundo: { color: "#E2E8F0" },
  "hola mundo": { color: "#E2E8F0" },
  "linkedin learning": { color: "#0A66C2", siKey: "siLinkedin" },
  linkedin: { color: "#0A66C2", siKey: "siLinkedin" },
};

const FALLBACK = "#38bdf8";

export function issuerStyle(name: string): IssuerStyle {
  const key = name.trim().toLowerCase();
  const cfg = issuers[key];
  if (!cfg) return { color: FALLBACK, iconPath: null };
  const iconPath = cfg.siKey ? (icons[cfg.siKey]?.path ?? null) : null;
  return { color: cfg.color, iconPath };
}
