export type FaqItem = { question: string; answer: string };

export function FaqBlock({ items, title = "Frequently asked questions", className = "" }: { items: readonly FaqItem[]; title?: string; className?: string }) {
  return (
    <section className={`faq-block content-shell ${className}`.trim()} aria-labelledby="faq-heading">
      <div className="section-kicker">Useful answers</div>
      <h2 id="faq-heading">{title}</h2>
      <div className="faq-list">
        {items.map((item, index) => (
          <details key={item.question} open={index === 0}>
            <summary><span>{item.question}</span><span aria-hidden="true">+</span></summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
