const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, 'App.tsx'),
    devtool: "eval-source-map",
    devServer: {
        static: {
            directory: path.join(__dirname, 'dev'),
        },
        port: "auto",
        open: true
    },
    output: {
        path: path.join(__dirname, 'dev'),
        filename: 'own-me-gumball-machine.bundle.dev.js',
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
                            "@babel/preset-typescript",
                        ],
                    },
                },
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|woff(2)?|svg)$/i,
                type: 'asset/resource'
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".css"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.join(__dirname, 'index.html'),
        }),
        // new CopyPlugin({
        //     patterns: [
        //         { from: "media/favicons/", to: "media/favicons/" },
        //     ],
        // }),
    ]
};