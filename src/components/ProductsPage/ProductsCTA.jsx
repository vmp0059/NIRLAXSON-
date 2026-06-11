import "./ProductsCTA.css";

export default function ProductsCTA({
  goContact,
}) {
  return (
    <div className="products-cta-strip">
      <h2>Can't find what you need?</h2>

      <p>
        We manufacture custom industrial machinery
        to your exact specifications.
      </p>

      <button
        className="products-cta-btn"
        onClick={goContact}
      >
        Talk With an Expert
      </button>
    </div>
  );
}