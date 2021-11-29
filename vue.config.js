const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

const port = process.env.port || process.env.npm_config_port || 9006 // dev port

const BASE_API = 'http://assets-web1.c06f9cf677fbc4843940f1eaf7195c4d9.cn-shanghai.alicontainer.com'
// const BASE_API = 'http://47.100.53.251:10023'

module.exports = {
  productionSourceMap: false,
  lintOnSave: true,
  devServer: {
    port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/web': {
        target: BASE_API,
        ws: true,
        changeOrigin: true
      }
    }
  },

  chainWebpack (config) {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }

}
