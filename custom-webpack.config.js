const webpack = require('webpack');

module.exports = {
    //...
    resolve: {
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve("stream-browserify"),
        assert: require.resolve("assert/"),
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        os: require.resolve("os-browserify/browser")
      },
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_DEBUG': JSON.stringify('development')
        }),

        // Work around for Buffer is undefined:
        // https://github.com/webpack/changelog-v5/issues/10
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],

    node: {global: true}

  };