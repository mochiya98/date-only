module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module",
  },
  plugins: ["prettier"],
  rules: {
    "@typescript-eslint/ban-ts-comment": ["warn"],
  },
};
