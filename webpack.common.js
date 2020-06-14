const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')

module.exports = {
    entry : {
        app : "./src/app.js"
    },
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js"
    },
    module : {
        rules : [
            {
                test : /\.css$/,
                use : [
                    {loader : "style-loader"},
                    {loader : "css-loader"}
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html",
            filename: "index.html"
        }),
        
        new HtmlWebpackPlugin({
            template: "./src/pages/matches.html",
            filename: "matches.html"
        }),

        new HtmlWebpackPlugin({
            template: "./src/pages/standings.html",
            filename: "standings.html"
        }),

        new HtmlWebpackPlugin({
            template: "./src/pages/liked.html",
            filename: "liked.html"
        }),

        new ServiceWorkerWebpackPlugin({
            entry: path.join(__dirname, 'src/sw.js'),
        })
    ]
}