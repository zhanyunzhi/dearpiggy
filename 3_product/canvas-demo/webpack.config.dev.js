var path =  require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');         //引入html处理插件
var webpack = require('webpack');         //引入插件
var ExtractTextPlugin = require("extract-text-webpack-plugin");         // 引入css 单独打包插件

module.exports = {
    entry: {
        vendor: ['./src/lib/js/jquery-1.8.3.min.js'],             //jquery,fullPage第三方插件打包到一起
        //        因为没有模块化，所以只能原样引入,'./src/lib/js/jquery.fullPage.js','./src/lib/js/jquery.imgpreload.js'
        index: './src/index.js'           //入口文件1
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'js/[name].js',                   //name对应entry里面的属性名，chunkhash对应各自生成的hash
    },
    devServer: {            //热更新配置
        port: 3002,
        contentBase: "./dist"
    },
    module: {
        rules: [
            {               //处理js文件，将es6转换
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    query: {
                        presets: ['latest']
                    }
                }],
                exclude: [
                    path.resolve(__dirname,'node_modules'),          //排除不使用当前loader的文件
                    path.resolve(__dirname,'src/lib/js')          //排除不使用当前loader的文件
                ]
            },
            {                 //处理css文件
                test: /\.css$/,
                use: ExtractTextPlugin.extract({        //单独生成css文件
                    fallback: 'style-loader',
                    use: ['css-loader'],
                    publicPath: '../'           //设置公共路径，不然处理后找不到文件
                })
            },
            {                 //处理sass文件
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({        //将sass编译后单独生成css文件
                    fallback: 'style-loader',
                    use: ['css-loader','sass-loader'],
                    publicPath: '../'           //设置公共路径，不然处理后找不到文件
                })
            },
            {                 //处理html文件，将html转成字符串
                test: /\.html$/,
                use: [
                    { loader: 'html-loader'}
                ]
            },
            {                 //处理图片文件
                test: /\.(png|jpe?g|gif|svg|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        query: {
                            name: 'assets/[name].[ext]',       //改变打包存储的路径
                            limit: 100                //小于1字节的图片打包成base64，超过的用file-loader打包，不能设置为0
                        }
                    },
                    {
                        loader: 'img-loader',
                        options: {
                            //enabled: process.env.NODE_ENV === 'production',
                            gifsicle: {
                                interlaced: false
                            },
                            mozjpeg: {
                                progressive: true,
                                arithmetic: false
                            },
                            optipng: false, // disabled
                            pngquant: {
                                floyd: 0.5,
                                speed: 2,
                                quality:80
                            },
                            svgo: {
                                plugins: [
                                    { removeTitle: true },
                                    { convertPathData: false }
                                ]
                            }
                        }
                    }
                ]
            },
            {                 //处理MP3 文件，将mp3移动
                test: /\.(mp3|txt|json)$/,
                use: [{
                    loader: 'file-loader',
                    query: {
                        name: '[name].[ext]'       //改变打包存储的路径
                    }}
                ]
            },
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'src/components/clock/index.html',
            filename: 'index.html',
            inject: 'head',
            chunksSortMode: function(chunk1, chunk2){           //引入多个js的时候，排序
                var order = ['vendor', 'common', 'public', 'index'];
                var order1 = order.indexOf(chunk1.names[0]);
                var order2 = order.indexOf(chunk2.names[0]);
                return order1 - order2;
            }
        }),
        /*new htmlWebpackPlugin({
            template: 'src/components/h5jhy/intro.html',
            filename: 'intro.html',
            inject: 'head',
            chunksSortMode: function(chunk1, chunk2){           //引入多个js的时候，排序
                var order = ['vendor', 'common', 'public', 'index'];
                var order1 = order.indexOf(chunk1.names[0]);
                var order2 = order.indexOf(chunk2.names[0]);
                return order1 - order2;
            }
        }),*/
        //new webpack.ProvidePlugin({common: 'common'}),
        new ExtractTextPlugin('css/style.css')              //单独打包css文件,所有的css文件都会打包进这里
]
}