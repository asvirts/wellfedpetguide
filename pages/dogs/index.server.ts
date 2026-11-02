import { defineHandler, defineHead } from "void";
import { articlesIn } from "../../src/content";
import { pageHead } from "../../src/seo";
import { staticPages } from "../../src/site";
import type { ArticleCard } from "../../src/types";

const page = staticPages.dogs;

export const loader = defineHandler(() => ({ articles: articlesIn("dogs") }));

export const head = defineHead<{ articles: ArticleCard[] }>(() =>
  pageHead({
    path: page.path,
    seoTitle: page.seoTitle,
    description: page.description,
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Dogs", path: page.path },
    ],
  }),
);
