import * as si from "simple-icons";

interface SimpleIcon {
  title: string;
  path: string;
}

/** Nombre de la skill -> clave del export en simple-icons (siXxx). */
const exportKey: Record<string, string> = {
  PHP: "siPhp",
  Laravel: "siLaravel",
  Symfony: "siSymfony",
  JavaScript: "siJavascript",
  TypeScript: "siTypescript",
  "Vue.js": "siVuedotjs",
  React: "siReact",
  Bootstrap: "siBootstrap",
  Java: "siOpenjdk",
  Kotlin: "siKotlin",
  Claude: "siClaude",
  "Claude Code": "siClaude",
  GitHub: "siGithub",
  HTML5: "siHtml5",
  CSS3: "siCss",
  "Tailwind CSS": "siTailwindcss",
  "Node.js": "siNodedotjs",
  Git: "siGit",
  Docker: "siDocker",
  Composer: "siComposer",
  Linux: "siLinux",
  Nginx: "siNginx",
  Apache: "siApache",
  Webpack: "siWebpack",
  Vite: "siVite",
  MySQL: "siMysql",
  MariaDB: "siMariadb",
  PostgreSQL: "siPostgresql",
  Redis: "siRedis",
  MongoDB: "siMongodb",
  SQLite: "siSqlite",
  Elasticsearch: "siElasticsearch",
};

const icons = si as unknown as Record<string, SimpleIcon | undefined>;

/**
 * Devuelve el atributo `d` del logo de la tecnología (de simple-icons), o null
 * si no hay logo conocido. Para badges monocromos: se pinta con currentColor.
 */
export function techIconPath(name: string): string | null {
  const key = exportKey[name];
  if (!key) return null;
  return icons[key]?.path ?? null;
}
