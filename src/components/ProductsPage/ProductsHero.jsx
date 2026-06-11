import "./ProductsHero.css";
import heroImage from "../../assets/products/heroImage.jpeg";

export default function ProductsHero() {
  return (
    <section
      className="products-hero"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      <div className="products-hero-overlay"></div>

      <div className="products-hero-content">

        <span className="products-hero-eyebrow">
          INDUSTRIAL MACHINERY
        </span>

        <h1>Our Products</h1>

        <p>
          Industrial mixing, blending and grinding
          machinery engineered for precision
          performance in paint, coating and
          chemical manufacturing industries.
        </p>

      </div>
    </section>
  );
}