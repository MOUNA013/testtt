const path = require('path');
const webpack = require('webpack');
module.exports = (config, context) => {
  return {
    mode: 'development',
    entry: {
      app: path.resolve(__dirname, './app.js'),
    },
    output: {
        path: path.resolve( __dirname/*, 'dist' */),
        filename: 'bundle.js'
    },

    // Set watch to true for dev purposes.
    watch: false,
    mode: 'none',
    module: {
      rules: [
        {
          test: /\.svg$/,
          type: "asset/source",
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        { // Necessary for telemeter.
          test: /\.wasm$/,
          type: "asset/inline",
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: "style-loader",
              options: {
                injectType: "singletonStyleTag",
                attributes: {
                  "data-cke": true,
                },
              },
            },
            "css-loader",
          ],
        },
        {
          test: /\.html$/i,
          exclude: /node_modules/,
          loader: 'html-loader',
        },
      ],
    },
    // Useful for debugging.
    devtool: 'source-map',

    // By default webpack logs warnings if the bundle is bigger than 200kb.
    performance: { hints: false },
    plugins: [
      new webpack.EnvironmentPlugin({
        'SERVICE_PROVIDER_URI': 'https://www.wiris.net/demo/plugins/app',
        'SERVICE_PROVIDER_SERVER': 'java',
      }),
    ],
  };

}
