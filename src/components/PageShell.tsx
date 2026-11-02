import type { ReactNode } from "react";
import type { Crumb } from "../seo";
import { Breadcrumbs } from "./Breadcrumbs";

export function PageShell({
  crumbs,
  kicker,
  h1,
  lede,
  children,
}: {
  crumbs?: Crumb[];
  kicker?: string;
  h1: string;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <div className="page wrap-wide">
      <div className="page-shell-card">
        <header className="page-shell-header">
          {crumbs ? <Breadcrumbs crumbs={crumbs} /> : null}
          <p className="kicker">{kicker ?? "WellFed Pet Guide · Reference Desk"}</p>
          <h1>{h1}</h1>
          {lede ? <p className="lede">{lede}</p> : null}
        </header>
        <div className="page-shell-body prose">{children}</div>
      </div>
    </div>
  );
}
