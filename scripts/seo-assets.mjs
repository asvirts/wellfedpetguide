import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parse as parseYaml } from "yaml";

const SITE = "https://wellfedpetguide.com";
const UPDATED = "2026-11-02";

const staticPaths = [
  { path: "/", lastmod: UPDATED },
  { path: "/guides/", lastmod: UPDATED },
  { path: "/dogs/", lastmod: UPDATED },
  { path: "/cats/", lastmod: UPDATED },
  { path: "/about/", lastmod: UPDATED },
  { path: "/author/andrew-virts/", lastmod: UPDATED },
  { path: "/editorial-policy/", lastmod: UPDATED },
  { path: "/affiliate-disclosure/", lastmod: UPDATED },
  { path: "/privacy/", lastmod: UPDATED },
  { path: "/contact/", lastmod: UPDATED },
];

function dateOnly(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime()))
    return value.toISOString().slice(0, 10);
  const text = String(value ?? "");
  return /^\d{4}-\d{2}-\d{2}$/.test(text) ? text : UPDATED;
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function loadEntries(root) {
  const dir = join(root, "content/articles");
  const articles = readdirSync(dir)
    .filter((name) => name.endsWith(".md"))
    .map((name) => {
      const slug = name.replace(/\.md$/, "");
      const raw = readFileSync(join(dir, name), "utf8");
      const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
      const data = match ? parseYaml(match[1]) : {};
      return {
        path: `/${slug}/`,
        lastmod: dateOnly(data.updated),
        title: String(data.title ?? slug),
        description: String(data.description ?? ""),
        published: dateOnly(data.published),
      };
    });
  return { pages: [...staticPaths, ...articles], articles };
}

function rfc822(iso) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day, 16, 0, 0)).toUTCString();
}

export function renderSeoFiles(root) {
  const { pages, articles } = loadEntries(root);
  const urls = pages
    .map(
      (page) =>
        `  <url><loc>${escapeXml(`${SITE}${page.path === "/" ? "/" : page.path}`)}</loc><lastmod>${page.lastmod}</lastmod></url>`,
    )
    .join("\n");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`;
  const items = articles
    .map((article) => {
      const link = `${SITE}${article.path}`;
      return `    <item><title>${escapeXml(article.title)}</title><link>${escapeXml(link)}</link><guid isPermaLink="true">${escapeXml(link)}</guid><pubDate>${rfc822(article.published)}</pubDate><description><![CDATA[${article.description.replaceAll("]]>", "]]]]><![CDATA[>")}]]></description></item>`;
    })
    .join("\n");
  const feed = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>WellFed Pet Guide</title><link>${SITE}/</link><description>Guides to dog food problems and cat litter boxes.</description><language>en-us</language><lastBuildDate>${rfc822(UPDATED)}</lastBuildDate>\n${items}\n</channel></rss>\n`;
  const redirects = ["/index.html  /  301"];
  for (const page of pages) {
    if (page.path === "/") continue;
    const bare = page.path.replace(/\/$/, "");
    redirects.push(`${bare}  ${page.path}  301`);
    redirects.push(`${bare}.html  ${page.path}  301`);
    redirects.push(`${page.path}index.html  ${page.path}  301`);
  }
  return {
    "sitemap.xml": sitemap,
    "robots.txt": robots,
    "feed.xml": feed,
    _redirects: `${redirects.join("\n")}\n`,
  };
}

export function writeSeoAssets(directory, root) {
  mkdirSync(directory, { recursive: true });
  const files = renderSeoFiles(root);
  for (const [name, body] of Object.entries(files)) writeFileSync(join(directory, name), body);
  return Object.keys(files);
}
