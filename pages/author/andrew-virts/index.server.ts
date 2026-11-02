import { defineHandler, defineHead } from "void";
import { allCards } from "../../../src/content";
import { pageHead } from "../../../src/seo";
import { author, SITE_URL } from "../../../src/site";
import type { ArticleCard } from "../../../src/types";

export const loader = defineHandler(() => ({ articles: allCards() }));

export const head = defineHead<{ articles: ArticleCard[] }>(() =>
  pageHead({
    path: author.path,
    seoTitle: `${author.name}, editor`,
    description:
      "Andrew Virts edits WellFed Pet Guide. He is not a veterinarian. This page is the byline behind the dog food and litter box guides.",
    crumbs: [
      { name: "Home", path: "/" },
      { name: "About", path: "/about/" },
      { name: author.name, path: author.path },
    ],
    extra: [
      {
        "@type": "ProfilePage",
        mainEntity: {
          "@type": "Person",
          name: author.name,
          url: `${SITE_URL}${author.path}`,
          jobTitle: author.role,
          description: author.bio,
        },
      },
    ],
  }),
);
