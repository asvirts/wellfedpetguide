import { ArticleView } from "../src/components/ArticleView";
import type { Article } from "../src/types";

export default function ArticlePage({
  article,
  amazonTag,
}: {
  article: Article;
  amazonTag: string;
}) {
  return <ArticleView article={article} amazonTag={amazonTag} />;
}
