import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPluginImport from "eslint-plugin-import";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["src/**/*.js"],

    languageOptions: { globals: globals.browser },
  plugins: {
      import: eslintPluginImport,
    },
      rules: {
      ...pluginJs.configs.recommended.rules,
        ...eslintPluginImport.configs.recommended.rules,
      "no-console": "warn", // show warning, if there's a "console.log" statement
      "import/no-cycle": "error", // show Error, if there's circular dependency
    },
  },
];

