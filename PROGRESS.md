# Progress

Owner: Andrew Virts. Site: WellFed Pet Guide (`wellfedpetguide.com`).

Stack in the repo: Void pages app, React islands, Vite+ (`vp`), `output: 'static'`. Articles are Markdown with YAML frontmatter in `content/articles/`. No Astro or Next.js. No real Cloudflare deploy has been run.

## Done

- Void app scaffolded with `void init` (`vite-plus`, React, static starter). Config is in `void.config.ts` and `vite.config.ts`.
- `vp check` passed (format, lint, types). `vp test` passed (5 tests, via `vitest.config.ts` so the Cloudflare worker test runner is not started). `vp build` prerendered every page to `dist/client/`.
- Pages: home, `/guides/`, `/dogs/`, `/cats/`, `/about/`, `/author/andrew-virts/`, `/editorial-policy/`, `/affiliate-disclosure/`, `/privacy/`, `/contact/`, `/404`.
- Five article drafts, each over 1,500 words, with sources, a not-veterinary-advice note, affiliate disclosure, comparison table, product cards marked TODO, FAQ, and related links:
  - `/dog-food-for-diarrhea/`
  - `/dog-food-brands-to-avoid/`
  - `/cat-pooping-outside-litter-box/`
  - `/dog-not-eating/`
  - `/cat-peeing-outside-litter-box/`
- SEO already in the templates and build: unique title and description from frontmatter, one H1, canonical URLs with trailing slashes, Open Graph and Twitter tags, Article/BlogPosting + FAQPage + BreadcrumbList JSON-LD, ItemList only on the brands roundup (no star ratings), Organization + WebSite on the home page, `sitemap.xml` with `lastmod`, `robots.txt`, `feed.xml`, `dist/client/_redirects` 301s, security and cache headers, HSTS and `alwaysUseHttps` in `void.config.ts`, AVIF/WebP images with width and height, hero preload.
- `AMAZON_TAG` is the only affiliate tag, default empty, declared in `env.ts`. See `env.example`.
- Lighthouse 12 (mobile, headless Chrome) against `vp preview` on 2026-11-02: home and the diarrhea article both scored Performance 100, Accessibility 100, Best Practices 100, SEO 100. Those numbers are not yet copied into a checklist file.

## Left

- `README.md`, `CONTENT_PLAN.md`, and `SEO_CHECKLIST.md` are written. The checklist includes the Lighthouse scores from the local preview.
- Fifteen articles in `CONTENT_PLAN.md` are not drafted and are not linked. Write them one file at a time under `content/articles/` when Andrew wants the next URL.
- Dev server canonicalizes by stripping a trailing slash (Void). Production is set up for the opposite: `cloudflare.assets.html_handling` is `force-trailing-slash`, and the build writes 301s in `dist/client/_redirects`. That production path has not been deployed, so it is unverified on Cloudflare.
- Product names are placeholders. Andrew still has to verify formulas and ASINs. No Amazon tag is set.
- Screenshots were started for a pull request. The pull request was cancelled. Do not open one unless Andrew asks.

## How to continue

```sh
vp install
vp check
vp test
vp build
vp preview
```

Node.js 24.22 or newer. New articles go in `content/articles/<slug>.md`. The route is `pages/[slug].island.tsx`. Required frontmatter is enforced in `src/content.ts` and `src/content.test.tsx`.
