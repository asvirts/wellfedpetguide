import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { AFFILIATE_REL, amazonUrl } from "./amazon";
import { AffiliateLink } from "./components/AffiliateLink";
import { articles } from "./content";
import { documentTitle, staticPages } from "./site";
import { articleSchema, faqSchema, itemListSchema } from "./seo";

describe("articles", () => {
  it("publishes the six guides", () => {
    expect(articles.map((article) => article.slug).sort()).toEqual([
      "cat-peeing-outside-litter-box",
      "cat-pooping-outside-litter-box",
      "dog-food-brands-to-avoid",
      "dog-food-for-diarrhea",
      "dog-food-for-picky-eaters",
      "dog-not-eating",
    ]);
  });

  it("keeps titles, descriptions, keywords, and length inside the SEO limits", () => {
    for (const article of articles) {
      expect(documentTitle(article.seoTitle).length).toBeLessThanOrEqual(60);
      expect(article.description.length).toBeLessThanOrEqual(155);
      expect(article.description.length).toBeGreaterThan(50);
      expect(article.title.toLowerCase()).toContain(article.primaryKeyword.toLowerCase());
      expect(article.wordCount).toBeGreaterThanOrEqual(1500);
      expect(article.html).not.toMatch(/<h1[\s>]/);
      expect(article.sources.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("links related guides to real articles and keeps affiliate schema free of ratings", () => {
    const slugs = new Set(articles.map((article) => article.slug));
    for (const article of articles) {
      for (const related of article.related) expect(slugs.has(related.slug)).toBe(true);
      const schema = JSON.stringify([
        articleSchema(article),
        faqSchema(article.faqs),
        ...(article.kind === "roundup" ? [itemListSchema(article)] : []),
      ]);
      expect(schema).not.toMatch(/aggregateRating|reviewCount|ratingValue/i);
      expect(schema).toContain("datePublished");
      expect(schema).toContain("dateModified");
      expect(schema).toContain("Andrew Virts");
      if (article.kind === "roundup") expect(schema).toContain("ItemList");
      else expect(schema).not.toContain("ItemList");
    }
  });
});

describe("static pages", () => {
  it("keeps document titles and descriptions short", () => {
    for (const page of Object.values(staticPages)) {
      if (page.path === "/404/") continue;
      expect(documentTitle(page.seoTitle).length).toBeLessThanOrEqual(60);
      expect(page.description.length).toBeLessThanOrEqual(155);
    }
  });
});

describe("amazon links", () => {
  it("adds the tag only when configured and marks the anchor as sponsored", () => {
    expect(amazonUrl({ name: "Example Food" }, "")).toBe("https://www.amazon.com/s?k=Example+Food");
    expect(amazonUrl({ name: "Example Food", asin: "B00TEST123" }, "wellfed-20")).toBe(
      "https://www.amazon.com/dp/B00TEST123?tag=wellfed-20",
    );
    const html = renderToStaticMarkup(
      <AffiliateLink href="https://www.amazon.com/s?k=Example">Search Amazon</AffiliateLink>,
    );
    expect(html).toContain(`rel="${AFFILIATE_REL}"`);
    expect(html).toContain('target="_blank"');
    expect(html).toContain("opens in a new tab");
  });
});
