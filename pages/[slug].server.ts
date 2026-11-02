import { defineHandler, defineHead } from "void";
import { env } from "void/env";
import { articles, getArticle } from "../src/content";
import { articleHead } from "../src/seo";
import type { Article } from "../src/types";

type Props = { article: Article; amazonTag: string };

export function getPrerenderPaths() {
  return articles.map((article) => ({ slug: article.slug }));
}

export const loader = defineHandler((c) => {
  const article = getArticle(c.req.param("slug") ?? "");
  if (!article) return new Response("Not found", { status: 404 });
  return { article, amazonTag: env.AMAZON_TAG };
});

export const head = defineHead<Props>((_c, props) => {
  if (!props.article) {
    return { title: "Page not found", meta: [{ name: "robots", content: "noindex" }] };
  }
  return articleHead(props.article);
});
