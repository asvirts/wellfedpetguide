# SEO checklist

How the current site meets the launch criteria. Scores below are from Lighthouse 12.8.2, mobile, headless Chrome, against `vp preview` on 2 November 2026. Both URLs returned the prerendered HTML.

| URL                                            | Performance | Accessibility | Best Practices | SEO |
| ---------------------------------------------- | ----------- | ------------- | -------------- | --- |
| `http://127.0.0.1:4173/`                       | 100         | 100           | 100            | 100 |
| `http://127.0.0.1:4173/dog-food-for-diarrhea/` | 100         | 100           | 100            | 100 |

Core Web Vitals were inside the green range on that run (Lighthouse performance 100 implies LCP under 2.5s, CLS under 0.1, and a good INP for this no-JS page). Re-run Lighthouse on the live Cloudflare URL after deploy. Local HTTP does not exercise the production HTTPS redirect.

## Rendering and speed

| Criterion                                             | Where it is met                                                                                                                                                                                   |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fully prerendered HTML, content in the first response | `void.config.ts` sets `output: 'static'`. `vp build` writes one HTML file per page under `dist/client/`. Article body text is in that file, not fetched by the browser.                           |
| Minimal JavaScript                                    | Pages are Void islands with no hydrated components. The article HTML links the CSS file only. The empty island JS chunk is not referenced.                                                        |
| LCP image preloaded                                   | `src/seo.ts` adds `rel="preload"` for the hero AVIF on the home page and on each article. The `<img>` uses `fetchpriority="high"` and is not lazy.                                                |
| Images: AVIF and WebP, width and height, alt text     | `public/images/` and `src/components/Picture.tsx`. Below-the-fold detail images use `loading="lazy"`.                                                                                             |
| Hashed assets cached for a long time                  | `routing.headers` sets `/assets/*` to `public, max-age=31536000, immutable`. HTML is `max-age=0, must-revalidate`. Images under `/images/*` are one week, because those filenames are not hashed. |
| Compression                                           | Cloudflare compresses text with Brotli or gzip at the edge. The app does not precompress files.                                                                                                   |

## Titles, headings, URLs

| Criterion                                                       | Where it is met                                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unique `<title>` of 60 characters or fewer, including the brand | `head.titleTemplate` is `%s \| WellFed Pet Guide`. Article `seoTitle` and static titles are checked in `src/content.test.tsx` (articles) and should be rechecked when a static title changes.                                                                                                                                                                                                                                           |
| Meta description of 155 characters or fewer                     | Frontmatter `description`, and the same test for articles.                                                                                                                                                                                                                                                                                                                                                                              |
| One H1 containing the primary keyword                           | The template renders `title` once. Article bodies are rejected if they contain a markdown H1. The test requires `title` to contain `primaryKeyword`.                                                                                                                                                                                                                                                                                    |
| H2/H3 outline and a table of contents                           | Markdown headings plus the template sections (takeaways, products, FAQ, sources, related).                                                                                                                                                                                                                                                                                                                                              |
| Short slugs                                                     | Filename under `content/articles/`. Example: `/dog-food-for-diarrhea/`.                                                                                                                                                                                                                                                                                                                                                                 |
| Trailing slash and 301s                                         | Canonicals and internal links use a trailing slash. `vp build` writes `dist/client/_redirects` with 301s from the no-slash path, the `.html` path, and `index.html`. `cloudflare.assets.html_handling` is `force-trailing-slash`, which is Cloudflare's own slash canonicalization. Void's dev server still 301s the slash form back to the route without a slash. That is local only. Confirm the production 301s after `void deploy`. |
| Self-referencing canonicals                                     | `src/seo.ts` emits `rel="canonical"` to `https://wellfedpetguide.com/...`.                                                                                                                                                                                                                                                                                                                                                              |
| `lang="en-US"`                                                  | `void.config.ts` `head.htmlAttrs`. No hreflang. The site is US English only.                                                                                                                                                                                                                                                                                                                                                            |

## Schema

