const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './public/js/chat.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist/js')
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
