const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const {resolve} = require('path');

module.exports = {
  entry: './source/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: resolve(__dirname, '..', 'tsconfig.client.json'),
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  output: {
    path: resolve(__dirname, '..', 'distribution'),
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './source/index.html',
    }),
    new HtmlWebpackPlugin({
      filename: './404.html',
      template: './source/404.html',
    }),
    new Dotenv(),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
};
