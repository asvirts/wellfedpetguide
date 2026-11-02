import { PageShell } from "../../src/components/PageShell";
import { staticPages } from "../../src/site";

export default function DisclosurePage() {
  const page = staticPages.disclosure;
  return (
    <PageShell
      h1={page.h1}
      lede="WellFed Pet Guide is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com."
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Affiliate disclosure", path: page.path },
      ]}
    >
      <p>
        When you click a link to Amazon and buy something, Amazon may pay this site a commission.
        You do not pay a higher price because the link was used. Those links are marked in the
        article, open in a new tab, and use <code>rel=&quot;sponsored nofollow noopener&quot;</code>
        .
      </p>
      <p>
        A product card that says TODO is not a finished recommendation. It is a note for Andrew
        Virts to verify. The editorial standard is on the{" "}
        <a href="/editorial-policy/">how we choose</a> page. Affiliate income does not buy a
        placement, and this site does not invent test results to justify a link.
      </p>
      <p>
        Amazon’s own pages, prices, and formulas change. A link can go stale. The update date on an
        article is the date the writing was last reviewed, not a promise that every listing was
        rechecked that morning.
      </p>
    </PageShell>
  );
}
