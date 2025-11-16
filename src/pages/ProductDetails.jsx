import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductContext } from "../context/ProductContext.jsx";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProductContext();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <section>
        <p>Product not found.</p>
        <button className="button" onClick={() => navigate("/products")}>
          Back to Products
        </button>
      </section>
    );
  }

  return (
    <section>
      <h2 className="page-title">{product.name}</h2>
      <p>
        <strong>Category:</strong> {product.category}
      </p>
      <p style={{ maxWidth: "40rem" }}>{product.description}</p>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <p className="product-stock">In stock: {product.stock}</p>
      <button className="button" onClick={() => navigate(-1)}>
        Back
      </button>
    </section>
  );
}
