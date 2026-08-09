import { useEffect, useState } from "react";
import "./ProductCard.css";

function CardImage({ src, alt }) {
  const [broken, setBroken] = useState(false);

  useEffect(() => setBroken(false), [src]);

  if (!src || broken) {
    return (
      <div className="product-card-image-fallback">
        <span>{alt}</span>
      </div>
    );
  }

  return <img src={src} alt={alt} onError={() => setBroken(true)} />;
}

export default function ProductCard({
  product,
  onView,
  goContact,
}) {
  return (
    <div
      className="product-card"
      onClick={() => onView(product)}
    >
      <div className="product-card-image">
        <span className="product-card-tag-badge">
          {product.tag}
        </span>

        <CardImage src={product.img} alt={product.name} />
      </div>

      <div className="product-card-body">
        <h3 className="product-card-name">
          {product.name}
        </h3>

        <p className="product-card-desc">
          {product.desc}
        </p>

        <div className="product-card-specs">
          {product.specs.slice(0, 3).map((spec) => (
            <div
              key={spec.label}
              className="product-card-spec"
            >
              <span className="product-card-spec-label">
                {spec.label}
              </span>

              <span className="product-card-spec-value">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="product-card-footer">
        <button
          className="product-card-cta"
          onClick={(e) => {
            e.stopPropagation();
            onView(product);
          }}
        >
          View Details
        </button>

        <button
          className="product-card-inquiry"
          onClick={(e) => {
            e.stopPropagation();
            goContact();
          }}
        >
          Get Quote
        </button>
      </div>
    </div>
  );
}