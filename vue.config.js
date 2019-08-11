const pxtorem = require("postcss-pxtorem")
module.exports = {
  // publicPath: '/wxzf/dist/', // 打包文件相对路径
  // devServer: {
  //   open: true,
  //   host: 'localhost',
  //   port: 8080,
  //   https: false,
  //   hotOnly: false,
  //   proxy: {
  //     // 配置跨域
  //     '/api': {
  //       target: 'https://box.maoyan.com/promovie/api/',
  //       ws: true,
  //       changOrigin: true,
  //       pathRewrite: {
  //         '^/api': ''
  //       }
  //     }
  //   },
  //   before: app => { }
  // },

  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          pxtorem({
            rootValue: 37.5,
            propList: ['*']
          })
        ]
      },
      less: {
        modifyVars: {
          'nav-bar-background-color': '#fff'
        }
      }
    }
  }
};
