import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

function Products() {
  return (
    <>
      <Navbar />

      <h1>Our Products</h1>

      <div className="products-container">
        <ProductCard title="Paint Mixing Machine" />
        <ProductCard title="Coating Plant System" />
      </div>

      <Footer />
    </>
  );
}

export default Products;