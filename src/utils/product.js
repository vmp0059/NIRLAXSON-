// src/utils/product.js

/**
 * Get a product's URL slug.
 *
 * Uses the existing slug if available.
 * Falls back to generating one from the product name.
 */
export function getProductSlug(product) {
  if (!product) return "";

  if (product.slug) {
    return product.slug;
  }

  const name = product.name || product.title || "";

  return name
    .toString()
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Find a product using its URL slug.
 */
export function findProductBySlug(products = [], slug) {
  if (!slug || !Array.isArray(products)) {
    return null;
  }

  return (
    products.find(
      (product) => getProductSlug(product) === slug
    ) || null
  );
}

/**
 * Generate the WhatsApp enquiry URL for a product.
 */
export function getProductWhatsAppLink(product) {
  if (!product) return "#";

  const productName =
    product.name ||
    product.title ||
    "this product";

  const message = `It's feedback from Nirlaxson Industries Website (www.nirlaxsonindustries.com). I'm interested in your ${productName}`;

  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/919860480063?text=${encodedMessage}`;
}

/**
 * Get related products.
 *
 * Products from the same category are preferred.
 * The current product is excluded.
 *
 * @param {Array} products
 * @param {Object} currentProduct
 * @param {number} limit
 */
export function getRelatedProducts(
  products = [],
  currentProduct,
  limit = 3
) {
  if (
    !Array.isArray(products) ||
    !currentProduct
  ) {
    return [];
  }

  const currentSlug = getProductSlug(currentProduct);

  const sameCategory = products.filter((product) => {
    if (getProductSlug(product) === currentSlug) {
      return false;
    }

    if (
      !currentProduct.category ||
      !product.category
    ) {
      return false;
    }

    return (
      product.category.toString().toLowerCase() ===
      currentProduct.category.toString().toLowerCase()
    );
  });

  // If enough products exist in the same category,
  // return only those.
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  // Otherwise fill the remaining slots with other products.
  const remaining = products.filter(
    (product) =>
      getProductSlug(product) !== currentSlug &&
      !sameCategory.includes(product)
  );

  return [...sameCategory, ...remaining].slice(0, limit);
}