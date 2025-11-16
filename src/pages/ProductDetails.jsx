import React from "react";                                      // Import React for JSX rendering
import { useParams, useNavigate } from "react-router-dom";      // useParams gets URL params, useNavigate handles navigation
import { useProductContext } from "../context/ProductContext.jsx"; // Access product data from context

export default function ProductDetails() {
  const { id } = useParams();                                   // Extract dynamic ":id" parameter from URL
  const navigate = useNavigate();                               // Hook to programmatically navigate
  const { products } = useProductContext();                     // Get product list from global context

  const product = products.find((p) => p.id === Number(id));    // Find the product by matching numeric ID

  // If no product was found (invalid URL or deleted item)
  if (!product) {
    return (
      <section>
        <p>Product not found.</p>                               // Fallback UI
        <button className="button" onClick={() => navigate("/products")}>
          Back to Products                                      // Return user to product list
        </button>
      </section>
    );
  }

  // If product exists, display full detail view
  return (
    <section>
      <h2 className="page-title">{product.name}</h2>             {/* Product title */}

      <p>
        <strong>Category:</strong> {product.category}            {/* Show category */}
      </p>

      <p style={{ maxWidth: "40rem" }}>                          {/* Limit description width for readability */}
        {product.description}
      </p>

      <p className="product-price">
        ${product.price.toFixed(2)}                              {/* Format price as currency */}
      </p>

      <p className="product-stock">
        In stock: {product.stock}                                {/* Quantity available */}
      </p>

      <button className="button" onClick={() => navigate(-1)}>   {/* Go back to previous page */}
        Back
      </button>
    </section>
  );
}
