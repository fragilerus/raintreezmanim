let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let pathHelper = require('path').resolve;

module.exports = {
    entry: {
        'vendor': './src/vendor.ts',
        'app': './src/app.tsx'
    },
    output: {
        path: pathHelper(__dirname,'dist'),
        filename: "js/[name].js"
    },
    devtool: "source-map",
    resolve:{
        extensions: [".ts", ".tsx", ".js"]
    },
    module:{
        loaders: [
            {
                test: /\.tsx?$/, 
                loader: "awesome-typescript-loader"
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("raw-loader")
            }
        ]
    },
    devServer:{
        contentBase: 'dist/js/',
        inline: true,
        host: 'localhost',
        port: 8080
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor']
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html'
        }),
        new ExtractTextPlugin('css/styles.css')
    ]
}