import { PageShell } from "../src/components/PageShell";
import { staticPages } from "../src/site";

export default function NotFoundPage() {
  const page = staticPages.notFound;
  return (
    <PageShell h1={page.h1} lede={page.description}>
      <ul>
        <li>
          <a href="/guides/">All guides</a>
        </li>
        <li>
          <a href="/dogs/">Dog food guides</a>
        </li>
        <li>
          <a href="/cats/">Cat litter box guides</a>
        </li>
      </ul>
    </PageShell>
  );
}
