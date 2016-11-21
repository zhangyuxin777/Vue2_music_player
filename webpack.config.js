var path = require('path');
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

//webpack插件
var plugins = [
    //提公用js到common.js文件中
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    //将样式统一发布到style.css中
    new ExtractTextPlugin("style.css", {
        allChunks: true,
        disable: false
    }),
    new webpack.ProvidePlugin({
        jQuery: "jquery",
        $: "jquery"
    })
];

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(
                "style-loader", "css-loader?sourceMap!cssnext-loader")
        }, {
            test: /\.scss$/,
            loader: 'style!css!sass?sourceMap'
        }, {
            test: /\.js$/,
            loader: 'babel', query: {compact: false},
            exclude: /node_modules|vue\/dist/
        }, {
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: "file-loader?name=image/[name].[ext]"
        }, {
            test: /\.(ttf)$/,
            loader: "file-loader?name=asset/[name].[ext]"
        }]
    },

    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extension: ['', '.js'],
        //别名
        alias: {
            filter: path.join(__dirname, 'src/filters')
        }
    },
    // 转化成es5的语法
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    plugins: plugins,
    devtool: '#source-map',
    watch: true
}
