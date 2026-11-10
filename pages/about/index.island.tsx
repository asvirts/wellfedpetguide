import { PageShell } from "../../src/components/PageShell";
import { author, staticPages } from "../../src/site";

export default function AboutPage() {
  const page = staticPages.about;
  return (
    <PageShell
      h1={page.h1}
      lede="WellFed Pet Guide is a reading desk for two expensive, confusing corners of pet care: what to feed a dog when the usual food is not working, and why a cat has stopped using the box."
      crumbs={[
        { name: "Home", path: "/" },
        { name: "About", path: page.path },
      ]}
    >
      <h2>Who edits it</h2>
      <p>
        <a href={author.path}>{author.name}</a> edits the site. {author.bio}
      </p>
      <h2>What the site will cover</h2>
      <p>
        Published guides cover diarrhea, a dog that will not eat, brands to treat carefully, picky
        eaters, sensitive stomachs, food allergies, and cats that eliminate outside the box. Later
        articles will be roundups for puppies, seniors, raw and freeze-dried foods, and litter boxes
        chosen for odor, multiple cats, or furniture.
      </p>
      <h2>What it is not</h2>
      <p>
        It is not a clinic, a food trial, or a recall tracker that updates itself. It does not
        invent test scores. When a product is named, the page says it still needs to be verified.
        The business model is Amazon affiliate links, disclosed on every page. The{" "}
        <a href="/editorial-policy/">editorial policy</a> explains the rules.
      </p>
    </PageShell>
  );
}
