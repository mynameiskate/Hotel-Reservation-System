'use strict';

const webpack = require('webpack');
const path = require('path');

const bundleFolder = "./wwwroot/assets/";
const srcFolder = "./frontend/App/js/"

module.exports = {
    entry: [
        srcFolder + "index.jsx"
    ],
    devtool: "source-map",
    output: {
        filename: "bundle.js",
        publicPath: '/assets/',
        path: path.resolve(__dirname, bundleFolder)
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                query: {
                    presets: ["stage-0", "react", "env"]
                }
            }
        ]
    },
    plugins: [
    ]
};