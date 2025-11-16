import React from "react";                      // Import React to enable JSX and component creation
import { Link } from "react-router-dom";        // Import Link for client-side navigation

// Define a functional component that receives a "product" prop
export default function ProductCard({ product }) {
  // Destructure relevant fields from the product object
  const { id, name, category, description, price, stock, image } = product;

  // JSX returned by the component
  return (
    <article 
      className="product-card"                  // Assign CSS class for styling
      data-testid="product-card"                // Test ID used for automated tests
    >
      <img
        src={image}                             // Product image URL
        alt={name}                              // Accessible alt text using product name
        className="product-image"               // CSS class for styling the image
      />

      <h3 className="product-title">{name}</h3> // Display product name
      <p className="product-category">{category}</p> // Product category text

      <div className="product-info">            // Wrapper for description, price, stock, and button
        <p>{description}</p>                    // Display product description

        <p className="product-price">
          ${price.toFixed(2)}                   // Format price to two decimals for currency
        </p>

        <p className="product-stock">
          In stock: {stock}                     // Show quantity available
        </p>

        {/* Navigation link that routes to the product detail page */}
        <Link to={`/products/${id}`}>           {/* Dynamic route using product ID */}
          <button className="button">           // Styled button element
            View Details                        // Button label text
          </button>
        </Link>
      </div>
    </article>
  );
}
