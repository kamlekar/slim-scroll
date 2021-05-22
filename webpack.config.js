// webpack.config.js
const ArcGISPlugin = require('@arcgis/webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

module.exports = function build(env, arg) {
  const config = {
    entry: {
      index: ['./src/index.ts'],
    },
    output: {
      path: path.join(__dirname, 'dist'),
      chunkFilename: 'chunks/[id].js',
      publicPath: ''
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 3001,
      writeToDisk: true
    },
    mode: arg.mode,
    devtool: 'source-map',
    module: {
      rules: [
        // let babel transform typescript
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader'
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].bundle.css',
        chunkFilename: '[id].css',
      }),
  
      new ArcGISPlugin(),
  
      new HtmlWebPackPlugin({
        title: 'ArcGIS Template Application',
        template: 'src/index.html',
        filename: 'index.html'
      })
    ],
    resolve: {
        modules: [
            path.resolve(__dirname, '/src'),
            path.resolve(__dirname, 'node_modules/')
        ],
        extensions: ['.ts', '.tsx', '.js', '.css'],
    },
  };

  return config;
};
