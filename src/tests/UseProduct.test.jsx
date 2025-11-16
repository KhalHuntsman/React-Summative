import { describe, it, expect, vi, beforeEach } from "vitest";   // Vitest testing utilities
import { renderHook, waitFor } from "@testing-library/react";    // RTL utilities for testing hooks
import { useProducts } from "../hooks/useProducts.js";           // Hook under test

// Mock product data returned from the fake API
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
    // Mock global.fetch before each test
    // Return a resolved Promise shaped like a real fetch() response
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,                                                // Simulates "HTTP 200 OK"
        json: () => Promise.resolve(mockData)                    // Simulates successful JSON payload
      })
    );
  });

  it("fetches products on mount", async () => {
    const { result } = renderHook(() => useProducts());          // Render the hook in a test environment

    // Wait until the hook finishes loading and sets status to "success"
    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });

    // Validate that the hook stored the mock data
    expect(result.current.products.length).toBe(1);
    expect(result.current.products[0].name).toBe("Test Product");
  });
});
