const path = require('path');

module.exports = {
    entry: './app.js',
    output: {
        path: path.join(__dirname, '/'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
        {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
            loader: "babel-loader",
            options: {
                presets: ['@babel/preset-env']
            }
            }
        }
        ]
    },
    mode: 'development',
};