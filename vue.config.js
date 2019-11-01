const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  // devServer:{
  //   proxy:'localhost:3000' , // 代理地址
  // }
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://music.163.com', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
