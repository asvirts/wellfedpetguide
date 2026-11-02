import type { ReactNode } from "react";
import type { Crumb } from "../seo";
import { Breadcrumbs } from "./Breadcrumbs";

export function PageShell({
  crumbs,
  h1,
  lede,
  children,
}: {
  crumbs?: Crumb[];
  h1: string;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <div className="page wrap">
      {crumbs ? <Breadcrumbs crumbs={crumbs} /> : null}
      <h1>{h1}</h1>
      {lede ? <p className="lede">{lede}</p> : null}
      {children}
    </div>
  );
}
