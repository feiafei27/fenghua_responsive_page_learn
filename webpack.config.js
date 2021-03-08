const path = require('path')

module.exports = {
  entry: './index.js',
  mode: "development",
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
