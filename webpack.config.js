const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {

    mode: "development",
    entry: {
        bundle: path.resolve(__dirname + '/src/app.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/app.js',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename:"css/app.css",
        }),
    ],

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(html)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
        ]
    },

    devServer: {
        static: {
          directory: path.resolve(__dirname, './dist'),
        },
        port: 3000,
        hot: true,
        compress: true,
        watchFiles: ['resources/**/*','pages/**/*'],
        historyApiFallback: true,
      },
};