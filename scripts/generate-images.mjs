import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import sharp from "sharp";

const out = join(process.cwd(), "public/images");
mkdirSync(out, { recursive: true });

const pages = [
  {
    slug: "home",
    bg: "#1b4332",
    ink: "#f4f0e6",
    accent: "#d7b56d",
    title: "Dog food and litter box guides",
    kicker: "WellFed Pet Guide",
  },
  {
    slug: "dog-food-for-diarrhea",
    bg: "#e7efe9",
    ink: "#1c1915",
    accent: "#1b4332",
    title: "What to feed when the stool is loose",
    kicker: "Dog food",
  },
  {
    slug: "dog-food-brands-to-avoid",
    bg: "#f4f0e6",
    ink: "#1c1915",
    accent: "#243044",
    title: "Read the label before the slogan",
    kicker: "Dog food",
  },
  {
    slug: "dog-not-eating",
    bg: "#f7efe4",
    ink: "#1c1915",
    accent: "#7a3e2e",
    title: "A skipped meal needs a reason",
    kicker: "Dog food",
  },
  {
    slug: "cat-pooping-outside-litter-box",
    bg: "#efe8dc",
    ink: "#1c1915",
    accent: "#3d4a3a",
    title: "The box is a housing problem",
    kicker: "Litter box",
  },
  {
    slug: "cat-peeing-outside-litter-box",
    bg: "#e7eef2",
    ink: "#1c1915",
    accent: "#1e3a4c",
    title: "Urine outside the box is medical first",
    kicker: "Litter box",
  },
];

function escapeXml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function wrap(text, max) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max && line) {
      lines.push(line);
      line = word;
    } else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

function heroSvg(page, width, height) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="${page.bg}"/>
  <rect x="${width * 0.06}" y="${height * 0.1}" width="${width * 0.88}" height="${height * 0.8}" fill="none" stroke="${page.accent}" stroke-width="3"/>
  <circle cx="${width * 0.28}" cy="${height * 0.52}" r="${height * 0.16}" fill="${page.accent}"/>
  <rect x="${width * 0.42}" y="${height * 0.34}" width="${width * 0.4}" height="${height * 0.035}" fill="${page.accent}"/>
  <rect x="${width * 0.42}" y="${height * 0.42}" width="${width * 0.28}" height="${height * 0.02}" fill="${page.accent}" opacity="0.55"/>
  <rect x="${width * 0.42}" y="${height * 0.48}" width="${width * 0.34}" height="${height * 0.02}" fill="${page.accent}" opacity="0.35"/>
</svg>`;
}

function detailSvg(page, width, height) {
  const box = (index, label) => {
    const x = width * (0.08 + index * 0.31);
    return `<rect x="${x}" y="${height * 0.28}" width="${width * 0.26}" height="${height * 0.44}" fill="#fbf8f2" stroke="${page.accent}" stroke-width="3"/>
      <text x="${x + width * 0.13}" y="${height * 0.48}" text-anchor="middle" font-family="Liberation Sans, Noto Sans, sans-serif" font-size="${Math.round(height * 0.08)}" fill="${page.ink}">${index + 1}</text>
      <text x="${x + width * 0.13}" y="${height * 0.62}" text-anchor="middle" font-family="Liberation Sans, Noto Sans, sans-serif" font-size="${Math.round(height * 0.045)}" fill="${page.ink}">${escapeXml(label)}</text>`;
  };
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="${page.bg}"/>
  ${box(0, "Check")}
  ${box(1, "Change")}
  ${box(2, "Call")}
</svg>`;
}

function ogSvg(page) {
  const lines = wrap(page.title, 28);
  const text = lines
    .map(
      (line, index) =>
        `<text x="80" y="${250 + index * 68}" font-family="Liberation Serif, Noto Serif, serif" font-size="56" fill="${page.ink}">${escapeXml(line)}</text>`,
    )
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${page.bg}"/>
  <rect x="0" y="0" width="18" height="630" fill="${page.accent}"/>
  <text x="80" y="120" font-family="Liberation Sans, Noto Sans, sans-serif" font-size="24" letter-spacing="3" fill="${page.accent}">${escapeXml(page.kicker.toUpperCase())}</text>
  ${text}
  <text x="80" y="560" font-family="Liberation Sans, Noto Sans, sans-serif" font-size="28" fill="${page.ink}">WellFed Pet Guide</text>
</svg>`;
}

async function raster(svg, file, format, width, height) {
  let pipeline = sharp(Buffer.from(svg)).resize(width, height);
  if (format === "avif") pipeline = pipeline.avif({ quality: 45 });
  if (format === "webp") pipeline = pipeline.webp({ quality: 72 });
  if (format === "jpg") pipeline = pipeline.jpeg({ quality: 78 });
  if (format === "png") pipeline = pipeline.png();
  await pipeline.toFile(file);
}

const logo = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#1b4332"/>
  <path fill="#f4f0e6" d="M96 120h70l36 150 36-150h48l36 150 36-150h70l-74 272h-70l-40-160-40 160h-70z"/>
</svg>`;

await raster(logo, join(out, "logo.png"), "png", 512, 512);

for (const page of pages) {
  const hero1200 = heroSvg(page, 1200, 675);
  const hero800 = heroSvg(page, 800, 450);
  await raster(hero1200, join(out, `${page.slug}-hero-1200.avif`), "avif", 1200, 675);
  await raster(hero1200, join(out, `${page.slug}-hero-1200.webp`), "webp", 1200, 675);
  await raster(hero800, join(out, `${page.slug}-hero-800.avif`), "avif", 800, 450);
  await raster(hero800, join(out, `${page.slug}-hero-800.webp`), "webp", 800, 450);
  await raster(ogSvg(page), join(out, `${page.slug}-og.jpg`), "jpg", 1200, 630);
  if (page.slug === "home") continue;
  const detail1200 = detailSvg(page, 1200, 800);
  const detail800 = detailSvg(page, 800, 533);
  await raster(detail1200, join(out, `${page.slug}-detail-1200.avif`), "avif", 1200, 800);
  await raster(detail1200, join(out, `${page.slug}-detail-1200.webp`), "webp", 1200, 800);
  await raster(detail800, join(out, `${page.slug}-detail-800.avif`), "avif", 800, 533);
  await raster(detail800, join(out, `${page.slug}-detail-800.webp`), "webp", 800, 533);
}

console.log("images written to", out);
void dirname;
