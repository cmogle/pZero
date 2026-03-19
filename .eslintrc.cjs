/** @type { import("eslint").Linter.Config } */
module.exports = {
  root: true,
  env: { node: true, es2022: true },
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  overrides: [
    {
      files: ["**/*.ts"],
      rules: {
        "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }]
      }
    }
  ],
  ignorePatterns: ["node_modules", "dist", "coverage", ".next", "supabase", "**/*.test.ts"]
};
