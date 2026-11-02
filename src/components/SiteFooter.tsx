import { CONTACT_EMAIL, SITE_NAME, author } from "../site";

const clusterLinks = [
  { href: "/guides/", label: "Complete Guide Index" },
  { href: "/dogs/", label: "Canine Digestion & Nutrition" },
  { href: "/cats/", label: "Feline Litter Box Architecture" },
  { href: "/dog-food-for-diarrhea/", label: "What to Feed a Dog With Diarrhea" },
  { href: "/dog-food-brands-to-avoid/", label: "Dog Food Brands to Avoid" },
  { href: "/cat-peeing-outside-litter-box/", label: "Cat Peeing Outside the Box" },
];

const policyLinks = [
  { href: "/editorial-policy/", label: "How We Choose & Cite" },
  { href: "/about/", label: "About This Research Desk" },
  { href: author.path, label: `Editor: ${author.name}` },
  { href: "/affiliate-disclosure/", label: "Affiliate Disclosure" },
  { href: "/privacy/", label: "Privacy Policy" },
  { href: "/contact/", label: "Corrections & Contact" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap-wide footer-top">
        <div className="footer-brand-col">
          <div className="footer-brand-head">
            <span className="mark mark-sm" aria-hidden="true">
              W
            </span>
            <p className="footer-name">{SITE_NAME}</p>
          </div>
          <p className="footer-desc">
            Plain-language monographs on dog food problems and cat litter box setup, anchored to
            veterinary colleges, AAFCO, AVMA, FDA, WSAVA, and the Merck Veterinary Manual.
          </p>
          <div className="footer-clinical-box">
            <p>
              <strong>Medical Emergency Reminder:</strong> Never delay a clinic visit for a puppy, a
              male cat straining in the litter box, blood in stool or urine, or repeated vomiting.
            </p>
          </div>
        </div>

        <nav className="footer-nav-col" aria-label="Topic clusters and guides">
          <p className="footer-col-title">Clusters &amp; Field Guides</p>
          <ul>
            {clusterLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer-nav-col" aria-label="About and policies">
          <p className="footer-col-title">Standards &amp; Colophon</p>
          <ul>
            {policyLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="wrap-wide footer-bottom">
        <p className="footer-meta">
          <span>© 2026 {SITE_NAME}</span>
          <span aria-hidden="true">·</span>
          <span>
            Edited by <a href={author.path}>{author.name}</a>
          </span>
          <span aria-hidden="true">·</span>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
        <p className="footer-feeds">
          <a href="/feed.xml">RSS Feed</a>
          <span aria-hidden="true">·</span>
          <a href="/sitemap.xml">XML Sitemap</a>
        </p>
      </div>
    </footer>
  );
}
