import type { ReactNode } from "react";
import { SiteFooter } from "../src/components/SiteFooter";
import { SiteHeader } from "../src/components/SiteHeader";
import "../src/styles.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="site-frame">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="site-bar" role="region" aria-label="Site notices">
        <div className="wrap-wide site-bar-inner">
          <p className="site-bar-vet">
            <span className="notice-pill">Clinical Notice</span>
            <span>
              General owner reference compiled from veterinary &amp; regulatory sources — not
              veterinary advice.
            </span>
          </p>
          <p className="site-bar-aff">
            <span>
              Amazon links may earn an affiliate commission at no extra cost to you.{" "}
              <a href="/affiliate-disclosure/">Disclosure</a>
            </span>
          </p>
        </div>
      </div>
      <SiteHeader />
      <main id="main" className="site-main">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
