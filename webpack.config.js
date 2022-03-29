// const webpack = require('webpack');

// module.exports = {
// //  {...}
//     resolve: {
//         alias: {
//             process: 'process/browser',
//             stream: "stream-browserify",
//             zlib: "browserify-zlib"
//         }
//     },
//     plugins: [
//         new webpack.ProvidePlugin({
//             process: 'process/browser',
//             Buffer: ['buffer', 'Buffer'],
//         }),
//     ]
// }

// const webpack = require('webpack');

// module.exports = {
//  {...}
//     resolve: {
//         alias: {
//             process: 'process/browser',
//             stream: "stream-browserify",
//             zlib: "browserify-zlib"
//         }
//     },
//     plugins: [
//         new webpack.ProvidePlugin({
//             process: 'process/browser',
//             Buffer: ['buffer', 'Buffer'],
//         }),
//     ]
// }


const webpack = require("webpack");

module.exports = {
  resolve: {
    fallback: {
      module: "empty",
      dgram: "empty",
      dns: "mock",
      fs: "empty",
      http2: "empty",
      net: "empty",
      tls: "empty",
      child_process: "empty",
      process: require.resolve("process/browser"),
      zlib: require.resolve("browserify-zlib"),
      stream: require.resolve("stream-browserify"),
      util: require.resolve("util"),
      // buffer: require.resolve("buffer"),
      asset: require.resolve("assert"),
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser",
    }),
  ],
}