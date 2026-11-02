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
      <h2 id="products">Products to verify</h2>
      <p>
        These names are placeholders, not a ranking and not the result of a test. Each one is marked
        for Andrew Virts to confirm before the buying link is treated as final. Read{" "}
        <a href="/editorial-policy/">how we choose what to mention</a>.
      </p>
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
                <th scope="row">{product.name}</th>
                <td>{product.kind}</td>
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
        {products.map((product) => (
          <article className="card" key={`${product.name}-card`}>
            <p className="todo">TODO: verify before publishing the link</p>
            <h3>{product.name}</h3>
            <p>{product.note}</p>
            <dl>
              <div>
                <dt>Type</dt>
                <dd>{product.kind}</dd>
              </div>
              <div>
                <dt>Why it is listed</dt>
                <dd>{product.bestFor}</dd>
              </div>
              <div>
                <dt>Watch-out</dt>
                <dd>{product.watchout}</dd>
              </div>
            </dl>
            <AffiliateLink href={amazonUrl(product, amazonTag)}>
              {amazonLinkLabel(product)}
            </AffiliateLink>
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
