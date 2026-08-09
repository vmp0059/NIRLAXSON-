import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductsHero from "../components/ProductsPage/ProductsHero";
import ProductFilters from "../components/ProductsPage/ProductFilters";
import ProductGrid from "../components/ProductsPage/ProductGrid";
import ProductsCTA from "../components/ProductsPage/ProductsCTA";

import {
  products,
  categories,
  ALL,
} from "../assets/products/data";
import { getProductSlug } from "../utils/product";

export default function Products() {
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] =
    useState(ALL);

  const filtered =
    activeFilter === ALL
      ? products
      : products.filter(
          (p) => p.tag === activeFilter
        );

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

      <ProductFilters
        categories={categories}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      <ProductGrid
        products={filtered}
        onView={viewProduct}
        goContact={goContact}
      />

      <ProductsCTA
        goContact={goContact}
      />
    </>
  );
}