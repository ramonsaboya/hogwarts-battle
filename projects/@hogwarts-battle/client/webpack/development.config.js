const {merge} = require('webpack-merge');
const baseConfig = require('./base.config');

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
});
