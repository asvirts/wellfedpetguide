import { absoluteUrl, author, documentTitle, SITE_NAME, SITE_URL } from "./site";
import type { Article, ArticleCard, Faq } from "./types";
import type { HeadDescriptor } from "void";

export type Crumb = { name: string; path: string };

type JsonLd = Record<string, unknown>;

function organization(): JsonLd {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    email: "hello@wellfedpetguide.com",
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/logo.png`,
      width: 512,
      height: 512,
    },
    founder: {
      "@type": "Person",
      name: author.name,
      url: absoluteUrl(author.path),
    },
  };
}

function website(): JsonLd {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    inLanguage: "en-US",
    publisher: { "@id": `${SITE_URL}/#organization` },
    description:
      "Guides to dog food problems and cat litter boxes, written from public veterinary and regulatory sources.",
  };
}

export function breadcrumbSchema(crumbs: Crumb[]): JsonLd {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function faqSchema(faqs: Faq[]): JsonLd {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function articleSchema(article: Article): JsonLd {
  const url = absoluteUrl(`/${article.slug}/`);
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: article.title,
    description: article.description,
    datePublished: article.published,
    dateModified: article.updated,
    inLanguage: "en-US",
    mainEntityOfPage: url,
    articleSection: article.category === "dogs" ? "Dogs" : "Cats",
    keywords: article.primaryKeyword,
    image: [`${SITE_URL}/images/${article.slug}-og.jpg`],
    author: {
      "@type": "Person",
      name: author.name,
      url: absoluteUrl(author.path),
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function itemListSchema(article: Article): JsonLd {
  const url = absoluteUrl(`/${article.slug}/`);
  return {
    "@type": "ItemList",
    "@id": `${url}#picks`,
    name: article.title,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: article.products.length,
    itemListElement: article.products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      description: product.bestFor,
      url,
    })),
  };
}

function graph(nodes: JsonLd[]): string {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes }).replace(
    /</g,
    "\\u003c",
  );
}

function meta(
  articleOrPage: { description: string; seoTitle: string },
  path: string,
  image: string,
  type: string,
) {
  const title = documentTitle(articleOrPage.seoTitle);
  const url = absoluteUrl(path);
  return [
    { name: "description", content: articleOrPage.description },
    { name: "robots", content: "index, follow, max-image-preview:large" },
    { name: "author", content: author.name },
    { property: "og:title", content: title },
    { property: "og:description", content: articleOrPage.description },
    { property: "og:url", content: url },
    { property: "og:type", content: type },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: "en_US" },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: title },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: articleOrPage.description },
    { name: "twitter:image", content: image },
  ];
}

export function articleHead(article: Article): HeadDescriptor {
  const path = `/${article.slug}/`;
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    {
      name: article.category === "dogs" ? "Dogs" : "Cats",
      path: article.category === "dogs" ? "/dogs/" : "/cats/",
    },
    { name: article.title, path },
  ];
  const nodes = [
    organization(),
    articleSchema(article),
    breadcrumbSchema(crumbs),
    faqSchema(article.faqs),
  ];
  if (article.kind === "roundup") nodes.push(itemListSchema(article));
  const image = `${SITE_URL}/images/${article.slug}-og.jpg`;
  return {
    title: article.seoTitle,
    meta: [
      ...meta(article, path, image, "article"),
      { property: "article:published_time", content: article.published },
      { property: "article:modified_time", content: article.updated },
    ],
    link: [
      { rel: "canonical", href: absoluteUrl(path) },
      {
        rel: "preload",
        href: `/images/${article.slug}-hero-1200.avif`,
        as: "image",
        type: "image/avif",
        fetchpriority: "high",
      },
    ],
    script: [{ type: "application/ld+json", innerHTML: graph(nodes) }],
  };
}

export function pageHead(input: {
  path: string;
  seoTitle: string;
  description: string;
  crumbs: Crumb[];
  noindex?: boolean;
  preload?: string;
  extra?: JsonLd[];
}): HeadDescriptor {
  const image = `${SITE_URL}/images/home-og.jpg`;
  const nodes = [
    organization(),
    ...(input.path === "/" ? [website()] : []),
    ...(input.crumbs.length > 1 ? [breadcrumbSchema(input.crumbs)] : []),
    ...(input.extra ?? []),
  ];
  const description = input.description;
  const title = documentTitle(input.seoTitle);
  return {
    title: input.seoTitle,
    meta: [
      { name: "description", content: description },
      {
        name: "robots",
        content: input.noindex ? "noindex, follow" : "index, follow, max-image-preview:large",
      },
      { name: "author", content: author.name },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: absoluteUrl(input.path) },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "en_US" },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: `${SITE_NAME} guides` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    link: [
      { rel: "canonical", href: absoluteUrl(input.path) },
      ...(input.preload
        ? [
            {
              rel: "preload",
              href: input.preload,
              as: "image",
              type: "image/avif",
              fetchpriority: "high",
            },
          ]
        : []),
    ],
    script: [{ type: "application/ld+json", innerHTML: graph(nodes) }],
  };
}

export function cardPath(card: ArticleCard): string {
  return `/${card.slug}/`;
}
