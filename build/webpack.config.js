// nodejs 中的path模块
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    // 入口文件，path.resolve()方法，可以结合我们给定的两个参数最后生成绝对路径，最终指向的就是我们的index.js文件
    entry: {
        index: path.resolve(__dirname, '../app/index/index.js'),
        commons: [
            'Vue',
            //'wkzf'
        ]
    },
    // 输出配置
    output: {
        // 输出路径是 vue-demo/output/static
        path: path.resolve(__dirname, '../dist/static'),
        publicPath: 'static/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[chunkhash].js'
    },
    resolve: {
        alias: {
            //'wkzf': path.resolve(__dirname, '../../vue-weui/dist/vue-weui.min.js')
            'wkzf': path.resolve(__dirname, '../../vue-weui/components/')
        },
        extensions: ['', '.js', '.vue']
    },
    module: {
        loaders: [
            // 使用vue-loader 加载 .vue 结尾的文件
            {
                test: /\.vue$/,
                loader: 'vue'
            }, {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                loader: 'style!css'
            }, {
                test: /\.less$/,
                loader: 'style!css!autoprefixer!less'
            },
            // 加载图片
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: '[name].[ext]?[hash:7]'
                }
            }
        ]
    },
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    },
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract("style!css"),
            less: ExtractTextPlugin.extract("style!css!less")
        }
    },
    plugins: [
        // 提取css为单文件
        new ExtractTextPlugin("../[name].[contenthash].css"),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: path.resolve(__dirname, '../app/index/index.html'),
            inject: true
        })
    ]
}
