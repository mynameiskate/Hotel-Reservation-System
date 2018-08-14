'use strict';

const webpack = require('webpack');
const path = require('path');

const bundleFolder = '../wwwroot/assets/';
const srcFolder = './';

module.exports = {
    entry: [
        srcFolder + 'index.jsx'
    ],
    devtool: 'source-map',
    output: {
        filename: 'bundle.js',
        publicPath: '/assets/',
        path: path.resolve(__dirname, bundleFolder)
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'env', 'stage-0']
            },
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(js|jsx)$/,
            enforce: 'pre',
            loader: 'eslint-loader'
        }, {
            test: /\.less$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader",
                options: {
                    sourceMap: true,
                    modules: true,
                    localIdentName: "[local]___[hash:base64:5]"
                }
            }, {
                loader: "less-loader"
            }]
        }]
    },
    resolve: {
        extensions: [".js", ".jsx", ".less", ".css"]
    },
    devServer: {
        historyApiFallback: true
    },

    plugins: []
};