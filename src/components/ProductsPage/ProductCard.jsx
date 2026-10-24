
import { useState } from "react";
import "./ProductCard.css";

function CardImage({ src, alt }) {
  const [failedSrc, setFailedSrc] = useState(null);
  const broken = failedSrc === src;

  if (!src || broken) {
    return (
      <div className="product-card-image-fallback">
        <span>{alt}</span>
      </div>
    );
  }

  return (
    <img
      className="product-card-product-img"
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailedSrc(src)}
    />
  );
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
      role="button"
      tabIndex={0}
      aria-label={`View details for ${product.name}`}
      onKeyDown={(e) => {
        if (e.target !== e.currentTarget) return;

        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onView(product);
        }
      }}
    >
      {/* LARGE PRODUCT IMAGE SECTION */}
      <div className="product-card-image">
        {product.tag && (
          <span className="product-card-tag-badge">
            {product.tag}
          </span>
        )}

        <CardImage
          src={product.img}
          alt={product.name}
        />
      </div>

      {/* COMPACT PRODUCT INFORMATION */}
      <div className="product-card-body">
        <h3 className="product-card-name">
          {product.name}
        </h3>

        <p className="product-card-desc">
          {product.desc}
        </p>

        <div className="product-card-specs">
          {(product.specs ?? []).slice(0, 3).map((spec) => (
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

      {/* COMPACT ACTION BUTTONS */}
      <div className="product-card-footer">
        <button
          type="button"
          className="product-card-cta"
          onClick={(e) => {
            e.stopPropagation();
            onView(product);
          }}
        >
          View Details
        </button>

        <button
          type="button"
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
