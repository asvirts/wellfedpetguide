import { PageShell } from "../../src/components/PageShell";
import { CONTACT_EMAIL, staticPages } from "../../src/site";

export default function PrivacyPage() {
  const page = staticPages.privacy;
  return (
    <PageShell
      h1={page.h1}
      lede="This is a static content site. It does not ask you to create an account, and the guides do not contain a checkout."
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Privacy", path: page.path },
      ]}
    >
      <h2>What the site itself stores</h2>
      <p>
        The pages are pre-rendered HTML. The site does not run a member database. If you email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>, that message is ordinary email
        between you and Andrew Virts.
      </p>
      <h2>Amazon</h2>
      <p>
        If you follow an affiliate link, Amazon receives the request and may set its own cookies or
        use its own advertising identifiers. That processing is covered by Amazon’s privacy notice,
        not by this page. The Associates tag, once configured, tells Amazon which site sent the
        click.
      </p>
      <h2>Cloudflare</h2>
      <p>
        The site is deployed to Cloudflare. Cloudflare receives the usual connection data for a
        request, including IP address, and may cache the HTML and assets. After launch, Cloudflare
        Web Analytics can be turned on from the Cloudflare dashboard. That product is designed to
        count visits without a cookie banner. Server logs, if enabled on the Worker, are Cloudflare
        logs.
      </p>
      <h2>Contact</h2>
      <p>
        Privacy questions go to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. There is no
        separate data broker or app login to delete.
      </p>
    </PageShell>
  );
}
