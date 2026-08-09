import "./ProductGrid.css";
import ProductCard from "./ProductCard";

export default function ProductGrid({
  products,
  onView,
  goContact,
}) {
  return (
    <section className="products-section">
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onView={onView}
            goContact={goContact}
          />
        ))}
      </div>
    </section>
  );
}