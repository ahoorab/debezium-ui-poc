const path = require('path');
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || "8888";


module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  plugins: [
    new CopyWebpackPlugin([{from: '../../config/config.js'}])
  ],
  output: {
    publicPath: (false && isProd && remoteSuffix)
      ? `http://debeziumuipoc${remoteSuffix}/`
      : `http://localhost:8888/`
  },
  devServer: {
    contentBase: "./dist",
    host: HOST,
    port: PORT,
    compress: true,
    inline: true,
    historyApiFallback: true,
    hot: true,
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/patternfly'),
          path.resolve(__dirname, 'node_modules/@patternfly/patternfly'),
          path.resolve(__dirname, 'node_modules/@patternfly/react-styles/css'),
          path.resolve(__dirname, 'node_modules/@patternfly/react-core/dist/styles/base.css'),
          path.resolve(__dirname, 'node_modules/@patternfly/react-core/dist/esm/@patternfly/patternfly'),
          path.resolve(__dirname, 'node_modules/@patternfly/react-core/node_modules/@patternfly/react-styles/css'),
          path.resolve(__dirname, '../../node_modules/@patternfly/react-table/node_modules/@patternfly/react-styles/css')
        ],
        // use: ["style-loader", "css-loader", "postcss-loader"]
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {importLoaders: 1},
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: __dirname + '/postcss.config.js'
              }
            },
          },
        ],
      }
    ]
  }
});