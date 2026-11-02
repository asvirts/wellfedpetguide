import { GuideList } from "../../src/components/GuideList";
import { PageShell } from "../../src/components/PageShell";
import { staticPages } from "../../src/site";
import type { ArticleCard } from "../../src/types";

export default function DogsPage({ articles }: { articles: ArticleCard[] }) {
  const page = staticPages.dogs;
  return (
    <PageShell
      h1={page.h1}
      lede="This cluster is about what goes in the bowl when something is already wrong: loose stool, a dog that will not eat, and foods that do not clear a basic label check."
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
        first day or two. The <a href="/dog-not-eating/">dog not eating</a> guide covers appetite.
        If the bag itself is the question, use{" "}
        <a href="/dog-food-brands-to-avoid/">dog food brands to avoid</a> before you chase a new
        marketing claim.
      </p>
      <p>
        Later guides in this cluster will cover picky eaters, sensitive stomachs, allergies,
        puppies, seniors, raw and freeze-dried foods, and grain-free diets. They are listed in the
        content plan and are not linked until the drafts exist, so this hub does not send you to an
        empty URL.
      </p>
      <p>
        None of these pages replace a clinic. Blood in the stool, repeated vomiting, a puppy, or a
        dog that is weak belongs on the phone with a veterinarian, not in a shopping tab.
      </p>
    </PageShell>
  );
}
