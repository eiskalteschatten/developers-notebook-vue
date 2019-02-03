const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const isElectron = process.env.WEBPACK_TARGET === 'electron';
const plugins = [
    new VueLoaderPlugin()
];

if (!isElectron) {
    plugins.push(new webpack.IgnorePlugin(/^electron$/));
}

const commonConfig = {
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                    // the "scss" and "sass" values for the lang attribute to the right configs here.
                    // other preprocessors should work out of the box, no loader config like this necessary.
                    'scss': [
                        'vue-style-loader',
                        'css-loader',
                        'sass-loader'
                    ],
                    'sass': [
                        'vue-style-loader',
                        'css-loader',
                        'sass-loader?indentedSyntax'
                    ]
                }
            }
        },
        {
            resourceQuery: /blockType=i18n/,
            type: 'javascript/auto',
            loader: '@kazupon/vue-i18n-loader'
        },
        {
            test: /\.css$/,
            use: [
                'vue-style-loader',
                'css-loader'
            ],
        },
        {
            test: /\.scss$/,
            use: [
                'vue-style-loader',
                'css-loader',
                'sass-loader'
            ],
        },
        {
            test: /\.sass$/,
            use: [
                'vue-style-loader',
                'css-loader',
                'sass-loader?indentedSyntax'
            ],
        },
        {
            test: /\.(png|jpg|gif|svg|woff|woff2|ttf|eot)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'resources',
                publicPath: 'dist/resources'
            }
        }]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map',
    plugins,
    mode: process.env.NODE_ENV !== 'test' ? process.env.NODE_ENV : 'development'
};

module.exports = [
    Object.assign({}, commonConfig, {
        target: isElectron ? 'electron-renderer' : 'web',
        entry: {
            app: isElectron
                ? path.resolve(__dirname, 'src', 'appElectron.js')
                : path.resolve(__dirname, 'src', 'app.js')
        },
        output: {
            filename: isElectron ? 'electron.js' : 'index.js',
            path: path.resolve(__dirname, 'public', 'dist')
        }
    })
];

// if (process.env.NODE_ENV === 'production') {
//     module.exports.devtool = '#source-map';
//     // http://vue-loader.vuejs.org/en/workflow/production.html
//     module.exports.plugins = (module.exports.plugins || []).concat([
//         new webpack.DefinePlugin({
//             'process.env': {
//                 NODE_ENV: '"production"'
//             }
//         }),
//         new webpack.optimize.UglifyJsPlugin({
//             sourceMap: true,
//             compress: {
//                 warnings: false
//             }
//         }),
//         new webpack.LoaderOptionsPlugin({
//             minimize: true
//         })
//     ]);
// }
