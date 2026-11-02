# WellFed Pet Guide

Static guides for dog food problems and cat litter boxes. The site is a [Void](https://void.cloud) pages app (React) built with Vite+ and prerendered with `output: 'static'`. It deploys with `void deploy` to Cloudflare. It is not an Astro or Next.js project.

Andrew Virts is the editor. The guides are not veterinary advice. Product names in the first drafts are placeholders until he verifies them.

## Requirements

- Node.js 24.22 or newer (Void's current requirement).
- No global install is required. `vp` is the Vite+ binary from the local `vite-plus` package. A global install is optional: `curl -fsSL https://vite.plus | bash`.

## Commands

From the repo root:

```sh
vp install
vp dev
vp check
vp test
vp build
vp preview
```

| Command      | What it does                                                                                                    |
| ------------ | --------------------------------------------------------------------------------------------------------------- |
| `vp install` | Installs dependencies with the repo's package manager.                                                          |
| `vp dev`     | Dev server, usually `http://127.0.0.1:5173`.                                                                    |
| `vp check`   | Format, lint, and typecheck.                                                                                    |
| `vp test`    | Content and affiliate-link tests.                                                                               |
| `vp build`   | Production build. HTML lands in `dist/client/`, plus `sitemap.xml`, `robots.txt`, `feed.xml`, and `_redirects`. |
| `vp preview` | Serves that build locally.                                                                                      |

`package.json` scripts call the same binaries (`vp dev`, and so on). `vp build` is the Vite+ build. It is not `vp run build`.

Void's dev server redirects a trailing slash to the route without one. Canonical tags and in-site links use a trailing slash (`/dog-food-for-diarrhea/`). Production is configured so Cloudflare serves the slash form and 301s the variants. See `void.config.ts` (`cloudflare.assets.html_handling`) and `scripts/seo-assets.mjs`.

## Affiliate tag

One value: `AMAZON_TAG`. It defaults to empty in `env.ts`. Copy `env.example` to `.env` for local dev (Void reads `.env` only, not `.env.example`).

```sh
AMAZON_TAG=yourtag-20
```

A production build does not upload `.env`. Pass the tag in the environment when you build and deploy:

```sh
AMAZON_TAG=yourtag-20 vp build
AMAZON_TAG=yourtag-20 npx void deploy --platform cloudflare
```

Empty tag: product links are Amazon searches with no `tag` parameter. A 10-character ASIN in frontmatter uses `/dp/ASIN` instead. Links are `rel="sponsored nofollow noopener"` and open in a new tab.

## Add an article

1. Create `content/articles/<slug>.md`. The slug is the filename and the URL: `content/articles/senior-dog-food.md` becomes `/senior-dog-food/`.
2. Copy the frontmatter shape from an existing article. Required fields are checked in `src/content.ts` and `src/content.test.tsx`: `title`, `seoTitle`, `description`, `summary`, `category` (`dogs` or `cats`), `kind` (`guide` or `roundup`), `published`, `updated` (`YYYY-MM-DD`), `primaryKeyword`, `heroAlt`, `detailAlt`, `takeaways`, at least three `products`, three `faqs`, three `https` `sources`, and `related` slugs that already exist.
3. The H1 is `title`. Do not put a markdown `#` heading in the body. `seoTitle` plus ` | WellFed Pet Guide` must be 60 characters or fewer. `description` must be 155 characters or fewer. The body must be at least 1,500 words. The H1 must contain `primaryKeyword`.
4. `kind: roundup` adds ItemList schema. Do not add star ratings.
5. Generate images (or the build will point at missing files):

```sh
node scripts/generate-images.mjs
```

Add the new slug to the `pages` array in that script first, then commit the files under `public/images/`.

6. Run `vp check`, `vp test`, and `vp build`. The sitemap, RSS feed, and slash redirects pick the new file up from frontmatter. No new React route is required.

Edit the author bio in `src/site.ts`. That string is the byline and the author page.

## Deploy to your Cloudflare account

This repo has not been deployed. There are no Cloudflare credentials in the project. From a machine where you can sign in:

```sh
vp install
AMAZON_TAG=yourtag-20 npx void deploy --platform cloudflare
```

Void opens a browser to sign in, asks which Cloudflare account to use, builds the app, and prints the deployment URL. Later deploys can be `npx void deploy`. The saved target is local to that machine.

The app is a Void pages app with `output: 'static'`. With every page prerendered and no API routes or middleware, `void deploy` publishes the static files. `void.config.ts` sets the Worker name `wellfedpetguide`, compatibility date `2026-11-02`, observability, `assets.html_handling: force-trailing-slash`, HTTPS redirect, and the security headers.

### Custom domain

After the first deploy succeeds:

```sh
npx void domain add wellfedpetguide.com
npx void domain status wellfedpetguide.com
```

Repeat for `www.wellfedpetguide.com` if that hostname should work too. Follow the DNS records the CLI prints. If the domain's DNS is already on the same Cloudflare account, Void can attach the Workers custom domain there. Wait until `void domain status` shows the hostname as active before treating it as live.

When both hostnames are active, add a www-to-apex redirect in `void.config.ts` under `routing.redirects` and deploy again:

```ts
"https://www.wellfedpetguide.com/*": {
  to: "https://wellfedpetguide.com/:splat",
  status: 301,
},
```

Void documents that a host-prefixed redirect should be added only after `void domain add` for that hostname. Also turn on **Always Use HTTPS** for the zone in the Cloudflare dashboard so HTTP is covered even when an asset is served directly by Cloudflare. The app already sends HSTS (`Strict-Transport-Security`) and `routing.alwaysUseHttps`.

Do not submit the domain to the HSTS preload list until every subdomain you care about answers on HTTPS.

## After launch

1. [Google Search Console](https://search.google.com/search-console): add the `https://wellfedpetguide.com/` property (domain or URL-prefix). Verify it with the DNS record Google shows.
2. Submit `https://wellfedpetguide.com/sitemap.xml`.
3. [Bing Webmaster Tools](https://www.bing.com/webmasters): add the same site. You can import from Search Console or verify with Bing's DNS record, then submit the same sitemap.
4. Cloudflare dashboard → **Analytics & logs → Web Analytics**: add `wellfedpetguide.com`. Web Analytics is the cookieless option. The privacy page already describes it. Turn it on there. Do not paste a third-party tag into the pages unless you also update the Content-Security-Policy in `void.config.ts`.
5. Inspect one live URL in Google's Rich Results test (Article, FAQ, breadcrumbs). Fix the page before requesting indexing if a required field is missing.
6. Set `AMAZON_TAG` and replace each TODO product with a verified ASIN only after the formula on the bag matches the card.

## Layout of the repo

| Path                     | Role                                                              |
| ------------------------ | ----------------------------------------------------------------- |
| `content/articles/*.md`  | Article source.                                                   |
| `pages/`                 | Routes. `[slug]` renders every article.                           |
| `src/site.ts`            | Site name, author bio, contact email, static page copy.           |
| `src/seo.ts`             | Titles, canonicals, Open Graph, JSON-LD.                          |
| `void.config.ts`         | Static output, headers, Cloudflare settings.                      |
| `scripts/seo-assets.mjs` | Sitemap, robots, RSS, and 301s, written at the end of `vp build`. |
| `PROGRESS.md`            | What is done and what is left.                                    |
