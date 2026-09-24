import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FaWhatsapp,
  FaPaperPlane,
  FaChevronRight,
  FaCheckCircle,
} from "react-icons/fa";

import { products } from "../assets/products/data";
import {
  getProductSlug,
  findProductBySlug,
  getProductWhatsAppLink,
  getRelatedProducts,
} from "../utils/product";

import ProductCard from "../components/ProductsPage/ProductCard";
import "../components/ProductsPage/ProductCard.css";
import "./ProductDetail.css";

/**
 * Small local image wrapper: swaps to a text-based fallback if the image
 * file exists in the bundle but fails to actually load at runtime (bad
 * casing on a case-sensitive host, corrupted file, network failure, etc).
 * This does NOT fix a missing Vite import — that fails at build time and
 * nothing at the React layer can recover from it.
 */
function SafeImage({ src, alt, className }) {
  // Remembers which src failed, so a new src gets a fresh attempt.
  const [failedSrc, setFailedSrc] = useState(null);
  const broken = failedSrc === src;

  if (!src || broken) {
    return (
      <div className="product-image-fallback">
        <span>{alt}</span>
        <small>Image unavailable</small>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailedSrc(src)}
    />
  );
}

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const product = findProductBySlug(products, slug);

  // The selected thumbnail belongs to one product. Switching to another
  // product's page starts from the first image, never a leftover selection.
  const [selectedImage, setSelectedImage] = useState({ slug, index: 0 });
  const activeImageIndex = selectedImage.slug === slug ? selectedImage.index : 0;

  // Title and description are set by usePageMeta() from src/seo/pages.js,
  // the same source the pre-rendered HTML uses.

  // Always start a product page at the top — never inherit scroll
  // position from whatever page/product was viewed previously.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [product]);

  const goContact = () => {
    // The project has no dedicated /enquiry route — the legacy enquiry.php
    // page was merged into ContactUs.jsx's "Product Inquiry" flow during
    // the routing migration, so /contact is the correct, existing target.
    navigate("/contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const viewProduct = (p) => {
    navigate(`/products/${getProductSlug(p)}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!product) {
    return (
      <div className="product-detail-page product-not-found">
        <div className="product-not-found-inner">
          <span className="product-not-found-code">404</span>
          <h1>Product Not Found</h1>
          <p>
            We couldn't find the product you're looking for. It may have
            been renamed, moved, or is no longer part of our current range.
          </p>
          <div className="product-not-found-actions">
            <Link to="/products" className="product-card-cta">
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Reflect the actual shape of data.js: only products 7–25 carry
  // description / features / applications / breadcrumb / whatsapp / seo /
  // gallery. Products 1–6 only have desc / specs / tag / img / name / id.
  // Every optional field is guarded so nothing renders as undefined and no
  // section appears for data that doesn't exist.
  const specs = product.specs || [];
  const features = product.features || [];
  const applications = product.applications || [];
  const description = product.description || product.desc;
  const whatsappLink = getProductWhatsAppLink(product);
  const relatedProducts = getRelatedProducts(products, product, 3);

  const gallery =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : [product.img];
  const activeImage = gallery[activeImageIndex] ?? gallery[0];

  return (
    <div className="product-detail-page">

      {/* ── Breadcrumb ── */}
      <nav className="product-detail-breadcrumb" aria-label="Breadcrumb">
        <div className="product-detail-breadcrumb-inner">
          <Link to="/">Home</Link>
          <FaChevronRight className="crumb-sep" />
          <Link to="/products">Products</Link>
          <FaChevronRight className="crumb-sep" />
          <span className="crumb-current">
            {product.breadcrumb || product.name}
          </span>
        </div>
      </nav>

      {/* ── Main detail ── */}
      <section className="product-detail-main">
        <div className="product-detail-grid">

          <div className="product-detail-media-column">
            <div className="product-detail-media">
              <SafeImage src={activeImage} alt={product.name} />
            </div>

            {gallery.length > 1 && (
              <div className="product-detail-thumbs">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    className={
                      "product-detail-thumb" +
                      (i === activeImageIndex ? " active" : "")
                    }
                    onClick={() => setSelectedImage({ slug, index: i })}
                    aria-label={`Show image ${i + 1} of ${product.name}`}
                  >
                    <SafeImage src={img} alt={`${product.name} ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="product-detail-info">
            <span className="product-detail-tag">{product.tag}</span>
            <h1 className="product-detail-name">{product.name}</h1>
            <p className="product-detail-desc">{description}</p>

            {specs.length > 0 && (
              <div className="product-detail-block">
                <div className="product-detail-block-title">
                  Specifications
                </div>
                <div className="product-detail-specs-grid">
                  {specs.map((spec) => (
                    <div key={spec.label} className="product-detail-spec-item">
                      <div className="product-detail-spec-label">
                        {spec.label}
                      </div>
                      <div className="product-detail-spec-value">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {features.length > 0 && (
              <div className="product-detail-block">
                <div className="product-detail-block-title">
                  Key Features
                </div>
                <ul className="product-detail-features-list">
                  {features.map((f) => (
                    <li key={f}>
                      <FaCheckCircle className="product-detail-feature-icon" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {applications.length > 0 && (
              <div className="product-detail-block">
                <div className="product-detail-block-title">
                  Applications
                </div>
                <div className="product-detail-applications">
                  {applications.map((a) => (
                    <span key={a} className="product-detail-application-chip">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="product-detail-actions">
              <a
                className="product-card-cta product-detail-whatsapp-btn"
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp style={{ fontSize: 16 }} />
                Enquire on WhatsApp
              </a>

              <button
                className="product-card-inquiry product-detail-enquiry-btn"
                onClick={goContact}
              >
                <FaPaperPlane style={{ fontSize: 12, marginRight: 8 }} />
                Send Enquiry
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ── Related products ── */}
      {relatedProducts.length > 0 && (
        <section className="product-detail-related">
          <div className="product-detail-related-inner">
            <div className="product-detail-related-heading">
              <h2>Related Products</h2>
              <span className="product-detail-related-underline" />
            </div>

            <div className="product-detail-related-grid">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onView={viewProduct}
                  goContact={goContact}
                />
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}