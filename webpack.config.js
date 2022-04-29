const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

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
        new CopyPlugin({
            patterns: [
              {
                to: path.resolve(__dirname, "dist/alarms"),
                from: path.resolve(__dirname, "src/alarms"),
              },
              {
                to: path.resolve(__dirname, "dist/images"),
                from: path.resolve(__dirname, "src/images"),
              },
            ],
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