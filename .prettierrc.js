module.exports = {
  trailingComma: "none",
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  bracketSpacing: true,
  bracketSameLine: true,
  arrowParens: "always",
  printWidth: 120,
  endOfLine: "lf",
  overrides: [
    {
      files: ["*.scss", "*.css", "*.html"],
      options: {
        semi: true,
        tabWidth: 2,
      },
    },
  ],
};
