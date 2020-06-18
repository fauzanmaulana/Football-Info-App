var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
var ServiceWorkerWepbackPlugin = require('serviceworker-webpack-plugin')

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
            template: "./src/pages/home.html",
            filename: "home.html"
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

        new HtmlWebpackPlugin({
            template: "./src/pages/likedDetail.html",
            filename: "likedDetail.html"
        }),

        new ServiceWorkerWepbackPlugin({
            entry: path.join(__dirname, 'src/sw.js'),
        }),
    ]
}