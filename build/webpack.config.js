// nodejs 中的path模块
var path = require('path');

var glob = require('glob');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var webpack = require('webpack');

var entries = getEntry('app/**/*.js'); // 获得入口js文件
var chunks = Object.keys(entries);

module.exports = {
    // 入口文件，path.resolve()方法，可以结合我们给定的两个参数最后生成绝对路径，最终指向的就是我们的index.js文件
    entry: entries,
    // 输出配置
    output: {
        // 输出路径是 vue-demo/output/
        path: path.resolve(__dirname, '../dist'),
        publicPath: '../',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[chunkhash].js'
    },
    resolve: {
        alias: {
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
                loader: ExtractTextPlugin.extract('style', 'css')
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
    vue: { // vue的配置
        loaders: {
            js: 'babel',
            css: ExtractTextPlugin.extract('vue-style-loader', 'css-loader', 'less-loader')
        }
    },
    plugins: [
        // 提取css为单文件
        new ExtractTextPlugin("../dist/[name].[contenthash].css", {
            allChunks: true
        })
    ],
    // 开启source-map调试模式，webpack有多种source-map，在官网文档可以查到
    devtool: 'eval-source-map'
}


var pages = getEntry('app/**/*.html');
for (var pathname in pages) {
    // 配置生成的html文件，定义路径等
    // console.log('pathname:' + pathname);
    // console.log('path:' + pages[pathname]);
    var conf = {
        filename: pathname + '.html',
        template: pages[pathname], // 模板路径
        inject: true, // js插入位置
        minify: {
            removeComments: true,
            collapseWhitespace: false
        }
    };

    //限制页面只加载对应的js ，这边还附加了公共模块vendors.js
    if (pathname in module.exports.entry) {
        conf.chunks = ['vendors', pathname];
        conf.hash = false;
    }

    // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
    module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}


// 根据项目具体需求，输出正确的js和html路径
function getEntry(globPath) {
    var entries = {},
        basename, tmp, pathname;

    glob.sync(globPath).forEach(function(entry) {
        tmp = entry.split('/')[0] + '/';
        basename = path.basename(entry, path.extname(entry));
        pathname = entry.replace(path.extname(entry), "").replace(tmp, ""); // 正确输出js和html的路径
        entries[pathname] = path.resolve(__dirname, '../' + entry);
        // console.log('pathname:' + pathname);
    });
    // console.log(entries);
    return entries;
}
