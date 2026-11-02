import { AFFILIATE_REL, amazonLinkLabel, amazonUrl } from "../amazon";
import type { ProductPick } from "../types";
import { AffiliateLink } from "./AffiliateLink";

export function ProductBlock({
  products,
  amazonTag,
}: {
  products: ProductPick[];
  amazonTag: string;
}) {
  return (
    <section className="products" aria-labelledby="products">
      <div className="section-head">
        <p className="kicker">Category Specimens &amp; Verification Ledger</p>
        <h2 id="products">Products to verify</h2>
        <p className="section-intro">
          These names are category placeholders, not a ranking and not the result of a laboratory or
          home test. Each entry is marked for Andrew Virts to confirm the current bag formula,
          manufacturer, and listing before the buying link is treated as final. Read{" "}
          <a href="/editorial-policy/">how we choose what to mention</a>.
        </p>
      </div>

      <div className="table-scroll">
        <table>
          <caption>Comparison of unverified product notes</caption>
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Type</th>
              <th scope="col">Why it is on the list</th>
              <th scope="col">Check before you buy</th>
              <th scope="col">Link</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.name}>
                <th scope="row">
                  <span className="table-prod-name">{product.name}</span>
                  <span className="table-todo-tag">TODO: Verify</span>
                </th>
                <td>
                  <span className="type-chip">{product.kind}</span>
                </td>
                <td>{product.bestFor}</td>
                <td>{product.watchout}</td>
                <td>
                  <AffiliateLink href={amazonUrl(product, amazonTag)}>
                    {amazonLinkLabel(product)}
                  </AffiliateLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="cards">
        {products.map((product, index) => (
          <article className="card product-card" key={`${product.name}-card`}>
            <div className="product-card-top">
              <span className="specimen-num">
                Specimen {String(index + 1).padStart(2, "0")} · {product.kind}
              </span>
              <p className="todo">TODO: verify before publishing the link</p>
            </div>
            <h3>{product.name}</h3>
            <p className="product-note">{product.note}</p>
            <dl className="product-specs">
              <div className="spec-box">
                <dt>Type</dt>
                <dd>{product.kind}</dd>
              </div>
              <div className="spec-box">
                <dt>Why it is listed</dt>
                <dd>{product.bestFor}</dd>
              </div>
              <div className="spec-box spec-watchout">
                <dt>Watch-out</dt>
                <dd>{product.watchout}</dd>
              </div>
            </dl>
            <div className="product-card-actions">
              <AffiliateLink href={amazonUrl(product, amazonTag)}>
                {amazonLinkLabel(product)}
              </AffiliateLink>
            </div>
          </article>
        ))}
      </div>

      <p className="fine-print">
        Affiliate links use <code>rel="{AFFILIATE_REL}"</code> and open in a new tab. With no
        Associates tag configured, the link is an Amazon search for the product name.
      </p>
    </section>
  );
}
