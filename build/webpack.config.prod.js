const webpack = require('webpack');
// css抽离打包
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 清空打包文件夹
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 打包时用到的工具
const { resolve, name, version, description, logo } = require('./util');
// 压缩css插件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    mode: 'production',
    devtool: "#source-map",
    entry: {
        'gc-components': ['./components/index.ts']
    },
    output: {
        path: resolve('dist'),
        library: "gc",
        libraryTarget: "umd",
        umdNamedDefine: true,
        filename: "[name].min.js"
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts|js)$/,
                include: resolve('components'),
                exclude: resolve('node_modules'),
                use: ['babel-loader']
            },
            {
                test: /\.(css|less)$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        name: 'assets/images/[name].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            verbose: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        // 在打包的文件之前 加上版权说明
        new webpack.BannerPlugin(` ${logo} \n ${name} \n ${description} \n version: ${version} \n`),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: "styles",
                    test: /\.less$/,
                    chunks: "all",
                    enforce: true
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /\.css\.*(?!.*map)/g, //注意不要写成 /\.css$/g
                cssProcessor: require("cssnano"),
                cssProcessorOptions: {
                    discardComments: { removeAll: true },
                    safe: true,
                    autoprefixer: false
                },
                canPrint: true
            })
        ],
        noEmitOnErrors: true
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.less', '.css'] //后缀名自动补全
    },
    externals: {
        react: {
            root: "React",
            commonjs2: "react",
            commonjs: "react",
            amd: "react"
        },
        "react-dom": {
            root: "ReactDOM",
            commonjs2: "react-dom",
            commonjs: "react-dom",
            amd: "react-dom"
        }
    }
}