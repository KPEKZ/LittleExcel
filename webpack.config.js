const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProduction = process.env.NODE_ENV === 'production';
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const isDevelopment = !isProduction;
const filename = (ext) =>
    isDevelopment ? `bundle${ext}` : `bundle.[fullhash].${ext}`;

const config = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: [
        '@babel/polyfill',
        './index.js',
        'webpack-dev-server/client?http://localhost:4220',
    ],
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src/core'),
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
            filename: 'style.css',
        }),
        new ESLintWebpackPlugin({
            overrideConfigFile: path.resolve(__dirname, '.eslintrc'),
            context: path.resolve(__dirname, '../src/js'),
            files: '**/*.js',
        }),
        new StylelintWebpackPlugin({
            overrideConfigFile: path.resolve(__dirname, '.prettierrc'),
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(sass|css|scss)$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                ],
            },
        ],
    },
};

const compiler = webpack(config);

const server = new WebpackDevServer(
    { hot: true, client: false, port: 4220 },
    compiler
);

(async () => {
    await server.start();
    console.log('server has been started');
})();
