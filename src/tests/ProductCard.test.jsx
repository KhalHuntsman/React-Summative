import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const mockProduct = {
  id: 1,
  name: "Player's Handbook",
  category: "book",
  price: 49.99,
  stock: 10,
  image: ""
};

describe("ProductCard", () => {
  it("renders product name and category", () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    expect(screen.getByText("Player's Handbook")).toBeInTheDocument();
    expect(screen.getByText("book")).toBeInTheDocument();
  });
});
