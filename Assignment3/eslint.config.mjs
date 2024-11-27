import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPluginImport from "eslint-plugin-import";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["src/**/*.js"],
    //files: ["src/controller/controller.js"],

    languageOptions: { globals: globals.browser },
  plugins: {
      import: eslintPluginImport,
    },
      rules: {
      "no-console": "warn", // if there's a "console.log" statement
      "import/no-cycle": "error", // if there's circular dependency
    },
  },
];

