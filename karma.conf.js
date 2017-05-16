const path = require("path");
module.exports = function(config) {
    config.set({
        browsers: ["Chrome"], //run in Chrome
        browserNoActivityTimeout: 60000,
        singleRun: true, //just run once by default
        frameworks: ["mocha"], //use the mocha test framework
        files: [
            "node_modules/babel-polyfill/dist/polyfill.js",
            { pattern: "test/*test.js", watched: false }
        ],
        preprocessors: {
            "test/*test.js": ["webpack"]
        },
        webpack: {
            devtool: "inline-source-map",

            module: {
                rules: [
                    {
                        test: /\.jsx?$/,
                        include: path.resolve(__dirname, "src"),
                        loader: "babel-loader"
                    }
                ]
            }
        },
        webpackMiddleware: {
            noInfo: true
        }
    });
};
