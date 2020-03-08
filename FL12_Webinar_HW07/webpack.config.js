const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const PrettierPlugin = require('prettier-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        main: './src/js/index.js'
    },
    output: {
        filename: 'js/app.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader"
                    },
                ]
            }, {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {minimize: true}
                    }
                ]
            }, {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ],
            }, {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name: '[name].[ext]',
                            outputPath: 'img/',
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: 'css/styles.css',
            chunkFilename: 'styles.css'
        }),
        new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
        new PrettierPlugin({
            printWidth: 80,               // Specify the length of line that the printer will wrap on.
            tabWidth: 2,                  // Specify the number of spaces per indentation-level.
            useTabs: false,               // Indent lines with tabs instead of spaces.
            semi: true,                   // Print semicolons at the ends of statements.
            encoding: 'utf-8',            // Which encoding scheme to use on files
            extensions: [ ".js" ]
        })
    ]
};