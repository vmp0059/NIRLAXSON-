import { useNavigate } from "react-router-dom";

import ProductsHero from "../components/ProductsPage/ProductsHero";
import ProductGrid from "../components/ProductsPage/ProductGrid";
import ProductsCTA from "../components/ProductsPage/ProductsCTA";

import { products } from "../assets/products/data";
import { getProductSlug } from "../utils/product";

export default function Products() {
  const navigate = useNavigate();

  const goContact = () => {
    navigate("/contact");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const viewProduct = (product) => {
    navigate(`/products/${getProductSlug(product)}`);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <ProductsHero />

      <ProductGrid
        products={products}
        onView={viewProduct}
        goContact={goContact}
      />

      <ProductsCTA
        goContact={goContact}
      />
    </>
  );
}
