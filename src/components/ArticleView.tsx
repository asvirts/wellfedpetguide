import { formatDate } from "../dates";
import type { Crumb } from "../seo";
import { author } from "../site";
import type { Article } from "../types";
import { Breadcrumbs } from "./Breadcrumbs";
import { FaqList } from "./FaqList";
import { Picture } from "./Picture";
import { ProductBlock } from "./ProductBlock";

export function ArticleView({ article, amazonTag }: { article: Article; amazonTag: string }) {
  const sectionPath = article.category === "dogs" ? "/dogs/" : "/cats/";
  const sectionName = article.category === "dogs" ? "Dogs" : "Cats";
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: sectionName, path: sectionPath },
    { name: article.title, path: `/${article.slug}/` },
  ];
  const toc = [
    { id: "takeaways", text: "Key takeaways", depth: 2 },
    ...article.headings.map((heading) => ({
      id: heading.id,
      text: heading.text,
      depth: heading.depth,
    })),
    { id: "products", text: "Products to verify", depth: 2 },
    { id: "faq", text: "Questions owners ask", depth: 2 },
    { id: "sources", text: "Sources", depth: 2 },
    { id: "related", text: "Related guides", depth: 2 },
  ];

  return (
    <article className="article wrap">
      <Breadcrumbs crumbs={crumbs} />
      <aside className="disclosure" aria-label="Affiliate disclosure">
        <p>
          <strong>Affiliate disclosure.</strong> WellFed Pet Guide participates in the Amazon
          Associates Program. Links to Amazon are affiliate links. If you buy through them, we may
          earn a fee. That does not change your price.{" "}
          <a href="/affiliate-disclosure/">Full disclosure</a>.
        </p>
      </aside>
      <p className="vet-note">
        <strong>Not veterinary advice.</strong> This is general reading for pet owners. It does not
        diagnose your animal or replace a veterinarian.
      </p>
      <header className="article-header">
        <p className="kicker">
          <a href={sectionPath}>{sectionName}</a>
          <span aria-hidden="true"> · </span>
          {article.kind === "roundup" ? "Roundup notes" : "Problem guide"}
        </p>
        <h1>{article.title}</h1>
        <p className="byline">
          By <a href={author.path}>{author.name}</a>
          <span aria-hidden="true"> · </span>
          <time dateTime={article.updated}>Updated {formatDate(article.updated)}</time>
        </p>
        <p className="summary">{article.summary}</p>
      </header>
      <Picture
        className="hero-media"
        name={`${article.slug}-hero`}
        alt={article.heroAlt}
        width={1200}
        height={675}
        priority
      />
      <section className="takeaways" aria-labelledby="takeaways">
        <h2 id="takeaways">Key takeaways</h2>
        <ul>
          {article.takeaways.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <nav className="toc" aria-label="Table of contents">
        <p>On this page</p>
        <ol>
          {toc.map((item) => (
            <li key={item.id} className={item.depth === 3 ? "toc-sub" : undefined}>
              <a href={`#${item.id}`}>{item.text}</a>
            </li>
          ))}
        </ol>
      </nav>
      <div className="prose" dangerouslySetInnerHTML={{ __html: article.html }} />
      <Picture
        className="detail-media"
        name={`${article.slug}-detail`}
        alt={article.detailAlt}
        width={1200}
        height={800}
      />
      <ProductBlock products={article.products} amazonTag={amazonTag} />
      <FaqList faqs={article.faqs} />
      <section className="sources" aria-labelledby="sources">
        <h2 id="sources">Sources</h2>
        <p>
          These are the public documents this guide leans on. They are not a substitute for your own
          clinic.
        </p>
        <ul>
          {article.sources.map((source) => (
            <li key={source.url}>
              <a href={source.url} rel="noopener noreferrer">
                {source.title}
              </a>
              <span> — {source.publisher}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="related" aria-labelledby="related">
        <h2 id="related">Related guides</h2>
        <ul className="guide-list">
          {article.related.map((item) => (
            <li key={item.slug}>
              <a href={`/${item.slug}/`}>
                <span className="kicker">{item.category === "dogs" ? "Dogs" : "Cats"}</span>
                <span className="guide-title">{item.title}</span>
                <span className="guide-summary">{item.summary}</span>
              </a>
            </li>
          ))}
          <li>
            <a href={sectionPath}>
              <span className="kicker">More</span>
              <span className="guide-title">All {sectionName.toLowerCase()} guides</span>
              <span className="guide-summary">
                The hub page for this topic cluster, including what is still planned.
              </span>
            </a>
          </li>
        </ul>
      </section>
    </article>
  );
}
