import { useState } from "react";

import ProductsHero from "../components/ProductsPage/ProductsHero";
import ProductFilters from "../components/ProductsPage/ProductFilters";
import ProductGrid from "../components/ProductsPage/ProductGrid";
import ProductModal from "../components/ProductsPage/ProductModal";
import ProductsCTA from "../components/ProductsPage/ProductsCTA";

import {
  products,
  categories,
  ALL,
} from "../assets/products/data";

export default function Products({
  setCurrentPage,
}) {
  const [activeFilter, setActiveFilter] =
    useState(ALL);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const filtered =
    activeFilter === ALL
      ? products
      : products.filter(
          (p) => p.tag === activeFilter
        );

  const openModal = (product) =>
    setSelectedProduct(product);

  const closeModal = () =>
    setSelectedProduct(null);

  const goContact = () => {
    closeModal();

    setCurrentPage("contact");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  console.log(selectedProduct);
  
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
        openModal={openModal}
        goContact={goContact}
      />

      <ProductsCTA
        goContact={goContact}
      />

      <ProductModal
        product={selectedProduct}
        closeModal={closeModal}
        goContact={goContact}
      />
    </>
  );
}