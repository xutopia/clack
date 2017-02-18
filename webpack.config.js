const webpack = require('webpack');
const path = require('path');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const sourcePath = path.join(__dirname, './src');
const staticsPath = path.join(__dirname, './static');

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    filename: 'vendor.js',
  }),
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(nodeEnv) },
    BASE_URL: JSON.stringify('http://localhost:8080'),
  }),
  new webpack.NamedModulesPlugin(),
];

if (isProd) {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
    }),
  );
} else {
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
  );
}

module.exports = {
  devtool: isProd ? 'source-map' : 'eval',
  context: sourcePath,
  entry: {
    app: [
      'babel-polyfill',
      'webpack-hot-middleware/client',
      './index.js',
    ],
    vendor: ['react'],
  },
  output: {
    path: staticsPath,
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: 'file-loader?name=[name].[ext]',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.png$/,
        use: 'file-loader?name=[md5:hash:base64:10].[ext]',
      }, {
        test: /\.jpg$/,
        use: 'file-loader?name=[md5:hash:base64:10].[ext]',
      },
      {
        test: /\.gif$/,
        use: 'file-loader?name=[name].[ext]',
      }, {
        test: /\.json$/,
        use: 'json',
      }, {
        test: /\.md$/,
        use: 'file-loader?name=[name].[ext]',
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.scss', '.css'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      sourcePath,
    ],
  },
  plugins,
  devServer: {
    contentBase: './src',
    historyApiFallback: true,
    proxy: {
      '/': 'http://localhost:3000'
    },
    compress: isProd,
    inline: true,
    hot: true,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: true,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      },
    },
  },
};
