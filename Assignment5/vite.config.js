import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables from .env files
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    define: {
      "process.env": env,
    },

    test: {
      // Vitest test configuration
      globals: true,
      environment: "jsdom",
      coverage: {
        reporter: ["text", "lcov"],
      },
    },
  };
});
