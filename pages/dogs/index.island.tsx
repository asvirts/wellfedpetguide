import { GuideList } from "../../src/components/GuideList";
import { PageShell } from "../../src/components/PageShell";
import { staticPages } from "../../src/site";
import type { ArticleCard } from "../../src/types";

const plannedDogTopics = [
  "Puppy Food for Sensitive Stomachs",
  "Best Puppy Food for Large Breeds (Calcium & growth curve rules)",
  "Best Senior Dog Food",
  "Grain-Free vs. Grain-Inclusive Dog Food (FDA DCM background)",
  "Raw Diet for Dogs: A Beginner's Guide (AVMA pathogen policy)",
  "Best Freeze-Dried Raw Dog Food",
];

export default function DogsPage({ articles }: { articles: ArticleCard[] }) {
  const page = staticPages.dogs;
  return (
    <PageShell
      kicker="Cluster 01 · Canine Digestion & Label Audits"
      h1={page.h1}
      lede="This cluster is about what goes in the bowl when something is already wrong, and when a healthy dog will only negotiate dinner: loose stool, a repeating sensitive stomach, itch that might be a food allergy, a skipped meal, a choosy eater, and foods that do not clear a basic label check."
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Dogs", path: page.path },
      ]}
    >
      <h2>What is published</h2>
      <GuideList articles={articles} />

      <h2>How the cluster fits together</h2>
      <p>
        A short bout of diarrhea and a dog that skips meals are often the same story told from two
        ends. The <a href="/dog-food-for-diarrhea/">food for dogs with diarrhea</a> guide covers the
        first day or two. The <a href="/dog-not-eating/">dog not eating</a> guide covers appetite. A
        healthy dog who has always been choosy belongs in{" "}
        <a href="/dog-food-for-picky-eaters/">dog food for picky eaters</a>. A bright adult whose
        soft stool or gas keeps returning belongs in{" "}
        <a href="/dog-food-for-sensitive-stomach/">best dog food for sensitive stomachs</a>. When
        that pattern includes diarrhea you are shopping for, use{" "}
        <a href="/dog-food-sensitive-stomach-diarrhea/">
          best dog food for sensitive stomach and diarrhea
        </a>
        . Itch, ear infections, or a suspected food allergy belong in{" "}
        <a href="/dog-food-for-allergies/">best dog food for allergies</a>. If the bag itself is the
        question, use <a href="/dog-food-brands-to-avoid/">dog food brands to avoid</a> before you
        chase a new marketing claim.
      </p>
      <p>
        None of these pages replace a clinic. Blood in the stool, repeated vomiting, a puppy, or a
        dog that is weak belongs on the phone with a veterinarian, not in a shopping tab.
      </p>

      <h2>Planned guides in this cluster (not yet published)</h2>
      <p>
        Later guides in this cluster will cover puppies, seniors, raw and freeze-dried foods, and
        grain-free diets. They are listed in the content plan and are not linked until the drafts
        exist, so this hub does not send you to an empty URL:
      </p>
      <ul>
        {plannedDogTopics.map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
      </ul>
    </PageShell>
  );
}
