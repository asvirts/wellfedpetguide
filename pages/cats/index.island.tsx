import { GuideList } from "../../src/components/GuideList";
import { PageShell } from "../../src/components/PageShell";
import { staticPages } from "../../src/site";
import type { ArticleCard } from "../../src/types";

const plannedCatTopics = [
  "Best Automatic Litter Boxes (Safety sensors, open-top vs. globe designs)",
  "Best Automatic Litter Box for Multiple Cats",
  "Best Litter Box for Multiple Cats (High-capacity, low-entry & N+1 layout)",
  "Best Litter Box for Odor Control (Unscented clumping & ventilation)",
  "Litter Box Furniture & Enclosures (Why sightlines & ventilation matter)",
];

export default function CatsPage({ articles }: { articles: ArticleCard[] }) {
  const page = staticPages.cats;
  return (
    <PageShell
      kicker="Cluster 02 · Feline Elimination & Habitat Setup"
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

      <h2>Planned guides in this cluster (not yet published)</h2>
      <p>
        Planned guides cover automatic boxes, multi-cat households, odor control, and litter box
        furniture. Those pages are not published yet, so they are not linked from here. A new robot
        does not fix a cat that needs a veterinarian:
      </p>
      <ul>
        {plannedCatTopics.map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
      </ul>
    </PageShell>
  );
}
