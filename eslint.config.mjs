// eslint.config.mjs
import js from "@eslint/js";
import prettier from "eslint-config-prettier";

export default [
  {
    ignores: ["node_modules/**", "dist/**", ".env", ".vscode/**", ".DS_Store"],
  },
  js.configs.recommended,
  {
    files: ["assets/js/**/*.js"], // ← ブラウザ用JSの場所を指定
    languageOptions: {
      globals: {
        document: true,
        console: true,
        fetch: true,
        setTimeout: true,
      },
    },
    rules: {
      "no-console": "off",
    },
  },
  prettier,
];
