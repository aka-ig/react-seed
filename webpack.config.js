const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html',
    minify: false
  })],
};

const devConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    liveReload: true,
    open: true,
    proxy: {
      '/api': 'http://localhost:3100',
    },
  },
};

const prodConfig = {
  mode: 'production'
};

module.exports = (env, args) => {
  switch(args.mode) {
    case 'dev':
    case 'development':
      return Object.assign(baseConfig, devConfig);
    default:
      return Object.assign(baseConfig, prodConfig);
  }
};
