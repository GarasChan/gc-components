// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const { resolve } = require('../build/util');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  )
  config.module.rules.push(
    {
      test: /\.(tsx|ts|js)$/,
      use: ['babel-loader']
    },
    {
      test: /\.(css|less)$/,
      exclude: resolve('node_modules'),
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: [require('autoprefixer')]
          }
        }, 'less-loader']
    }
  )
  config.resolve.extensions.push('.tsx', '.ts', '.less', '.css');

  // Return the altered config
  return config;
}