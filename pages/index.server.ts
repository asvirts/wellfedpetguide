import { defineHandler, defineHead } from "void";
import { allCards } from "../src/content";
import { pageHead } from "../src/seo";
import { staticPages } from "../src/site";
import type { ArticleCard } from "../src/types";

const page = staticPages.home;

export const loader = defineHandler(() => {
  return { articles: allCards() };
});

export const head = defineHead<{ articles: ArticleCard[] }>(() =>
  pageHead({
    path: page.path,
    seoTitle: page.seoTitle,
    description: page.description,
    crumbs: [{ name: "Home", path: "/" }],
    preload: "/images/home-hero-1200.avif",
  }),
);
