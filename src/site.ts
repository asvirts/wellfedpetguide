export const SITE_NAME = "WellFed Pet Guide";
export const SITE_URL = "https://wellfedpetguide.com";
export const SITE_UPDATED = "2026-11-02";
export const CONTACT_EMAIL = "hello@wellfedpetguide.com";

export const author = {
  name: "Andrew Virts",
  slug: "andrew-virts",
  path: "/author/andrew-virts/",
  role: "Editor",
  bio: "Andrew Virts edits WellFed Pet Guide. He is not a veterinarian, veterinary technician, or animal nutritionist, and he does not examine pets or prescribe food. He compiles plain-language guides from veterinary schools, regulators, and association publications, then marks every product mention for his own check before a buying link is treated as final.",
};

export function absoluteUrl(path: string): string {
  if (path === "/") return `${SITE_URL}/`;
  const withSlash = path.endsWith("/") ? path : `${path}/`;
  return `${SITE_URL}${withSlash.startsWith("/") ? withSlash : `/${withSlash}`}`;
}

export function documentTitle(seoTitle: string): string {
  return `${seoTitle} | ${SITE_NAME}`;
}

export const staticPages = {
  home: {
    path: "/",
    seoTitle: "Dog Food and Litter Box Guides",
    description:
      "Practical guides to dog food problems and cat litter boxes, sourced from veterinary schools and regulators. Product notes are marked for verification.",
    h1: "Guides for dog food problems and cat litter boxes",
  },
  guides: {
    path: "/guides/",
    seoTitle: "Dog Food and Cat Litter Guides",
    description:
      "Every WellFed Pet Guide article on dog food problems and cat litter boxes, with the last-updated date and a short summary for each guide.",
    h1: "All guides",
  },
  dogs: {
    path: "/dogs/",
    seoTitle: "Dog Food Guides",
    description:
      "Dog food guides for diarrhea, sensitive stomachs, picky eaters, and brands to check. Written for owners, with sources and unverified product notes.",
    h1: "Dog food guides",
  },
  cats: {
    path: "/cats/",
    seoTitle: "Cat Litter Box Guides",
    description:
      "Why cats poop or pee outside the litter box, and what to change in the box, the litter, and the household before you buy another gadget.",
    h1: "Cat litter box guides",
  },
  about: {
    path: "/about/",
    seoTitle: "About WellFed Pet Guide",
    description:
      "WellFed Pet Guide is Andrew Virts’s research desk for dog food problems and cat litter boxes. It is an affiliate site, not a veterinary practice.",
    h1: "About this guide",
  },
  editorial: {
    path: "/editorial-policy/",
    seoTitle: "How We Choose What to Publish",
    description:
      "How WellFed Pet Guide picks topics, uses veterinary sources, and handles Amazon affiliate links. Product names stay marked until Andrew verifies them.",
    h1: "How we choose",
  },
  disclosure: {
    path: "/affiliate-disclosure/",
    seoTitle: "Affiliate Disclosure",
    description:
      "WellFed Pet Guide participates in the Amazon Associates Program. Affiliate links are labeled, and a fee does not change the price you pay.",
    h1: "Affiliate disclosure",
  },
  privacy: {
    path: "/privacy/",
    seoTitle: "Privacy Policy",
    description:
      "What WellFed Pet Guide collects, how Amazon and Cloudflare may process a visit, and how to reach Andrew Virts about this site.",
    h1: "Privacy policy",
  },
  contact: {
    path: "/contact/",
    seoTitle: "Contact Andrew Virts",
    description:
      "Contact WellFed Pet Guide by email about corrections, product checks, and the site. This inbox does not provide veterinary advice.",
    h1: "Contact",
  },
  notFound: {
    path: "/404/",
    seoTitle: "Page not found",
    description:
      "That page is not on WellFed Pet Guide. Browse the dog food and cat litter box guides instead.",
    h1: "That page is not here",
  },
} as const;

export type StaticPageId = keyof typeof staticPages;
