import productsData from './data/db.json'

// Get all products
export function getAllProducts() {
  return productsData.data;
}

// Get products by category
export function getProductsByCategory(category) {
  return productsData.data.filter(product => product.category === category);
}

// Get single product by slug
export function getProductBySlug(slug) {
  return productsData.data.find(product => product.slug === slug);
}

// Get new products
export function getNewProducts() {
  return productsData.data.filter(product => product.new);
}

// Get recommended products (exclude current product)
export function getRecommendedProducts(currentSlug, limit = 3) {
  return productsData.data
    .filter(product => product.slug !== currentSlug)
    .slice(0, limit);
}