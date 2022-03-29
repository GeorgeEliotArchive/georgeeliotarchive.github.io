const webpack = require('webpack'); 

// module.exports = function override(config, env) {
    // New config, e.g. config.plugins.push...

    // config.module.rules = [...config.module.rules, 
  
    //     {
    //         test: /\.m?js/,
    //         resolve: {
    //           fullySpecified: false,
    //           fallback: {
    //             module: "empty",
    //             dgram: "empty",
    //             dns: "mock",
    //             fs: "empty",
    //             http2: "empty",
    //             net: "empty",
    //             tls: "empty",
    //             child_process: "empty",
    //             process: require.resolve("process/browser"),
    //             zlib: require.resolve("browserify-zlib"),
    //             stream: require.resolve("stream-browserify"),
    //             util: require.resolve("util"),
    //             buffer: require.resolve("buffer"),
    //             asset: require.resolve("assert"),
    //           }
    //         },
            
    //     }
    //   ]

    // return config
// }

module.exports = function override(config) { 
	const fallback = config.resolve.fallback || {}; 
	Object.assign(fallback, { 
        "process": require.resolve("process/browser"),
        "zlib": require.resolve("browserify-zlib"),
        "stream": require.resolve("stream-browserify"),
        "util": require.resolve("util"),
        "buffer": require.resolve("buffer"),
        "asset": require.resolve("assert"),
    });
   config.resolve.fallback = fallback; 
   config.plugins = (config.plugins || []).concat([ 
        new webpack.ProvidePlugin({ 
            process: 'process/browser', 
        Buffer: ['buffer', 'Buffer'] 
        }) 
   ]) 
   return config; 
}