import { formatDate } from "../dates";
import type { Crumb } from "../seo";
import { author, CONTACT_EMAIL } from "../site";
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
    <article className="article wrap-wide">
      <div className="article-top-shell">
        <Breadcrumbs crumbs={crumbs} />

        <div className="notice-grid">
          <p className="vet-note">
            <strong>Not veterinary advice.</strong> This is general reading for pet owners. It does
            not diagnose your animal or replace a veterinarian.
          </p>
          <aside className="disclosure" aria-label="Affiliate disclosure">
            <p>
              <strong>Affiliate disclosure.</strong> WellFed Pet Guide participates in the Amazon
              Associates Program. Links to Amazon are affiliate links. If you buy through them, we
              may earn a fee. That does not change your price.{" "}
              <a href="/affiliate-disclosure/">Full disclosure</a>.
            </p>
          </aside>
        </div>

        <header className="article-header">
          <div className="article-badges">
            <a
              className={`category-pill ${article.category === "dogs" ? "pill-dogs" : "pill-cats"}`}
              href={sectionPath}
            >
              {sectionName}
            </a>
            <span className="kind-pill">
              {article.kind === "roundup" ? "Roundup notes" : "Problem guide"}
            </span>
            <span className="monograph-ref">
              {article.readingMinutes} min read · {article.wordCount.toLocaleString()} words ·{" "}
              {article.sources.length} cited sources
            </span>
          </div>

          <h1>{article.title}</h1>
          <p className="summary">{article.summary}</p>

          <div className="byline-bar">
            <div className="byline-avatar" aria-hidden="true">
              AV
            </div>
            <div className="byline-details">
              <p className="byline">
                By <a href={author.path}>{author.name}</a>{" "}
                <span className="byline-role">({author.role})</span>
                <span aria-hidden="true"> · </span>
                <time dateTime={article.updated}>Updated {formatDate(article.updated)}</time>
              </p>
              <p className="byline-sub">
                Anchored to public veterinary school &amp; regulatory sources ·{" "}
                <a href="/editorial-policy/">Editorial policy</a>
              </p>
            </div>
          </div>
        </header>

        <figure className="media-frame hero-frame">
          <Picture
            className="hero-media"
            name={`${article.slug}-hero`}
            alt={article.heroAlt}
            width={1200}
            height={675}
            priority
          />
          <figcaption className="media-caption">
            <span>Plate I — {article.heroAlt}</span>
            <span>WellFed Pet Guide Monograph</span>
          </figcaption>
        </figure>
      </div>

      <div className="article-grid">
        <aside className="article-rail">
          <div className="rail-sticky">
            <nav className="toc" aria-label="Table of contents">
              <p className="toc-title">On this page</p>
              <ol>
                {toc.map((item) => (
                  <li key={item.id} className={item.depth === 3 ? "toc-sub" : undefined}>
                    <a href={`#${item.id}`}>{item.text}</a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="rail-card">
              <p className="rail-card-kicker">Editorial Standard</p>
              <p className="rail-card-body">
                No star scores or invented clinic trials. Every clinical statement is tied to the{" "}
                <a href="#sources">{article.sources.length} primary sources</a> listed at the foot
                of this guide.
              </p>
            </div>
          </div>
        </aside>

        <div className="article-main">
          <section className="takeaways" aria-labelledby="takeaways">
            <div className="takeaways-head">
              <p className="kicker">Executive Summary</p>
              <h2 id="takeaways">Key takeaways</h2>
            </div>
            <ul className="takeaways-list">
              {article.takeaways.map((item, idx) => (
                <li key={item}>
                  <span className="takeaway-num" aria-hidden="true">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="prose" dangerouslySetInnerHTML={{ __html: article.html }} />

          <figure className="media-frame detail-frame">
            <Picture
              className="detail-media"
              name={`${article.slug}-detail`}
              alt={article.detailAlt}
              width={1200}
              height={800}
            />
            <figcaption className="media-caption">
              <span>Plate II — {article.detailAlt}</span>
              <span>3-Stage Protocol Summary</span>
            </figcaption>
          </figure>

          <ProductBlock products={article.products} amazonTag={amazonTag} />
          <FaqList faqs={article.faqs} />

          <section className="sources" aria-labelledby="sources">
            <div className="section-head">
              <p className="kicker">Primary Bibliography</p>
              <h2 id="sources">Sources</h2>
              <p className="section-intro">
                These are the public veterinary, regulatory, and university documents this guide
                leans on. They are not a substitute for your own clinic.
              </p>
            </div>
            <ol className="sources-list">
              {article.sources.map((source, index) => (
                <li key={source.url} className="source-item">
                  <span className="source-num" aria-hidden="true">
                    [{index + 1}]
                  </span>
                  <div className="source-body">
                    <a href={source.url} rel="noopener noreferrer" className="source-link">
                      {source.title}
                    </a>
                    <span className="source-pub">{source.publisher}</span>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <aside className="author-box" aria-label="About the editor">
            <div className="author-box-avatar" aria-hidden="true">
              AV
            </div>
            <div>
              <p className="kicker">About the Editor</p>
              <p className="author-box-bio">{author.bio}</p>
              <p className="author-box-links">
                <a href={author.path}>More by {author.name}</a>
                <span aria-hidden="true"> · </span>
                <a href="/editorial-policy/">How we choose</a>
                <span aria-hidden="true"> · </span>
                <a href={`mailto:${CONTACT_EMAIL}`}>Report a correction</a>
              </p>
            </div>
          </aside>

          <section className="related" aria-labelledby="related">
            <div className="section-head">
              <p className="kicker">Continue Reading</p>
              <h2 id="related">Related guides</h2>
            </div>
            <ul className="guide-list">
              {article.related.map((item, idx) => (
                <li key={item.slug} className="guide-item">
                  <a href={`/${item.slug}/`} className="guide-card-link">
                    <div className="guide-card-meta">
                      <span className="guide-index" aria-hidden="true">
                        No. {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`category-pill ${item.category === "dogs" ? "pill-dogs" : "pill-cats"}`}
                      >
                        {item.category === "dogs" ? "Dogs" : "Cats"}
                      </span>
                    </div>
                    <span className="guide-title">{item.title}</span>
                    <span className="guide-summary">{item.summary}</span>
                  </a>
                </li>
              ))}
              <li className="guide-item">
                <a href={sectionPath} className="guide-card-link guide-card-hub">
                  <div className="guide-card-meta">
                    <span className="guide-index" aria-hidden="true">
                      Hub
                    </span>
                    <span className="kind-pill">Topic Cluster</span>
                  </div>
                  <span className="guide-title">All {sectionName.toLowerCase()} guides</span>
                  <span className="guide-summary">
                    The hub page for this topic cluster, including how the guides connect and what
                    is planned next.
                  </span>
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </article>
  );
}
