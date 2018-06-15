/* @flow */
/* eslint import/no-nodejs-modules: off */

const path = require('path');
const qs = require('querystring');

const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


const FILE_NAME = 'easyscale';
const MODULE_NAME = 'EasyScale';

const DEFAULT_VARS = {
    __TEST__: false,
    __MIN__: false,
    __IE_POPUP_SUPPORT__: false,
    __CHILD_WINDOW_ENFORCE_LOG_LEVEL__: false,
    __SEND_POPUP_LOGS_TO_OPENER__: false,
    __POPUP_SUPPORT__: false,
    __ALLOW_POSTMESSAGE_POPUP__: true,
    __DEFAULT_CONTEXT__: 'iframe'
};

function getWebpackConfig({
    filename,
    modulename,
    minify = false,
    options = {},
    vars = {}
}) {
    vars = {
        ...DEFAULT_VARS,
        ...vars
    };

    const PREPROCESSOR_OPTS = {
        'ifdef-triple-slash': 'false',
        ...vars
    };

    const SERIALIZED_VARS = (() => {
        let result = {};
        for (let key of Object.keys(vars)) {
            result[key] = JSON.stringify(vars[key]);
        }
        return result;
    })();

    return {
        entry: './src/zoid/index.js',

        output: {
            path: path.resolve('./build'),
            filename,
            libraryTarget: 'umd',
            umdNamedDefine: true,
            library: modulename,
            pathinfo: false
        },

        resolve: {
            modules: [__dirname, 'node_modules'],
            extensions: ['.js', '.jsx']
        },

        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /(build)/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.(html?|css|json)$/,
                    loader: 'raw-loader'
                }
            ]
        },

        bail: true,

        devtool: 'source-map',

        plugins: [
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map'
            }),
            new webpack.DefinePlugin(SERIALIZED_VARS),
            new webpack.NamedModulesPlugin(),
            new UglifyJSPlugin({
                test: /\.jsx?$/,
                beautify: !minify,
                minimize: minify,
                compress: {
                    warnings: false,
                    sequences: minify
                },
                mangle: minify,
                sourceMap: true
            })
        ],

        ...options
    };
}

let WEBPACK_CONFIG_FRAME = getWebpackConfig({
    filename: `${FILE_NAME}.frame.js`,
    modulename: MODULE_NAME
});

let WEBPACK_CONFIG_FRAME_MIN = getWebpackConfig({
    filename: `${FILE_NAME}.frame.min.js`,
    modulename: MODULE_NAME,
    minify: true,
    vars: {
        __MIN__: true
    }
});


let WEBPACK_CONFIG_TEST = getWebpackConfig({
    filename: `${FILE_NAME}.js`,
    modulename: MODULE_NAME,
    options: {
        devtool: 'inline-source-map'
    },
    vars: {
        __TEST__: true
    }
});


module.exports = [
    WEBPACK_CONFIG_FRAME,
    WEBPACK_CONFIG_FRAME_MIN
];
