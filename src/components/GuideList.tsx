import { formatDate } from "../dates";
import type { ArticleCard } from "../types";

export function GuideList({ articles }: { articles: ArticleCard[] }) {
  if (articles.length === 0) {
    return <p>No guides in this section yet.</p>;
  }
  return (
    <ul className="guide-list">
      {articles.map((article) => (
        <li key={article.slug}>
          <a href={`/${article.slug}/`}>
            <span className="kicker">
              {article.category === "dogs" ? "Dogs" : "Cats"}
              <span aria-hidden="true"> · </span>
              <time dateTime={article.updated}>Updated {formatDate(article.updated)}</time>
            </span>
            <span className="guide-title">{article.title}</span>
            <span className="guide-summary">{article.summary}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
