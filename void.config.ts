import { defineConfig } from "void/config";

const security = [
  "X-Content-Type-Options: nosniff",
  "X-Frame-Options: DENY",
  "Referrer-Policy: strict-origin-when-cross-origin",
  "Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()",
  "Cross-Origin-Opener-Policy: same-origin",
  "Strict-Transport-Security: max-age=31536000; includeSubDomains; preload",
  "Content-Security-Policy: default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; font-src 'self'; connect-src 'self' ws: wss:; object-src 'none'; base-uri 'self'; form-action 'self' mailto:; frame-ancestors 'none'",
];

export default defineConfig({
  output: "static",
  worker: {
    compatibility_date: "2026-11-02",
  },
  cloudflare: {
    name: "wellfedpetguide",
    compatibility_date: "2026-11-02",
    observability: {
      enabled: true,
      traces: {
        enabled: true,
      },
    },
    assets: {
      html_handling: "force-trailing-slash",
    },
  },
  head: {
    titleTemplate: "%s | WellFed Pet Guide",
    htmlAttrs: { lang: "en-US" },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#1b4332" },
    ],
    link: [
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/images/logo.png" },
      {
        rel: "alternate",
        href: "https://wellfedpetguide.com/feed.xml",
        type: "application/rss+xml",
        title: "WellFed Pet Guide",
      },
    ],
  },
  routing: {
    alwaysUseHttps: true,
    headers: {
      "/*": [...security, "Cache-Control: public, max-age=0, must-revalidate"],
      "/assets/*": ["Cache-Control: public, max-age=31536000, immutable"],
      "/images/*": ["Cache-Control: public, max-age=604800"],
    },
  },
});
