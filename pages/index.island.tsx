import { GuideList } from "../src/components/GuideList";
import { Picture } from "../src/components/Picture";
import { staticPages } from "../src/site";
import type { ArticleCard } from "../src/types";

const triageItems = [
  {
    tag: "Dogs · Acute GI",
    symptom: "Loose stool or sudden diarrhea",
    detail: "When to call the vet immediately, and how to run a 24–48h low-fat bland ration.",
    href: "/dog-food-for-diarrhea/",
  },
  {
    tag: "Dogs · Appetite",
    symptom: "Walked away from the food bowl",
    detail: "Rule out pain and nausea first, check bag freshness, and warm food safely.",
    href: "/dog-not-eating/",
  },
  {
    tag: "Dogs · Label Audit",
    symptom: "Checking a dog food brand or bag",
    detail: "Inspect AAFCO adequacy, co-packer imprints, FDA DCM notes, and recall records.",
    href: "/dog-food-brands-to-avoid/",
  },
  {
    tag: "Cats · Elimination",
    symptom: "Poop outside the litter box",
    detail: "Constipation and arthritis checks plus the N+1 uncovered tray floorplan.",
    href: "/cat-pooping-outside-litter-box/",
  },
  {
    tag: "Cats · Urgent Check",
    symptom: "Urine on rugs, beds, or bathmats",
    detail: "Screen for life-threatening urethral blockage first, then reset box & scent cues.",
    href: "/cat-peeing-outside-litter-box/",
  },
];

