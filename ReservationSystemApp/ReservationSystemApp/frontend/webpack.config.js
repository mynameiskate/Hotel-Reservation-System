﻿'use strict';

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
            }

        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(js|jsx)$/,
            enforce: 'pre',
            loader: 'eslint-loader'
        }]
    },
    devServer: {
        historyApiFallback: true
    },

    plugins: []
};