import type { ReactNode } from "react";
import { AFFILIATE_REL } from "../amazon";

export function AffiliateLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="amazon-link" href={href} target="_blank" rel={AFFILIATE_REL}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
