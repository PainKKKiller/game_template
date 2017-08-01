var path = require('path');
var SRC = path.join(__dirname, 'src/');
var NODE_MODULES = path.join(__dirname, 'node_modules/');
var COMMON = path.join(__dirname, '../common/');
var BUILD = path.join(__dirname, 'build/');

const VENDOR_LIBS = [ "axios", "es6-promise", "gsap", "keyboardjs", "lodash", "moment", "pixi-audio", "pixi.js", 
		      "prop-types", "react",  "react-dom", "react-redux", "react-router", "react-router-dom", "redux", "redux-thunk" ];



const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackGitHash = require('webpack-git-hash');


module.exports = {
  entry: {
    bundle: './src/index.js',
    libs: VENDOR_LIBS
  },
  output: {
    path: BUILD,
    publicPath: '/',
    filename: 'js/bundle.[githash].js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: [
          'babel-preset-es2015',
          'babel-preset-react',
          'babel-preset-stage-1'
        ].map(require.resolve)
    } 
  },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
    },
    {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader?limit=8192&name=img/[hash].[ext]'
    } ]
  },
  resolve: {
    modules: [SRC, NODE_MODULES, COMMON],       // root folders for Webpack resolving
    alias: {
      'actions': path.join(SRC, 'actions/'),    // sample alias, calling require('actions/file') will resolve to ./src/actions/file.js
      'comps': path.join(SRC, 'comps/'),
      'managers': path.join(SRC, 'managers/'),
      'reducers': path.join(SRC, 'reducers/'),
      'render': path.join(SRC, 'render/'),
      'selectors': path.join(SRC, 'selectors/'),
      'utils': path.join(SRC, 'utils/'),
      'common' : COMMON
    },  
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './build/'
  },
  plugins: [
    new ExtractTextPlugin("./css/bundle.css"),
	new HtmlWebpackPlugin({
      title: 'Game template',
	  template: 'index.tpl.html',
	  inject: true,
      filename: 'index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'libs', filename: 'js/libs.js' }),
    new WebpackGitHash()
  ]
};
