import { GuideList } from "../../src/components/GuideList";
import { PageShell } from "../../src/components/PageShell";
import { staticPages } from "../../src/site";
import type { ArticleCard } from "../../src/types";

export default function CatsPage({ articles }: { articles: ArticleCard[] }) {
  const page = staticPages.cats;
  return (
    <PageShell
      h1={page.h1}
      lede="This cluster is about elimination outside the box: feces in one guide, urine in the other. The setup of the box comes before any automatic machine."
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Cats", path: page.path },
      ]}
    >
      <h2>What is published</h2>
      <GuideList articles={articles} />
      <h2>How the cluster fits together</h2>
      <p>
        <a href="/cat-pooping-outside-litter-box/">Cat pooping outside the litter box</a> and{" "}
        <a href="/cat-peeing-outside-litter-box/">cat peeing outside the litter box</a> share a
        setup, and they do not share a medical risk. Urine outside the box can be a urinary
        emergency, especially in a male cat. Feces outside the box can be constipation, diarrhea,
        pain, or a box the cat has rejected.
      </p>
      <p>
        Planned guides cover automatic boxes, multi-cat households, odor control, and litter box
        furniture. Those pages are not published yet, so they are not linked from here. A new robot
        does not fix a cat that needs a veterinarian.
      </p>
    </PageShell>
  );
}
