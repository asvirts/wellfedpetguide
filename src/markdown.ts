import MarkdownIt from "markdown-it";
import anchor from "markdown-it-anchor";
import type { Heading } from "./types";

export function slugify(value: string): string {
  const slug = value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  return slug || "section";
}

export function countWords(markdown: string): number {
  const plain = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/[#>*_~`|]/g, " ");
  return plain.split(/\s+/).filter(Boolean).length;
}

export function renderMarkdown(source: string): { html: string; headings: Heading[] } {
  if (/^#\s+\S/m.test(source)) {
    throw new Error("Article markdown must not include an H1. The template renders the only H1.");
  }
  const headings: Heading[] = [];
  const md = new MarkdownIt({ html: false, linkify: false, typographer: false });
  md.use(anchor, {
    tabIndex: false,
    slugify,
    callback(token, info) {
      const depth = Number(token.tag.slice(1));
      if (depth === 2 || depth === 3) headings.push({ depth, id: info.slug, text: info.title });
    },
  });
  md.renderer.rules.link_open = (tokens, idx, options, _env, self) => {
    const token = tokens[idx];
    const href = String(token?.attrGet("href") ?? "");
    if (/^https?:\/\//i.test(href)) token?.attrSet("rel", "noopener noreferrer");
    return self.renderToken(tokens, idx, options);
  };
  return { html: md.render(source), headings };
}
