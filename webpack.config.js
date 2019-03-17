const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AntdScssThemePlugin = require('antd-scss-theme-plugin');

module.exports = {
  // babel-polyfill is required to make async/await work
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      },
      {
        test: /\.html$/,
        use: [
          { loader: 'html-loader' }
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          AntdScssThemePlugin.themify({ loader: 'sass-loader' })
        ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }, // translates CSS into CommonJS
          AntdScssThemePlugin.themify({
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          })
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8000,
            name: 'images/[hash]-[name].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new CopyWebpackPlugin([
      {
        from: 'assets',
        to: 'assets'
      }
    ]),
    new MiniCssExtractPlugin({
      filename: '[name].css' // compile to name according the target scss file
    }),
    new AntdScssThemePlugin('./src/styles/theme/theme.scss')
  ]
};
