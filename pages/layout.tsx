import type { ReactNode } from "react";
import { SiteFooter } from "../src/components/SiteFooter";
import { SiteHeader } from "../src/components/SiteHeader";
import "../src/styles.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <div className="site-bar">
        <p className="wrap-wide">
          Some links to Amazon are affiliate links. We may earn a fee, which does not change your
          price. This site is not veterinary advice. <a href="/affiliate-disclosure/">Disclosure</a>
        </p>
      </div>
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );
}
