import { parse as parseYaml } from "yaml";
import { countWords, renderMarkdown } from "./markdown";
import type { Article, ArticleCard, Category, Faq, ProductPick, Source } from "./types";

const files = import.meta.glob("../content/articles/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function asString(value: unknown, label: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${label} must be a non-empty string`);
  }
  return value.trim();
}

function asDate(value: unknown, label: string): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  const text = asString(value, label);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) throw new Error(`${label} must be YYYY-MM-DD`);
  return text;
}

function asStringList(value: unknown, label: string): string[] {
  if (
    !Array.isArray(value) ||
    value.length === 0 ||
    value.some((item) => typeof item !== "string" || item.trim() === "")
  ) {
    throw new Error(`${label} must be a non-empty list of strings`);
  }
  return value.map((item) => item.trim());
}

function asCategory(value: unknown): Category {
  if (value === "dogs" || value === "cats") return value;
  throw new Error('category must be "dogs" or "cats"');
}

function asProducts(value: unknown, slug: string): ProductPick[] {
  if (!Array.isArray(value) || value.length < 3) {
    throw new Error(`${slug}: products needs at least 3 entries`);
  }
  return value.map((item, index) => {
    if (!item || typeof item !== "object") throw new Error(`${slug}: product ${index} is invalid`);
    const record = item as Record<string, unknown>;
    const asin = record.asin;
    return {
      name: asString(record.name, `${slug} product ${index} name`),
      kind: asString(record.kind, `${slug} product ${index} kind`),
      bestFor: asString(record.bestFor, `${slug} product ${index} bestFor`),
      watchout: asString(record.watchout, `${slug} product ${index} watchout`),
      note: asString(record.note, `${slug} product ${index} note`),
      ...(typeof asin === "string" && asin.trim() ? { asin: asin.trim() } : {}),
    };
  });
}

function asFaqs(value: unknown, slug: string): Faq[] {
  if (!Array.isArray(value) || value.length < 3)
    throw new Error(`${slug}: faqs needs at least 3 entries`);
  return value.map((item, index) => {
    if (!item || typeof item !== "object") throw new Error(`${slug}: faq ${index} is invalid`);
    const record = item as Record<string, unknown>;
    return {
      question: asString(record.question, `${slug} faq ${index} question`),
      answer: asString(record.answer, `${slug} faq ${index} answer`),
    };
  });
}

function asSources(value: unknown, slug: string): Source[] {
  if (!Array.isArray(value) || value.length < 3)
    throw new Error(`${slug}: sources needs at least 3 entries`);
  return value.map((item, index) => {
    if (!item || typeof item !== "object") throw new Error(`${slug}: source ${index} is invalid`);
    const record = item as Record<string, unknown>;
    const url = asString(record.url, `${slug} source ${index} url`);
    if (!url.startsWith("https://")) throw new Error(`${slug}: source URL must be https`);
    return {
      title: asString(record.title, `${slug} source ${index} title`),
      url,
      publisher: asString(record.publisher, `${slug} source ${index} publisher`),
    };
  });
}

function splitFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) throw new Error("Article is missing frontmatter");
  const data = parseYaml(match[1]);
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Article frontmatter must be a mapping");
  }
  return { data: data as Record<string, unknown>, content: raw.slice(match[0].length) };
}

function loadArticles(): Article[] {
  const drafts: Array<Omit<Article, "related"> & { relatedSlugs: string[] }> = [];
  for (const [path, raw] of Object.entries(files)) {
    if (typeof raw !== "string") throw new Error(`Expected raw markdown for ${path}`);
    const slug = path.split("/").pop()?.replace(/\.md$/, "");
    if (!slug) throw new Error(`Could not read slug from ${path}`);
    const parsed = splitFrontmatter(raw);
    const data = parsed.data;
    const body = parsed.content.trim();
    const rendered = renderMarkdown(body);
    const wordCount = countWords(body);
    const readingMinutes = Math.max(5, Math.round(wordCount / 220));
    const sources = asSources(data.sources, slug);
    const kind = data.kind === "roundup" || data.kind === "guide" ? data.kind : null;
    if (!kind) throw new Error(`${slug}: kind must be guide or roundup`);
    drafts.push({
      slug,
      title: asString(data.title, `${slug} title`),
      seoTitle: asString(data.seoTitle, `${slug} seoTitle`),
      description: asString(data.description, `${slug} description`),
      summary: asString(data.summary, `${slug} summary`),
      category: asCategory(data.category),
      kind,
      published: asDate(data.published, `${slug} published`),
      updated: asDate(data.updated, `${slug} updated`),
      primaryKeyword: asString(data.primaryKeyword, `${slug} primaryKeyword`),
      heroAlt: asString(data.heroAlt, `${slug} heroAlt`),
      detailAlt: asString(data.detailAlt, `${slug} detailAlt`),
      takeaways: asStringList(data.takeaways, `${slug} takeaways`),
      products: asProducts(data.products, slug),
      faqs: asFaqs(data.faqs, slug),
      sources,
      relatedSlugs: asStringList(data.related, `${slug} related`),
      headings: rendered.headings,
      html: rendered.html,
      wordCount,
      readingMinutes,
      sourceCount: sources.length,
    });
  }
  const cards = new Map<string, ArticleCard>();
  for (const draft of drafts) {
    cards.set(draft.slug, {
      slug: draft.slug,
      title: draft.title,
      seoTitle: draft.seoTitle,
      description: draft.description,
      summary: draft.summary,
      category: draft.category,
      kind: draft.kind,
      published: draft.published,
      updated: draft.updated,
      primaryKeyword: draft.primaryKeyword,
      wordCount: draft.wordCount,
      readingMinutes: draft.readingMinutes,
      sourceCount: draft.sourceCount,
    });
  }
  return drafts
    .map((draft) => {
      const related = draft.relatedSlugs.map((relatedSlug) => {
        const card = cards.get(relatedSlug);
        if (!card)
          throw new Error(`${draft.slug} links to missing related article "${relatedSlug}"`);
        return card;
      });
      const { relatedSlugs: _relatedSlugs, ...article } = draft;
      return { ...article, related };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

export const articles: Article[] = loadArticles();

const bySlug = new Map(articles.map((article) => [article.slug, article]));

export function getArticle(slug: string): Article | undefined {
  return bySlug.get(slug);
}

export function articlesIn(category: Category): ArticleCard[] {
  return articles
    .filter((article) => article.category === category)
    .map(toCard)
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function allCards(): ArticleCard[] {
  return articles
    .map(toCard)
    .sort((a, b) => b.updated.localeCompare(a.updated) || a.title.localeCompare(b.title));
}

function toCard(article: Article): ArticleCard {
  return {
    slug: article.slug,
    title: article.title,
    seoTitle: article.seoTitle,
    description: article.description,
    summary: article.summary,
    category: article.category,
    kind: article.kind,
    published: article.published,
    updated: article.updated,
    primaryKeyword: article.primaryKeyword,
    wordCount: article.wordCount,
    readingMinutes: article.readingMinutes,
    sourceCount: article.sourceCount,
  };
}
