const path = require("path");
const BabiliPlugin = require("babili-webpack-plugin");

module.exports = {
    target: "web",
    entry: [
        "./util/english.json",
        "./util/english.reverse.json",
        "./src/index.js",
    ],
    output: {
        filename: "bip39.js",
        path: __dirname + "/dist",
        library: "bip39",
        libraryTarget: "umd"
    },
    node: {
        crypto: false
    },
    externals: {
        crypto: "crypto"
    },
    plugins: [new BabiliPlugin()],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, "src"),
                loader: "babel-loader"
            },
            {
                test:/\.json$/,
                include: path.resolve(__dirname, "util"),
                loader: "file-loader?name=[name].[ext]"
            }
        ]
    }
};
