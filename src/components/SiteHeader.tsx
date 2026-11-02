import { SITE_NAME } from "../site";

const links = [
  { href: "/guides/", label: "All Guides", code: "01" },
  { href: "/dogs/", label: "Dogs", code: "02" },
  { href: "/cats/", label: "Cats", code: "03" },
  { href: "/editorial-policy/", label: "Methodology", code: "04" },
  { href: "/about/", label: "About", code: "05" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap-wide header-row">
        <a className="brand" href="/">
          <span className="mark" aria-hidden="true">
            <svg viewBox="0 0 36 36" width="24" height="24" fill="none">
              <circle cx="18" cy="7.5" r="2" fill="#d8b268" />
              <path
                fill="#f6f2e8"
                d="M5.5 11h4.8l3.2 12.5L17 11h2l3.5 12.5L25.7 11h4.8l-5 16.5h-4.6L18 16.2 15.1 27.5h-4.6L5.5 11Z"
              />
            </svg>
          </span>
          <span className="brand-text">
            <span className="brand-name">{SITE_NAME}</span>
            <span className="brand-sub">Canine Diet &amp; Feline Habitat Desk</span>
          </span>
        </a>
        <nav className="site-nav" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              <span className="nav-code" aria-hidden="true">
                {link.code}
              </span>
              <span>{link.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
