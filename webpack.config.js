const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const webpack = require('webpack');

const isDevelopment = !isProduction;
const filename = (ext) =>
    isDevelopment ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const mode = isProduction ? 'production' : 'development';

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode,
    entry: ['./index.js'],
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            src: path.resolve(__dirname, 'src'),
            core: path.resolve(__dirname, 'src/core'),
        },
    },
    devtool: isDevelopment ? 'inline-source-map' : 'source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: 'index.html',
            minify: {
                removeComments: isProduction,
                collapseWhitespace: isProduction,
            },
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src', 'favicon.ico'),
                    to: path.resolve(__dirname, 'dist'),
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        }),
        new ESLintWebpackPlugin({
            overrideConfigFile: path.resolve(__dirname, '.eslintrc'),
        }),
        new StylelintWebpackPlugin({
            overrideConfigFile: path.resolve(__dirname, '.stylelintrc'),
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(sass|css|scss)$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
        ],
    },
    devServer: {
        port: 8080,
        hot: true,
    },
};
