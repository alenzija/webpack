const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackBundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ESLintPlugin = require('eslint-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => ({
  splitChunks: {
    chunks: 'all',
  },
  minimizer: [new CssMinimizerWebpackPlugin(), new TerserPlugin()],
});

const filename = (ext) => (isProd ? `[name].${ext}` : `[name].[fullhash].${ext}`);

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '',
      },
    },
    'css-loader',
  ];
  if (extra) {
    loaders.push(extra);
  }
  return loaders;
};

const jsLosders = (extra) => {
  const loaders = {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
    },
  };
  if (extra) loaders.options.presets.push(extra);
  return loaders;
};

const pluginsSet = () => {
  const plugins = [
    new HTMLWebpackPlugin({template: './index.html'}),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    new MiniCssExtractPlugin({filename: filename('css')}),
    new ESLintPlugin(),
  ];
  if (isProd) plugins.push(new WebpackBundleAnalyzerPlugin());
  return plugins;
};

module.exports = {
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: './index.jsx',
    analytics: './analytics.ts',
  },
  target: 'web',
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: pluginsSet(),
  resolve: {
    extensions: ['.js', '.json', '.png'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@model': path.resolve(__dirname, 'src/model'),
      '@css': path.resolve(__dirname, 'src/css'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@less': path.resolve(__dirname, 'src/less'),
      '@sass': path.resolve(__dirname, 'src/sass'),
    },
  },
  optimization: optimization(),
  devtool: isDev ? 'source-map' : false,
  devServer: {
    port: 4200,
    hot: isDev,
  },
  module: {
    rules: [
      {test: /\.(png|jpe?g|svg|gif)$/, type: 'asset/resource'},
      {test: /\.(ttf|woff|woff2|eot)$/, type: 'asset/resource'},
      {test: /\.xml$/, use: ['xml-loader']},
      {test: /\.csv$/, use: ['csv-loader']},
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.less$/,
        use: cssLoaders('less-loader'),
      },
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLosders(),
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: jsLosders('@babel/preset-typescript'),
      },

      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: jsLosders('@babel/preset-react'),
      },
    ],
  },
};
