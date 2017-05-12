const path = require("path");
const BabiliPlugin = require("babili-webpack-plugin");

module.exports = {
    target: "web",
    entry: ["babel-polyfill", "./src/index.js"],
    output: {
        filename: "bip39.js",
        path: __dirname + "/dist",
        library: "bip39",
        libraryTarget: "umd"
    },
    node: {
      crypto: false,
    },
    externals: {
      crypto: 'crypto',
    },
    plugins: [new BabiliPlugin()],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, "src"),
                loader: "babel-loader"
            }
        ]
    }
};
