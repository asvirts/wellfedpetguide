export type Category = "dogs" | "cats";
export type ArticleKind = "guide" | "roundup";

export type ProductPick = {
  name: string;
  kind: string;
  bestFor: string;
  watchout: string;
  note: string;
  asin?: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type Source = {
  title: string;
  url: string;
  publisher: string;
};

export type Heading = {
  depth: 2 | 3;
  id: string;
  text: string;
};

export type ArticleCard = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  summary: string;
  category: Category;
  kind: ArticleKind;
  published: string;
  updated: string;
  primaryKeyword: string;
  wordCount: number;
  readingMinutes: number;
  sourceCount: number;
};

export type Article = ArticleCard & {
  heroAlt: string;
  detailAlt: string;
  takeaways: string[];
  products: ProductPick[];
  faqs: Faq[];
  sources: Source[];
  related: ArticleCard[];
  headings: Heading[];
  html: string;
};
