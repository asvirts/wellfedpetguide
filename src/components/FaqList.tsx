import type { Faq } from "../types";

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <section className="faq" aria-labelledby="faq">
      <div className="section-head">
        <p className="kicker">Owner Q&amp;A</p>
        <h2 id="faq">Questions owners ask</h2>
      </div>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <details key={faq.question} className="faq-item" open={index === 0}>
            <summary>
              <span className="faq-num" aria-hidden="true">
                Q{index + 1}
              </span>
              <span className="faq-q-text">{faq.question}</span>
              <span className="faq-icon" aria-hidden="true">
                +
              </span>
            </summary>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
