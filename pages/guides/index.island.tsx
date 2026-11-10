import { GuideList } from "../../src/components/GuideList";
import { PageShell } from "../../src/components/PageShell";
import { staticPages } from "../../src/site";
import type { ArticleCard } from "../../src/types";

export default function GuidesPage({ articles }: { articles: ArticleCard[] }) {
  const page = staticPages.guides;
  const dogs = articles.filter((a) => a.category === "dogs");
  const cats = articles.filter((a) => a.category === "cats");

  return (
    <PageShell
      kicker="Complete Publication Index · Issue 01"
      h1={page.h1}
      lede="Eight guides are drafted and live. Each monograph exceeds 1,500 words, cites primary veterinary and regulatory publications, and marks product examples for verification."
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Guides", path: page.path },
      ]}
    >
      <h2>Canine digestion &amp; food label guides ({dogs.length})</h2>
      <GuideList articles={dogs} />

      <h2>Feline litter box &amp; elimination guides ({cats.length})</h2>
      <GuideList articles={cats} />
    </PageShell>
  );
}
