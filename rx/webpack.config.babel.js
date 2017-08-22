import { resolve } from 'path'

import CopyWebpackPlugin from 'copy-webpack-plugin'

export default {
  context: resolve(__dirname, './src/client'),
  entry: './entry',
  devtool: '#source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            ['env', {
              targets: {
                browsers: 'last 2 chrome versions',
              },
              modules: false,
              useBuiltIns: true,
            }],
            'react',
          ],
          plugins: [
            'transform-object-rest-spread',
          ],
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'index.html', to: 'index.html' },
    ]),
  ],
  devServer: {
    historyApiFallback: true,
  },
}
