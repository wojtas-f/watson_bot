const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: ['@babel/polyfill', './public/js/chat.js'],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    output: {
        filename: 'chat.bundle.js',
        path: path.resolve(__dirname, 'dist/js'),
        publicPath: '/dist/'
    },
    watch: false,
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [new CopyWebpackPlugin([{ from: 'public/css', to: '../css' }])]
}
