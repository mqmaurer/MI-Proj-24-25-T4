import js from "@eslint/js";
import globals from "globals";
import importPlugin from "eslint-plugin-import";

export default [
  {
    name: "Global Ignore",
    ignores: ["webpack.config.js", "dist/bundle.js", "../.github/*"],
  },

  importPlugin.flatConfigs.recommended,
  js.configs.recommended,

  {
    name: "My Custom Language Options",
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  {
    name: "My Custom Rules",
    rules: {
      "no-console": "warn",
      "import/no-cycle": "error",
    },
  },
];
