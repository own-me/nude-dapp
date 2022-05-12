const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    entry: path.join(__dirname, "App.tsx"),
    devtool: "eval-source-map",
    devServer: {
        static: {
            directory: path.join(__dirname, "dev")
        },
        port: "80",
        open: true,
        historyApiFallback: true,
        client: {
            overlay: {
                errors: true,
                warnings: false
            }
        }
    },
    output: {
        path: path.join(__dirname, "dev"),
        filename: "own-me-frontend.bundle.dev.js"
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript"
                        ]
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpe?g|gif|woff(2)?|svg)$/i,
                type: "asset/resource"
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".css"],
        alias: {
            https: path.resolve("node_modules/https-browserify"),
            http: path.resolve("node_modules/stream-http"),
            os: path.resolve("node_modules/os-browserify"),
            stream: path.resolve("node_modules/stream-browserify"),
            crypto: path.resolve("node_modules/crypto-browserify")
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            Buffer: ["buffer", "Buffer"],
            process: "process/browser"
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.join(__dirname, "index.html")
        }),
        new CopyPlugin({
            patterns: [
                { from: "media/favicons/", to: "media/favicons/" }
            ]
        }),
        new ESLintPlugin({
            extensions: ["js", "jsx", "ts", "tsx"]
        }),
        new Dotenv()
    ]
};