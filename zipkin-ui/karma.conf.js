var webpack = require('webpack');

module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'test/*test.js',
      'test/**/*test.js'
    ],

    preprocessors: {
      '*test.js': ['babel', 'webpack', 'sourcemap'],
      '**/*test.js': ['babel', 'webpack', 'sourcemap']
    },

    client: {
      captureConsole: true
    },

    browsers: ['ChromeHeadless'],

    webpack: {
      devtool: 'inline-source-map',
      module: {
        rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        }, {
          test: /\.mustache$/,
          use: 'mustache-loader'
        }]
      },
      resolve: {
        modules: ['node_modules']
      },
      plugins: [
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
        })
      ]
    },

    webpackServer: {
      noInfo: true
    },

    plugins: [
      require('karma-babel-preprocessor'),
      require('karma-webpack'),
      require('karma-mocha'),
      require('karma-chai'),
      require('karma-chrome-launcher'),
      require('karma-sourcemap-loader')
    ]
  });
};
