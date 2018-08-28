﻿'use strict';

const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const bundleFolder = '../wwwroot/assets/';
const srcFolder = './scripts/';

module.exports = {
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'main.css'
        })
    ],
    entry: [
        srcFolder + 'index.jsx'
    ],
    devtool: 'source-map',
    output: {
        filename: 'bundle.js',
        publicPath: '/assets/',
        path: path.resolve(__dirname, bundleFolder)
    },
    mode: 'development',
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
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    "css-loader"
                ]
            }, {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {}
                }]
            }, {
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                loader: 'eslint-loader'
            },

            {
                test: /\.less$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                }, {
                    loader: "css-loader",
                    options: {
                        sourceMap: true,
                        modules: true,
                        localIdentName: "[local]"
                    }
                }, {
                    loader: "less-loader"
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.less', '.css']
    },
    devServer: {
        historyApiFallback: true
    }
};