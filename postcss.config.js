module.exports = {
  plugins: [
    [
      'postcss-preset-env', //npm install --save-dev postcss-preset-env
      {
        // Options
        browsers: 'last 2 versions'
        // https://github.com/csstools/postcss-preset-env#autoprefixer
        // https://github.com/csstools/postcss-preset-env#browsers
      }
      // postcss-preset-env includes autoprefixer, so adding it separately is not necessary if you already use the preset.
    ]
  ]
};
