// config-overrides.js
const webpack = require('webpack');

module.exports = function override(config, env) {
  // Disable fs, os, and path modules
  config.resolve.fallback = {
    fs: false,
    os: false,
    path: false,
  };

  // Ignore the web-worker module for elkjs
  config.plugins.push(
    new webpack.IgnorePlugin({
      resourceRegExp: /web-worker/,
      contextRegExp: /elkjs\/lib$/,
    })
  );

  // Ignore the webworker-threads module
  config.plugins.push(
    new webpack.IgnorePlugin({
      resourceRegExp: /webworker-threads/,
    })
  );

  // Additional webpack configurations can be added here

  return config;
};
