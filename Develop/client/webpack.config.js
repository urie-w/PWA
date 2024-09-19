const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Generates the html file
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE',
      }),

      // Creates the service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js',
      }),

      // Creates the manifest file
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'A simple text editor app',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('icons')
          },
        ],
      }),
    ],

    module: {
      rules: [
        // CSS Loader
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
        }
      ],
    },
  };
};
