const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'src/index.jsx'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            }, {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            }, {
                test: /\.(ch8|nes|png|jpe?g)$/,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),
        }),
    ],
};
