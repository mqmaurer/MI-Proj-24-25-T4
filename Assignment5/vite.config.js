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
      // Vitest Konfiguration hinzufügen
      globals: true,
      environment: "jsdom", // Damit React-Komponenten in einer Browser-ähnlichen Umgebung getestet werden
      coverage: {
        reporter: ["text", "lcov"], // Textausgabe + lcov für HTML-Reports
      },
    },
  };
});

