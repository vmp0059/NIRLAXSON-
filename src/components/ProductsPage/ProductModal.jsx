import "./ProductModal.css";

export default function ProductModal({
  product,
  closeModal,
  goContact,
}) {
  if (!product) return null;

  return (
    <div
      className="product-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget)
          closeModal();
      }}
    >
      <div className="product-modal">

        <button
          className="product-modal-close"
          onClick={closeModal}
          aria-label="Close"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="product-modal-left">
          <img
            src={product.img}
            alt={product.name}
          />
        </div>

        <div className="product-modal-right">
          <span className="product-modal-tag">
            {product.tag}
          </span>

          <h2 className="product-modal-name">
            {product.name}
          </h2>

          <p className="product-modal-desc">
            {product.desc}
          </p>

          <div>
            <div className="product-modal-specs-title">
              Specifications
            </div>

            <div className="product-modal-specs-grid">
              {product.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="product-modal-spec-item"
                >
                  <div className="product-modal-spec-label">
                    {spec.label}
                  </div>

                  <div className="product-modal-spec-value">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="product-modal-actions">
            <button
              className="product-card-cta"
              onClick={goContact}
            >
              Request a Quote
            </button>

            <button
              className="product-card-inquiry"
              onClick={closeModal}
            >
              Close
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}