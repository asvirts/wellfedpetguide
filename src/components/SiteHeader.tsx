import { SITE_NAME } from "../site";

const links = [
  { href: "/guides/", label: "Guides" },
  { href: "/dogs/", label: "Dogs" },
  { href: "/cats/", label: "Cats" },
  { href: "/about/", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap-wide header-row">
        <a className="brand" href="/">
          <span className="mark" aria-hidden="true">
            W
          </span>
          <span>{SITE_NAME}</span>
        </a>
        <nav className="site-nav" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
