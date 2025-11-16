import React from "react";                                      // Import React for JSX
import { useProductContext } from "../context/ProductContext.jsx"; // Pull product state + status from context
import ProductCard from "../components/ProductCard.jsx";        // Component for rendering individual products

export default function ProductsPage() {
  const { products, status, error } = useProductContext();      // Access product list + loading/error status

  // Show loading state while fetching
  if (status === "loading") return <p>Loading products...</p>;

  // Show a readable error if fetch fails
  if (status === "error") return <p>Error: {error}</p>;

  return (
    <section>
      <h2 className="page-title">All Products</h2>              {/* Page heading */}

      <div className="product-grid">                            {/* Grid container for cards */}
        {products.map((p) => (                                 // Loop through product list
          <ProductCard key={p.id} product={p} />               // Render each item in a card
        ))}
      </div>
    </section>
  );
}
