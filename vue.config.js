module.exports = {
  lintOnSave: false,
  devServer: {
    hot: false,
    liveReload: false,
    inline: false
  },
  // assetsDir: 'assets',
  // productionSourceMap: false,
  // configureWebpack: {
  //   performance: {
  //     maxAssetSize: 3000000000, // 最大资产大小（以字节为单位）
  //     maxEntrypointSize: 30000000000, // 最大入口点大小（以字节为单位）
  //     hints: 'warning' // 设置为 'warning'、'error' 或 false
  //   }
  // },
  // 設置 publicPath
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'           // 生產環境 (npm run build)
    : '/'           // 開發環境 (npm run serve)
};
