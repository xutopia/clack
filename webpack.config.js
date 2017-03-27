const { resolve } = require('path')
const webpack = require('webpack')

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    './index.js'
  ],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  context: resolve(__dirname, 'src/'),
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'dist'),
    publicPath: '/',
    proxy: {
      '/': 'http://localhost:3000'
    },
    stats: {
      assets: true,
      assetsSort: "field",
      cached: true,
      children: true,
      chunks: false,
      colors: true,
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?modules',
          'postcss-loader',
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}
