// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

/** @type {import("eslint").Linter.Config} */
const config = {
  overrides: [
    {
      extends: [
        "next"
      ],
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: path.join(__dirname, "tsconfig.json"),
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: path.join(__dirname, "tsconfig.json"),
  },
  plugins: ["@typescript-eslint"],
  extends: ["next/core-web-vitals",],
  rules: {
    "@typescript-eslint/consistent-type-imports": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-misused-promises": "off", // Disable the rule here
  "@typescript-eslint/no-floating-promises":"off",
  " @typescript-eslint/no-empty-function":"off",
" @typescript-eslint/restrict-plus-operands":"off",
"@typescript-eslint/no-var-requires":"off"
  },
};

module.exports = config;
