const webpack = require('webpack');
// 清空打包文件夹
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 压缩js插件
const TerserPlugin = require('terser-webpack-plugin');
// 打包时用到的工具
const { resolve, name, version, description, logo } = require('./util');

const config = {
    mode: 'none',
    devtool: 'source-map',
    entry: {
        'gc-components': './components/index.ts'
    },
    output: {
        path: resolve('dist'),
        library: 'gc',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        filename: '[name].min.js'
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts)?$/,
                include: resolve('components'),
                exclude: resolve('node_modules'),
                use: ['babel-loader', 'ts-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            verbose: true
        }),
        // 在打包的文件之前 加上版权说明
        new webpack.BannerPlugin(` ${logo} \n ${name} \n ${description} \n version: ${version} \n`)
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            })
        ],
        noEmitOnErrors: true
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.less']
    },
    externals: {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
        }
    }
};

module.exports = config;
