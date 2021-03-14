module.exports = {
  publicPath: "/nomo/",
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
  pwa: {
    name: "nomo",
    themeColor: "#f9f5eb",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "#f9f5eb",
  },
};
