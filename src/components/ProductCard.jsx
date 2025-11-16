import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { id, name, category, description, price, stock, image } = product;

  return (
    <article className="product-card" data-testid="product-card">
      <img
        src={image}
        alt={name}
        className="product-image"
      />

      <h3 className="product-title">{name}</h3>
      <p className="product-category">{category}</p>

      <div className="product-info">
        <p>{description}</p>
        <p className="product-price">${price.toFixed(2)}</p>
        <p className="product-stock">In stock: {stock}</p>

        <Link to={`/products/${id}`}>
          <button className="button">View Details</button>
        </Link>
      </div>
    </article>
  );
}
