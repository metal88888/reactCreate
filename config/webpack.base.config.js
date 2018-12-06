/* eslint-disable */
const path = require('path')
const webpack = require('webpack')
const merge = require("webpack-merge")

const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const APP_DIR = path.resolve(__dirname, '../src')
const PUBLIC_PATH = '/'
const BUILD = path.resolve(__dirname, '../build')
const STATIC = path.resolve(__dirname, '../static')

module.exports = env => {

    const {
        PLATFORM,
        VERSION
    } = env;

    return merge([{
        // entry: ['@babel/polyfill', APP_DIR],
        entry: ['@babel/polyfill', path.join(APP_DIR, 'index.js')],
        module: {
            rules: [{
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.scss$/,
                    use: [
                        PLATFORM === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(APP_DIR, 'index.html'),
                filename: './index.html'
            }),
            new webpack.DefinePlugin({
                'process.env.VERSION': JSON.stringify(env.VERSION),
                'process.env.PLATFORM': JSON.stringify(env.PLATFORM)
            }),
            new CopyWebpackPlugin([{
                from: STATIC
            }]),
        ],
        // output: {
        //   filename: '[name].bundle.js',
        //   chunkFilename: '[name].chunk.bundle.js',
        //   path: path.resolve(__dirname, '..', 'dist'),
        //   publicPath: '/',
        // },
    }])
}
