import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useProducts } from "../hooks/useProducts.js";

const mockData = [
  {
    id: 1,
    name: "Test Product",
    category: "Book",
    price: 1,
    description: "",
    stock: 1
  }
];

describe("useProducts", () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData)
      })
    );
  });

  it("fetches products on mount", async () => {
    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });

    expect(result.current.products.length).toBe(1);
    expect(result.current.products[0].name).toBe("Test Product");
  });
});
