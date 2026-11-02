import { defineHead } from "void";
import { pageHead } from "../../src/seo";
import { staticPages } from "../../src/site";

const page = staticPages.editorial;

export const head = defineHead(() =>
  pageHead({
    path: page.path,
    seoTitle: page.seoTitle,
    description: page.description,
    crumbs: [
      { name: "Home", path: "/" },
      { name: "How we choose", path: page.path },
    ],
  }),
);
