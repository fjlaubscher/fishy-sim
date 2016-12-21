module.exports = {
  entry: './src/js/index.js',
  output: {
    path: './dist/js/',
    filename: "bundle.min.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}