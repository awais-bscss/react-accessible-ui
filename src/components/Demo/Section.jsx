export function Section({ tag, title, desc, children }) {
  return (
    <section className="section" aria-labelledby={`section-${tag.replace(/\s+/g, '-')}`}>
      <div className="section__label">{tag}</div>
      <h2 id={`section-${tag.replace(/\s+/g, '-')}`} className="section__title">{title}</h2>
      <p className="section__desc">{desc}</p>
      {children}
    </section>
  );
}
