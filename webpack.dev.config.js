var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {

    devtool: 'inline-source-map',
    debug: true,

    entry: {
        main: ['./src/main'],
        vendor: ['react', 'react-dom', 'react-router', 'babel-polyfill', 'redux', 'react-redux']
    },

    // devServer: {
    //     outputPath: '/Users/james.wei/Documents/source/cms/douban-movie-react-ssr/dist',
    //     host: 'localhost',
    //     port: 8889,
    //     publicPath: '/static/',
    //     filename: '/[name].bundle.js',
    //     watchOptions: {
    //         aggregateTimeout: 200
    //     },
    //     watchDelay: undefined,
    //     hot: false,
    //     contentBase: '/Users/james.wei/Documents/source/cms/douban-movie-react-ssr/dist',
    //     stats: {
    //         cached: false,
    //         cachedAssets: false,
    //         context: '/Users/james.wei/Documents/source/cms/douban-movie-react-ssr'
    //     },
    //     clientLogLevel: 'info'
    // },

    output: {
        path: '/',
        filename: '/[name].bundle.js',
        publicPath: '/static/',
        chunkFilename: '/[name].js'
    },

    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src')
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css')
        }]
    },
    // node: {
    //     console: true
    // },

    plugins: [
        // new WriteFilePlugin(),
        new ProgressBarPlugin(),

        new ExtractTextPlugin('/main.css'),

        new webpack.DefinePlugin({
            'process.env': {
                ENV: JSON.stringify('development'),
                NODE_ENV: JSON.stringify('development')
            },
            '__NODE__': JSON.stringify(false),
        }),

        new webpack.optimize.CommonsChunkPlugin({
            names: 'vendor',
            minChunks: Infinity
        }),
    ],

};