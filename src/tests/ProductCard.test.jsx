import React from "react";                                      // Needed to render JSX in tests
import { render, screen } from "@testing-library/react";        // RTL utilities for rendering + querying elements
import { MemoryRouter } from "react-router-dom";                // Router wrapper for components using <Link>
import ProductCard from "../components/ProductCard";            // Component under test

// Mock product object used as test data
const mockProduct = {
  id: 1,
  name: "Player's Handbook",
  category: "book",
  price: 49.99,
  stock: 10,
  image: ""                                                     // Image can be empty for testing
};

describe("ProductCard", () => {
  it("renders product name and category", () => {
    render(
      <MemoryRouter>                                            {/* Needed because ProductCard contains <Link> */}
        <ProductCard product={mockProduct} />                   {/* Render component with mock product */}
      </MemoryRouter>
    );

    expect(screen.getByText("Player's Handbook")).toBeInTheDocument(); // Assert name renders
    expect(screen.getByText("book")).toBeInTheDocument();              // Assert category renders
  });
});
