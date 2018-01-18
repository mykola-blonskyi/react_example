require('dotenv').load();

var Path = require('path');
var WebPack = require('webpack');
var HTMLPlugin = require('html-webpack-plugin');

var folders = {
  src: Path.resolve(__dirname, 'app'),
  dist: Path.resolve(__dirname, 'static')
};

module.exports = {
  target: 'web',
  context: folders.src,
  entry: ['./index'],
  output: {
    path: folders.dist,
    publicPath: './',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new WebPack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new WebPack.optimize.OccurrenceOrderPlugin(),
    new WebPack.optimize.DedupePlugin(),
    new HTMLPlugin({
      template: Path.resolve(folders.src, 'index.html'),
      filename: 'index.html',
      hash: false,
      inject: 'body'
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  module.exports.output.publicPath = './';
  module.exports.devtool = 'source-map';
  module.exports.plugins.push(
    new WebPack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true
      }
    })
  );
}

if (process.env.NODE_ENV === 'development') {
  module.exports.devtool = 'cheap-module-eval-source-map';
  module.exports.plugins.push(new WebPack.HotModuleReplacementPlugin(), new WebPack.NoErrorsPlugin());
}
