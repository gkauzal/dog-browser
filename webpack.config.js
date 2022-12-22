const path = require('path'); // old commonJS pattern for importing modules
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // npm install --save-dev clean-webpack-plugin
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');  // npm install --save-dev optimize-css-assets-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin'); // npm install --save-dev html-webpack-plugin
const CopyPlugin = require('copy-webpack-plugin'); // npm install --save-dev copy-webpack-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // npm install --save-dev mini-css-extract-plugin
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); //npm install css-minimizer-webpack-plugin --save-dev
const TerserPlugin = require('terser-webpack-plugin'); // npm install terser-webpack-plugin --save-dev
const devMode = process.env.NODE_ENV !== 'production';

const config = {
  // this will be the entry point for the application
  entry: './src/app',
  output: {
    // the file with the path will be created by webpack
    filename: 'bundle.js',
    // this has to be an absolute path './dist' will not work
    path: path.resolve(__dirname, './dist'),
    // dont forget the ending slash!
    // this can be replaced to http://mywebsite.com/... for example
    // when the site goes public
    publicPath: ''
  },
  module: {
    rules: [
      // each rule is an object itself
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          // css-loader will read the css from the file
          // if we use style-loader instead of MiniCssExtractPlugin will create style tags in our html
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          'postcss-loader' // npm install --save-dev css-loader style-loader
        ]
      },
      {
        test: /\.scss$/,
        use: [
          // to use sass, we need one more loader . Sass: https://sass-lang.com
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          'postcss-loader' // npm install --save-dev sass-loader node-sass postcss-loader postcss
        ]
      },
      {
        //the test defines the file type in regex format
        test: /\.(png|jpg|gif)$/,
        // here we can specify which loader should be used
        // for the given file type
        use: {
          loader: 'file-loader' // npm install --save-dev file-loader
        }
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          // to handle font files (ex.: fontAwesome)
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        }
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        // https://webpack.js.org/loaders/html-loader/#sources
        options: {
          sources: false
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          // js itself is handled by webpack, but to use babel, we need a loader
          loader: 'babel-loader', // npm install --save-dev @babel/core babel-loader
          options: {
            // env: es6 to es5
            presets: ['@babel/preset-env'], // npm install --save-dev @babel/preset-env babel-plugin-transform-class-properties
            // presets: ['@babel/preset-env', '@babel/preset-react'], // if react is needed as well: npm install --save-dev @babel/preset-react
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },
  // plugin system: we can do more with this than just importing new files
  // minfy, converting, copying, etc...
  plugins: [
    // cleans the dist folder every time we build
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // more options> https://github.com/jantimon/html-webpack-plugin
      title: 'Hello World',
      filename: 'index.html',
      template: './src/index.html',
      meta: {
        viewport: 'width=device-width, initial-scale=1'
      }
    }),
    new CopyPlugin({
      patterns: [{ from: './src/img/', to: './img/' }]
    }),
    new MiniCssExtractPlugin()
    // more plugins: https://webpack.js.org/plugins/
  ]
};

// https://www.tutorialsteacher.com/nodejs/nodejs-module-exports
module.exports = (env, argv) => {
  // https://webpack.js.org/concepts/mode/ --> production enables lot of plugins
  if (argv.mode === 'development') {
    (config.devServer = {
      //  npm install --save-dev webpack-dev-server
      // contentBase: path.resolve(__dirname, './dist'),
      // index: 'index.html',
      port: 9000
    }),
      // config.watch = true;
      (config.optimization = {
        minimize: false
      });
    config.devtool = 'inline-source-map';
    // config.performance = {
    //   hints: 'warning'
    // };
  }

  if (argv.mode === 'production') {
    config.optimization = {
      minimize: true,
      minimizer: [
        // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
        // `...`
        new TerserPlugin(),
        new CssMinimizerPlugin()
      ]
    };
  }

  return config;
};
