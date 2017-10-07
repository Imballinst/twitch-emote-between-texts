// Webpack config
const webpack = require('webpack');
const path = require('path');

const ManifestPlugin = require('webpack-manifest-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const NodeObjectHash = require('node-object-hash')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const nodeEnv = process.env.NODE_ENV;
const isProd = nodeEnv === 'production';

const cachePath = path.join(__dirname, './node_modules/.cache');
const resourcePath = path.join(__dirname, './resources/assets');
const buildPath = path.join(__dirname, './public');

// Common plugins
const plugins = [
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
  }),
  new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en|id)$/),
];

// Common loaders
const imageLoader = [];
const loaders = [
  {
    test: /\.(jsx|js)$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
  },
  {
    test: /\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
    use: isProd ? 'file-loader?publicPath=../&name=fonts/[name].[hash].[ext]' :
                  'file-loader?name=fonts/[name].[ext]'
  },
  {
    test: /.*\.(gif|png|jpe?g)$/i,
    loaders: imageLoader
  }
];

// Configure plugins and loaders depending on environment settings
if (isProd) {
  plugins.push(
    new HardSourceWebpackPlugin({
      cacheDirectory: `${cachePath}/hard-source/[confighash]`,
      recordsPath: `${cachePath}/hard-source/[confighash]/records.json`,
      configHash: NodeObjectHash({sort: false}).hash,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['index'],
      minChunks: ({ resource }) => /node_modules/.test(resource),
    }),
    new WebpackMd5Hash(),
    new ManifestPlugin(),
    new ChunkManifestPlugin({
      filename: 'chunk-manifest.json',
      manifestVariable: 'webpackManifest'
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].[chunkhash].css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      title: 'Twitch Emote Between Texts',
      filename: '../index.html',
      inject: true,
      template: '../../resources/views/index-prod.ejs',
    })
  );

  imageLoader.push(
    'file-loader?name=img/[name].[hash].[ext]',
    {
      loader: 'image-webpack-loader',
      query: {
        optipng: {
          quality: '65-90',
          speed: 4,
          optimizationLevel: 7,
          interlaced: false
        },
        gifsicle: {
          quality: '65-90',
          speed: 4,
          optimizationLevel: 7,
          interlaced: false
        },
        mozjpeg: {
          quality: '65-90',
          speed: 4,
          optimizationLevel: 7,
          interlaced: false,
          progressive: true
        }
      }
    }
  );

  loaders.push(
    {
      test: /\.(css|scss)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader!sass-loader',
      }),
    }
  );
} else {
  plugins.push(new webpack.HotModuleReplacementPlugin());
  imageLoader.push('file-loader?name=img/[name].[ext]');
  loaders.push({
    test: /\.(css|sass|scss)$/,
    use: ['style-loader', 'css-loader', 'sass-loader',]
  });
}

// Configuration
module.exports = {
  devtool: isProd ? 'source-map' : 'eval',
  context: resourcePath,
  entry: {
    'index': './js/index.js',
  },
  output: {
    path: buildPath + '/assets/',
    filename: isProd ? 'js/[name].[chunkhash].js' : 'js/[name].js',
    chunkFilename: isProd ? 'js/[name].[chunkhash].js' : 'js/[name].js',
    publicPath: 'assets/'
  },
  module: {
    loaders: loaders
  },
  resolve: {
    modules: [
      resourcePath,
      path.resolve(__dirname, 'node_modules')
    ],
  },
  plugins,
  devServer: {
    contentBase: './resources/views',
    historyApiFallback: true,
    port: 3000,
    hot: true,
    inline: true
  }
};
