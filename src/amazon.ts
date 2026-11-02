const ASIN = /^[A-Z0-9]{10}$/;

export const AFFILIATE_REL = "sponsored nofollow noopener";

export function amazonUrl(product: { name: string; asin?: string }, tag: string): string {
  const asin = product.asin?.trim().toUpperCase();
  const url =
    asin && ASIN.test(asin)
      ? new URL(`https://www.amazon.com/dp/${asin}`)
      : new URL("https://www.amazon.com/s");
  if (!(asin && ASIN.test(asin))) url.searchParams.set("k", product.name);
  const cleanTag = tag.trim();
  if (cleanTag) url.searchParams.set("tag", cleanTag);
  return url.toString();
}

export function amazonLinkLabel(product: { asin?: string }): string {
  return product.asin ? "View on Amazon" : "Search Amazon (placeholder)";
}
