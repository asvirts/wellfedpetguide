import { defineHead } from "void";
import { pageHead } from "../../src/seo";
import { staticPages } from "../../src/site";

const page = staticPages.disclosure;

export const head = defineHead(() =>
  pageHead({
    path: page.path,
    seoTitle: page.seoTitle,
    description: page.description,
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Affiliate disclosure", path: page.path },
    ],
  }),
);
