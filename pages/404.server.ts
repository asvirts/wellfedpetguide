import { defineHead } from "void";
import { pageHead } from "../src/seo";
import { staticPages } from "../src/site";

const page = staticPages.notFound;

export const head = defineHead(() =>
  pageHead({
    path: page.path,
    seoTitle: page.seoTitle,
    description: page.description,
    noindex: true,
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Page not found", path: page.path },
    ],
  }),
);
