const path = require('path');

module.exports = {
  mode: 'development',
  entry: './test/index.js',
  devServer: {
    contentBase: path.join(__dirname, 'test'),
    watchContentBase: true,
    compress: true,
    host: '0.0.0.0',
    port: 8084,
  },
  resolve: {
    alias: {
      '@picimo/core': path.resolve(__dirname, '../picimo-core'),
      '@picimo/ecs': path.resolve(__dirname, '../picimo-ecs'),
      '@picimo/renderer': path.resolve(__dirname, '../picimo-renderer'),
      '@picimo/utils': path.resolve(__dirname, '../picimo-utils'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                debug: true,
                useBuiltIns: 'entry',
                targets: {
                  browsers: [
                    'and_chr 64',
                    'chrome 64',
                    'ios_saf 11',
                    'firefox 57',
                    'samsung 6.2',
                    'edge 16',
                  ],
                },
              }],
            ],
          },
        },
      },
    ],
  },
};
