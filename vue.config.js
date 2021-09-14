module.exports = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [],
    },
  },
  devServer: {
    open: false,
    proxy: {
      "/api": {
        target: "https://support-api.asoulfan.com/api",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },
};
