import "./ProductGrid.css";
import ProductCard from "./ProductCard";

export default function ProductGrid({
  products,
  openModal,
  goContact,
}) {
  return (
    <section className="products-section">
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            openModal={openModal}
            goContact={goContact}
          />
        ))}
      </div>
    </section>
  );
}