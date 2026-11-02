import { CONTACT_EMAIL, SITE_NAME, author } from "../site";

const links = [
  { href: "/editorial-policy/", label: "How we choose" },
  { href: "/affiliate-disclosure/", label: "Affiliate disclosure" },
  { href: "/privacy/", label: "Privacy" },
  { href: "/contact/", label: "Contact" },
  { href: author.path, label: author.name },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap-wide footer-grid">
        <div>
          <p className="footer-name">{SITE_NAME}</p>
          <p>
            Research notes for dog food problems and cat litter boxes. Not a veterinary practice.
            Some links are Amazon affiliate links.
          </p>
        </div>
        <nav aria-label="About the site">
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="footer-meta">
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <span>© 2026 {SITE_NAME}</span>
        </p>
      </div>
    </footer>
  );
}