JSON-LD is one `<script type="application/ld+json">` per page, built in `src/seo.ts`.

| Page              | Types                                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------ |
| Home              | Organization, WebSite. No search action, because there is no search URL.                                     |
| Articles          | BlogPosting (author Andrew Virts, `datePublished`, `dateModified`), BreadcrumbList, FAQPage.                 |
| Roundups          | ItemList of named items. `kind: roundup` is the switch (brands, picky eaters, sensitive stomachs). No stars. |
| Other inner pages | Organization and BreadcrumbList. The author page also has a ProfilePage.                                     |

There is no Product, Review, or `aggregateRating` schema. The content test fails if those strings appear.

## E-E-A-T

| Criterion                 | Where it is met                                                                                                                                                                                      |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Real byline, editable bio | Andrew Virts, linked to `/author/andrew-virts/`. Bio text lives only in `src/site.ts`. It says he is not a veterinarian.                                                                             |
| Editorial policy          | `/editorial-policy/`.                                                                                                                                                                                |
| Sources on articles       | Frontmatter `sources`, rendered at the bottom. Drafts link to Merck, AAFCO, FDA, WSAVA, AVMA, AAHA, ASPCA, Cornell Feline Health Center, Ohio State Indoor Pet Initiative, Tufts, VCA, and NC State. |
| Visible updated date      | `<time datetime>` in the byline, formatted as a calendar date.                                                                                                                                       |
| About and contact         | `/about/`, `/contact/` (`hello@wellfedpetguide.com`, a mailto, no fake form backend).                                                                                                                |
| Not veterinary advice     | Site bar on every page, plus a note at the top of each article.                                                                                                                                      |

## Internal links

Home, `/guides/`, `/dogs/`, and `/cats/` list the seven live articles. Dog articles link across the digestion cluster, including picky eaters and sensitive stomachs. The two cat articles link to each other. Each article has a related-guides block and breadcrumbs. Category hubs explain the cluster and name future topics without linking to URLs that do not exist. Header and footer cover the static pages, so none of those are orphans. `/404` is `noindex` and is the error document, not a sitemap URL.

## Affiliate links

`src/components/AffiliateLink.tsx` sets `target="_blank"` and `rel="sponsored nofollow noopener"`. The disclosure is the bar under the header and a longer note above the article H1. Tag configuration is `AMAZON_TAG` in `env.ts`, default empty.

## Technical files

| File                      | Produced by                                                                                                                         |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `dist/client/sitemap.xml` | `scripts/seo-assets.mjs` at the end of `vp build`. Every URL has `lastmod`.                                                         |
| `dist/client/robots.txt`  | Same script. Allows all crawlers and points at the sitemap.                                                                         |
| `dist/client/feed.xml`    | RSS 2.0 for the seven articles. Also linked from `<head>` as `rel="alternate"`.                                                     |
| `dist/client/404.html`    | Prerendered `/404` page.                                                                                                            |
| HTTPS                     | `routing.alwaysUseHttps` (308 on Cloudflare). HSTS header on responses. README tells Andrew to enable Always Use HTTPS on the zone. |
| Security headers          | `void.config.ts` `routing.headers`: `nosniff`, `X-Frame-Options: DENY`, Referrer-Policy, Permissions-Policy, COOP, CSP, HSTS.       |

## Content

The seven drafts are specific answers (what to feed, which label checks matter, when a litter accident is an emergency, how to feed a healthy choosy dog, how to choose a food for a repeating sensitive stomach). Paragraphs are short, with lists, a key-takeaways box, a comparison table, and FAQ. Word count is enforced at 1,500 or more in `src/content.test.tsx`. Product cards are labeled TODO. No test results are claimed.

## Still Andrew's job after deploy

- Confirm the live trailing-slash 301s and that only one URL returns 200.
- Run Google's Rich Results test on a live article.
- Verify the domain in Search Console and Bing, and submit `https://wellfedpetguide.com/sitemap.xml`.
- Turn on Cloudflare Web Analytics.
- Replace TODO products and set `AMAZON_TAG`.
