const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const deps = require('./package.json').dependencies;
const path = require('path')

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3001,
  },
  // cache: false,
  // devtool: 'source-map',
  // optimization: {
  //   minimize: false,
  // },

  output: {
    publicPath: 'auto',
    // publicPath: 'http://localhost:3001/',
  },

  // resolve: {
  //   extensions: ['.jsx', '.js', '.json'],
  // },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(gif|jpe?g|tiff|png|svg|webp|bmp)$/,
        exclude: /node_modules/,
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'app1',
      // library: { type: 'var', name: 'app1' },
      // filename: 'remoteEntry.js',
      shared: {
        // ...deps,
        react: {
          singleton: true, // only a single version of the shared module is allowed
        },
        'react-dom': {
          singleton: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
