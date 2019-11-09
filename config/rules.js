export default [
  { test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/ },
  {
    test: /\.(sa|sc|c)ss$/i,
    exclude: /node_modules/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins() {
            // eslint-disable-next-line global-require
            return [require('autoprefixer')];
          },
        },
      },
      {
        loader: 'sass-loader',
      },
    ],
  },
  {
    test: /\.(html)$/,
    exclude: [/node_modules/, /index\.html$/],
    use: {
      loader: 'html-loader',
      options: { minimize: true },
    },
  },
  {
    test: /\.(png|jpg|svg|gif|ico)$/,
    use: [
      {
        loader: 'file-loader?name=images/[name].[ext]',
      },
    ],
  },
  { test: /\.css$/, loader: 'style-loader' },
  {
    test: /\.png$/,
    loader: 'url-loader',
    query: { mimetype: 'image/png' },
  },
  {
    test: /\.(eot|woff|woff2|ttf|svg)(\?\S*)?$/,
    loader: 'file-loader?name=fonts/[name].[ext]',
  },
];
