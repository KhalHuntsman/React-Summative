import React from "react";
import { useProductContext } from "../context/ProductContext.jsx";
import ProductCard from "../components/ProductCard.jsx";

export default function ProductsPage() {
  const { products, status, error } = useProductContext();

  if (status === "loading") return <p>Loading products...</p>;
  if (status === "error") return <p>Error: {error}</p>;

  return (
    <section>
      <h2 className="page-title">All Products</h2>
      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
