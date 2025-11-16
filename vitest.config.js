// vitest.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",        // allows document, window, DOM APIs
    globals: true,               // enables describe/it/expect without imports
    setupFiles: "./src/setupTests.js" // optional, but included since you referenced it
  }
});
