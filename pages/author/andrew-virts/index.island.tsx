import { GuideList } from "../../../src/components/GuideList";
import { PageShell } from "../../../src/components/PageShell";
import { author, CONTACT_EMAIL } from "../../../src/site";
import type { ArticleCard } from "../../../src/types";

export default function AuthorPage({ articles }: { articles: ArticleCard[] }) {
  return (
    <PageShell
      h1={author.name}
      lede={author.role}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "About", path: "/about/" },
        { name: author.name, path: author.path },
      ]}
    >
      <p>{author.bio}</p>
      <p>
        Edit the bio in <code>src/site.ts</code>. That file is the only place the byline text is
        stored. Corrections and product checks can be sent to{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
      <h2>Guides with this byline</h2>
      <GuideList articles={articles} />
    </PageShell>
  );
}