export default function HomePage({ articles }: { articles: ArticleCard[] }) {
  const page = staticPages.home;
  return (
    <div className="page wrap-wide">
      <section className="hero-home" aria-label="Introduction">
        <div className="hero-copy">
          <p className="kicker">WellFed Pet Guide · Editorial Research Desk</p>
          <h1>{page.h1}</h1>
          <p className="lede">
            Straight answers for a messy stomach, a dog that walks away from the bowl, and a cat
            that has quit the box. Every guide cites veterinary schools and regulators, and product
            names stay marked until they are checked.
          </p>
          <div className="hero-actions">
            <a className="btn-primary" href="#latest">
              Browse Current Guides
            </a>
            <a className="btn-secondary" href="/editorial-policy/">
              How We Choose &amp; Cite
            </a>
          </div>
          <dl className="hero-metrics" aria-label="Editorial standards summary">
            <div>
              <dt>Published Guides</dt>
              <dd>5 monographs (1,500+ words each)</dd>
            </div>
            <div>
              <dt>Primary Citations</dt>
              <dd>AVMA, AAFCO, FDA, WSAVA, Cornell &amp; Merck</dd>
            </div>
            <div>
              <dt>Product Policy</dt>
              <dd>Zero synthetic ratings; marked TODO until verified</dd>
            </div>
          </dl>
        </div>

        <figure className="media-frame hero-home-frame">
          <Picture
            className="hero-media"
            name="home-hero"
            alt="Abstract still life of a feeding bowl and a ruled page, in dark green and warm paper."
            width={1200}
            height={675}
            priority
          />
          <figcaption className="media-caption">
            <span>Plate I — Canine Nutrition &amp; Feline Habitat Reference</span>
            <span>Ed. Andrew Virts</span>
          </figcaption>
        </figure>
      </section>

      <section className="triage-strip" aria-labelledby="triage-heading">
        <div className="section-head">
          <p className="kicker">Symptom &amp; Question Index</p>
          <h2 id="triage-heading">Start with what you are seeing</h2>
          <p className="section-intro">
            Jump straight to the problem monograph that matches what is happening in the kitchen or
            around the litter box right now.
          </p>
        </div>
        <div className="triage-grid">
          {triageItems.map((item) => (
            <a key={item.href} href={item.href} className="triage-card">
              <span className="triage-tag">{item.tag}</span>
              <span className="triage-title">{item.symptom}</span>
              <span className="triage-detail">{item.detail}</span>
              <span className="triage-arrow" aria-hidden="true">
                Open guide →
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="clusters-section" aria-label="Topic clusters">
        <div className="cluster-grid">
          <article className="cluster-card cluster-dogs">
            <div className="cluster-card-top">
              <span className="category-pill pill-dogs">Cluster 01 · Dogs</span>
              <span className="cluster-count">3 Live Guides · 10 Planned</span>
            </div>
            <h2>Food for a specific problem</h2>
            <p>
              Diarrhea, a skipped dinner, and the brands worth a harder look. Start with the symptom
              in front of you, check whether a clinic visit comes first, and then inspect whether
              the bag is part of the problem.
            </p>
            <ul className="cluster-highlights">
              <li>
                <a href="/dog-food-for-diarrhea/">What to Feed a Dog With Diarrhea</a>
              </li>
              <li>
                <a href="/dog-not-eating/">Dog Not Eating Food? Causes and What to Try</a>
              </li>
              <li>
                <a href="/dog-food-brands-to-avoid/">Dog Food Brands to Avoid</a>
              </li>
            </ul>
            <a className="more" href="/dogs/">
              Explore dog food guides →
            </a>
          </article>

          <article className="cluster-card cluster-cats">
            <div className="cluster-card-top">
              <span className="category-pill pill-cats">Cluster 02 · Cats</span>
              <span className="cluster-count">2 Live Guides · 5 Planned</span>
            </div>
            <h2>Litter box problems</h2>
            <p>
              Poop or urine outside the box is usually a medical pain signal or a housing setup
              problem, not a gadget shortage. Rule out urinary obstruction and painful stool, then
              fix the tray size, litter depth, and room sightlines before buying a robot.
            </p>
            <ul className="cluster-highlights">
              <li>
                <a href="/cat-peeing-outside-litter-box/">
                  Cat Peeing Outside the Litter Box: Fixes That Work
                </a>
              </li>
              <li>
                <a href="/cat-pooping-outside-litter-box/">
                  Why Is My Cat Pooping Outside the Litter Box?
                </a>
              </li>
            </ul>
            <a className="more" href="/cats/">
              Explore cat litter guides →
            </a>
          </article>
        </div>
      </section>

      <section className="home-guides-section" aria-labelledby="latest">
        <div className="section-head">
          <p className="kicker">Complete Publication Ledger</p>
          <h2 id="latest">Current guides</h2>
          <p className="section-intro">
            Every published guide includes a clinical red-flag check, primary citations, a
            comparison table of category examples to verify, and owner Q&amp;As.
          </p>
        </div>
        <GuideList articles={articles} />
      </section>

      <section className="trust-section" aria-labelledby="how-site-works">
        <div className="section-head">
          <p className="kicker">Methodology &amp; Ethics</p>
          <h2 id="how-site-works">How this research desk works</h2>
        </div>
        <div className="trust-grid">
          <article className="trust-card">
            <span className="trust-num" aria-hidden="true">
              01
            </span>
            <h3>Sources, not a clinic</h3>
            <p>
              Guides point to AVMA, AAFCO, FDA, WSAVA, the Merck Veterinary Manual, and university
              veterinary hospitals. Andrew Virts is the editor. He is not a veterinarian.
            </p>
          </article>
          <article className="trust-card">
            <span className="trust-num" aria-hidden="true">
              02
            </span>
            <h3>Dates you can see</h3>
            <p>
              Every guide shows the last update in the byline. When a regulatory notice or
              veterinary school resource moves, the citation gets checked and updated.
            </p>
          </article>
          <article className="trust-card">
            <span className="trust-num" aria-hidden="true">
              03
            </span>
            <h3>Affiliate links, labeled</h3>
            <p>
              Amazon links are disclosed at the top of the page. Placeholders say TODO until the
              formula and listing are verified. <a href="/editorial-policy/">How we choose</a>.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
