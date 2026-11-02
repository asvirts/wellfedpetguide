import { Picture } from "../src/components/Picture";
import { GuideList } from "../src/components/GuideList";
import { staticPages } from "../src/site";
import type { ArticleCard } from "../src/types";

export default function HomePage({ articles }: { articles: ArticleCard[] }) {
  const page = staticPages.home;
  return (
    <div className="page wrap-wide">
      <div className="hero-home">
        <div>
          <p className="kicker">WellFed Pet Guide</p>
          <h1>{page.h1}</h1>
          <p className="lede">
            Straight answers for a messy stomach, a dog that walks away from the bowl, and a cat
            that has quit the box. The writing cites veterinary schools and regulators. Product
            names stay marked until they are checked.
          </p>
        </div>
        <Picture
          className="hero-media"
          name="home-hero"
          alt="Abstract still life of a feeding bowl and a ruled page, in dark green and warm paper."
          width={1200}
          height={675}
          priority
        />
      </div>
      <div className="cluster-grid">
        <article className="cluster-card">
          <p className="kicker">Dogs</p>
          <h2>Food for a specific problem</h2>
          <p>
            Diarrhea, a skipped dinner, and the brands worth a harder look. Start with the problem,
            then decide whether the bag is part of it.
          </p>
          <a className="more" href="/dogs/">
            Dog food guides
          </a>
        </article>
        <article className="cluster-card">
          <p className="kicker">Cats</p>
          <h2>Litter box problems</h2>
          <p>
            Poop or urine outside the box is often a medical or setup problem, not a gadget
            shortage. Fix the box before you buy a robot.
          </p>
          <a className="more" href="/cats/">
            Cat litter guides
          </a>
        </article>
      </div>
      <section aria-labelledby="latest">
        <h2 id="latest">Current guides</h2>
        <GuideList articles={articles} />
      </section>
      <section className="trust-grid" aria-label="How the site works">
        <article>
          <h2>Sources, not a clinic</h2>
          <p>
            Guides point to AVMA, AAFCO, FDA, WSAVA, and university veterinary hospitals. Andrew
            Virts is the editor. He is not a veterinarian.
          </p>
        </article>
        <article>
          <h2>Dates you can see</h2>
          <p>
            Every guide shows the last update. When a source page moves, the citation gets checked
            again.
          </p>
        </article>
        <article>
          <h2>Affiliate links, labeled</h2>
          <p>
            Amazon links are disclosed at the top of the page. Placeholders say TODO until the
            listing is verified. <a href="/editorial-policy/">How we choose</a>.
          </p>
        </article>
      </section>
    </div>
  );
}
