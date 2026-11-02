import { GuideList } from "../../src/components/GuideList";
import { PageShell } from "../../src/components/PageShell";
import { staticPages } from "../../src/site";
import type { ArticleCard } from "../../src/types";

export default function GuidesPage({ articles }: { articles: ArticleCard[] }) {
  const page = staticPages.guides;
  return (
    <PageShell
      h1={page.h1}
      lede="Five guides are drafted. The rest of the plan is mapped on the topic clusters for dog food problems and litter boxes, and new articles will land on this index."
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Guides", path: page.path },
      ]}
    >
      <GuideList articles={articles} />
    </PageShell>
  );
}
