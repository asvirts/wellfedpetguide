import { formatDate } from "../dates";
import type { ArticleCard } from "../types";

export function GuideList({ articles }: { articles: ArticleCard[] }) {
  if (articles.length === 0) {
    return <p className="empty-state">No guides in this section yet.</p>;
  }
  return (
    <ul className="guide-list">
      {articles.map((article, index) => {
        const num = String(index + 1).padStart(2, "0");
        const isDog = article.category === "dogs";
        return (
          <li key={article.slug} className="guide-item">
            <a href={`/${article.slug}/`} className="guide-card-link">
              <div className="guide-card-meta">
                <span className="guide-index" aria-hidden="true">
                  No. {num}
                </span>
                <span className={`category-pill ${isDog ? "pill-dogs" : "pill-cats"}`}>
                  {isDog ? "Dogs" : "Cats"}
                </span>
                <span className="kind-pill">
                  {article.kind === "roundup" ? "Label Audit" : "Problem Guide"}
                </span>
                <span className="guide-date">
                  <time dateTime={article.updated}>Updated {formatDate(article.updated)}</time>
                </span>
              </div>

              <span className="guide-title">{article.title}</span>
              <span className="guide-summary">{article.summary}</span>

              <div className="guide-card-footer">
                <span className="guide-stats">
                  {article.readingMinutes ? `${article.readingMinutes} min read` : "In-depth guide"}
                  {article.sourceCount ? ` · ${article.sourceCount} primary sources` : ""}
                </span>
                <span className="guide-cta" aria-hidden="true">
                  Read monograph →
                </span>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
