import type { Faq } from "../types";

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <section className="faq" aria-labelledby="faq">
      <h2 id="faq">Questions owners ask</h2>
      <div className="faq-list">
        {faqs.map((faq) => (
          <details key={faq.question}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
