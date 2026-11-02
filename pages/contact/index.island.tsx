import { PageShell } from "../../src/components/PageShell";
import { CONTACT_EMAIL, staticPages } from "../../src/site";

export default function ContactPage() {
  const page = staticPages.contact;
  return (
    <PageShell
      h1={page.h1}
      lede="Email is the contact path. There is no form backend on this static site, and the inbox is not a veterinary service."
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Contact", path: page.path },
      ]}
    >
      <p>
        <a href={`mailto:${CONTACT_EMAIL}?subject=WellFed%20Pet%20Guide`}>{CONTACT_EMAIL}</a>
      </p>
      <p>
        Useful notes: a correction with the page URL, a broken source link, or a product formula
        that has changed. Change the address in <code>src/site.ts</code> if you use a different
        mailbox. Do not send medical records or expect a diagnosis.
      </p>
    </PageShell>
  );
}
