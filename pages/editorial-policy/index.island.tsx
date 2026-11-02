import { PageShell } from "../../src/components/PageShell";
import { staticPages } from "../../src/site";

export default function EditorialPage() {
  const page = staticPages.editorial;
  return (
    <PageShell
      h1={page.h1}
      lede="The point of this site is to rank for real owner questions and still be something a careful person can read. These are the rules for the drafts."
      crumbs={[
        { name: "Home", path: "/" },
        { name: "How we choose", path: page.path },
      ]}
    >
      <h2>Topics</h2>
      <p>
        Articles start from searches owners actually type: diarrhea, a dog that will not eat, brands
        to avoid, and litter box misses. Keyword volumes come from a Google Ads Keyword Planner
        export kept with the project. A high-volume phrase does not get a page unless the page can
        answer it without inventing a test.
      </p>
      <h2>Sources</h2>
      <p>
        Medical and nutrition claims are tied to public pages from veterinary schools, the AVMA,
        AAFCO, the FDA, WSAVA, AAHA, or the Merck Veterinary Manual. If a sentence cannot be
        anchored to one of those, it stays out or it is labeled as general owner experience rather
        than a finding.
      </p>
      <h2>Products</h2>
      <p>
        Product names in the first drafts are placeholders. They are examples of a category, such as
        a veterinary gastrointestinal diet or an unscented litter, and each card says TODO. Andrew
        Virts verifies the current formula, the seller, and the Amazon listing before a link is
        treated as final. The site does not publish star ratings, “we tested” scores, or review
        schema.
      </p>
      <p>A product note has to answer three questions:</p>
      <ul>
        <li>What job is it for?</li>
        <li>What should the buyer check on the label or with a veterinarian?</li>
        <li>Is the link an affiliate link, and is that obvious on the page?</li>
      </ul>
      <h2>Affiliate links</h2>
      <p>
        Amazon links use <code>rel=&quot;sponsored nofollow noopener&quot;</code> and open in a new
        tab. The Associates tag is one environment value, <code>AMAZON_TAG</code>. Until it is set,
        links are ordinary Amazon searches with no tag. Placement is not sold to brands.
      </p>
      <h2>Corrections</h2>
      <p>
        A wrong citation, a moved source, or a product that changed formula should be fixed and the
        visible update date changed. Use the <a href="/contact/">contact page</a>.
      </p>
    </PageShell>
  );
}
