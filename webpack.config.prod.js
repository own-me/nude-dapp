const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'production',
    entry: path.join(__dirname, 'App.tsx'),
    devtool: "source-map",
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'own-me-gumball-machine.prod.js',
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