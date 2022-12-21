module.exports = {
  extends: "stylelint-config-recommended",
  plugins: [
    "stylelint-value-no-unknown-custom-properties",
    "stylelint-csstree-validator",
  ],
  rules: {
    "csstools/value-no-unknown-custom-properties": true,
    "csstree/validator": true,
  },
  overrides: [
    {
      files: ["*.scss", "**/*.scss"],
      customSyntax: "postcss-scss",
      extends: "stylelint-config-standard-scss",
    },
  ],
};
