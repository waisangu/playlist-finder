const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: "./client/index.js",
    output: {
        path: path.resolve(__dirname, 'build'), 
        filename:"bundle.js",
    },
    module: {
        rules: [{
            test: /\.jsx?/,
             exclude: /node_modules/,
             use: {
                 loader: "babel-loader",
                 options: {
                     presets: ["@babel/preset-env", "@babel/preset-react"]
                 }
             }
            },{
            test: /\.s[ac]ss$/i,
            use: [
            "style-loader",
            "css-loader",
            "sass-loader",
            ],
        }]
    },
    devServer: {
        port: 8080,
        proxy: [
            {
              context: ['/api/', '/query/', '/delete/'],
              target: 'http://localhost:3000',
            },
          ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Development",
            template: "./client/index.html"
        })
    ]

}