const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const entry = {
    index: './client/src/app.js'
}

const output = {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'client', 'dist'),
    publicPath: '/',
}

const optimization = {
    moduleIds: 'hashed', //Prevent from order change on optimization
    runtimeChunk: 'single',
    splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                name(module) {
                  const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                  return `${packageName.replace('@', '')}`;
                }
            }
        }
    }
}

const plugins = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './client/src/index.html'
    }),
    new MiniCssExtractPlugin({
        filename: 'common.[contenthash].css',
        chunkFilename: '[id].[contenthash].css'
    })
]

const __module = {
    rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules | test | server)/,
            include: path.resolve(__dirname, 'client', 'src'),
            loader: 'babel-loader?compact=false'
        },
        {
            test: /\.html$/,
            loader: 'html-loader'
        },
        {
            test: /\.s?[ac]ss$/i,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        esModule: true,
                    }
                },
                'css-loader',
                'sass-loader'
            ]
        },
        {
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            loader: 'url-loader',
            options: {
              limit: 10000
            }
        }
    ]
}

module.exports = {
    entry,
    output,
    optimization,
    plugins,
    module: __module,
}
