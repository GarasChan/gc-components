const webpack = require('webpack');
// css抽离打包
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 自动打开浏览器的插件
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
// 压缩js插件
const TerserPlugin = require('terser-webpack-plugin');
// 清空打包文件夹
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); 
// 文件拷贝插件
const CopyPlugin = require('copy-webpack-plugin');
// 打包时用到的工具
const { resolve, appName, getVersion } = require('./util');
//用来判断是否是开发环境
const DEV = process.env.NODE_ENV === 'development';
// 包大小分析插件
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// 自动生成html插件，可以自动引入打包生成的资源文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 压缩css插件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: resolve('src/App.jsx'),
    //这个位置的publicPath指定了devServer出包的位置，要用相对路径
    output: {
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js',
        publicPath: './',
        path: resolve('dist')
    },
    module: {
        rules: [
        {
            test: /\.(jsx|js)$/,
            include: resolve('src'),
            // exclude: resolve('node_modules'),
            use: ['babel-loader']
        },
        {
            test: /\.(gif|jpg|jpeg|png|svg)$/,
            include: resolve('src/assets/imgs'),
            exclude: resolve('node_modules'),
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    name: 'assets/imgs/[name].[ext]',
                    publicPath: '../'
                }
            }]
        },
        {
            test: /\.(css|less)$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      publicPath: './',
                      hmr: DEV,
                    },
                },
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [require('autoprefixer')]
                    }
                },
                'less-loader'
            ]
        },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                VERSION: `"${getVersion()}"`,
                NAME: `"${appName}"`
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        // 自动生成html文件
        new HtmlWebpackPlugin({
            template: resolve('index.html')
        }),
        new OpenBrowserPlugin({ url: 'http://127.0.0.1:4290' }),
        new webpack.HotModuleReplacementPlugin() 
    ],
    optimization: {
        // 提取入口文件
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,    
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                vendors:{
                    // node_modules内的依赖库
                    chunks: function(chunk){
                        // 这里排除antd-icons，避免打包生成的主文件较大  Typography
                        // 这里的name 可以参考在使用`webpack-ant-icon-loader`时指定的`chunkName`
                        return chunk.name !== 'antd-icons'; 
                    },
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    minChunks: 1,
                    maxInitialRequests: 5,
                    minSize: 0,
                    priority: 1,
                    reuseExistingChunk: true
                },
                commons: {
                    // src下文件
                    chunks: 'all',
                    test: /[\\/]src[\\/]/,
                    name: 'commons',
                    minChunks: 3,
                    maxInitialRequests: 5,
                    minSize: 0,
                    priority: 2
                }
            }
        }
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.json', '.less'], //后缀名自动补全
        alias: {
            components: resolve('src/components'),
            style: resolve('style'),
            config: resolve('src/config'),
            assets: resolve('src/assets'),
            util: resolve('src/util')
        }
    },
    devServer: {
        publicPath: '/',
        port: 8086, // 端口
        host: '0.0.0.0', // 主机
        disableHostCheck: true, // 绕过主机检查
        overlay: {
            errors: true
        },
        proxy: {
            // "/dev/datacatalog": {
            //     target: "http://ape.supermapol.com",
            //     pathRewrite: {"^/dev": ""}
            // }
        },
        compress: true, // 启用gzip 压缩
        hot: true, // 热替换
    }
}