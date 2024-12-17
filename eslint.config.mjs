import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    ignores: ["node_modules", "dist"],
  },
  {
    files: ["src/**/*.ts", "test/**/*.js"],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 2020,
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin,
      "prettier": prettierPlugin,
    },
    rules: {
      "prettier/prettier": ["error", { "printWidth": 120, "tabWidth": 4 }],
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
];

