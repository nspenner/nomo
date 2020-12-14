module.exports = {
  configureWebpack: {
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.worker\.js$/,
          use: { loader: "worker-loader" },
        },
      ],
    },
  },
};
