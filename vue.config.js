// vue.config.js
'use strict'

const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const Proxy = {}
// const Proxy = 'https://test.g4b.cn'
const controller = [
  '/open-platform',
  '/zhkb'
]
controller.map(c => {
  Proxy[c] = {
    target: 'https://test.g4b.cn',
    changeOrigin: true,
    secure: true
  }
})
module.exports = {
  // 部署应用包时的基本 URL。 Default: '/'
  publicPath: process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/',
  // 当运行 vue-cli-service build生产环境构建文件的目录。Default: 'dist'
  outputDir: 'dist',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。Default: ''
  assetsDir: 'static',
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。 Default: 'index.html'
  indexPath: 'index.html',

  // 文件名哈希。Default: true
  filenameHashing: false,

  // 在 multi-page 模式下构建应用。
  pages: undefined,
  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。 Default: 'default'
  // 设置为 true 或 'warning' 时，eslint-loader 会将 lint 错误输出为编译警告。默认情况下，警告仅仅会被输出到命令行，且不会使得编译失败。
  // 设置为'default' 会强制 eslint-loader 将 lint 错误输出为编译错误，同时也意味着 lint 错误将会导致编译失败。
  // 设置为 error 将会使得 eslint-loader 把 lint 警告也输出为编译错误，这意味着 lint 警告将会导致编译失败。
  lintOnSave: process.env.NODE_ENV !== 'production',

  // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
  runtimeCompiler: false,
  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  transpileDependencies: [],

  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。
  // 需要注意的是该选项仅影响由 html-webpack-plugin 在构建时注入的标签 - 直接写在模版 (public/index.html) 中的标签不受影响。
  crossorigin: undefined,
  // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)。如果你构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性。
  integrity: false,
  // webpack基本配置，合并到最终的webpack配置中。
  configureWebpack: {
    // 应用程序的标题
    name: 'vue-single-template',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  // 链式配置webpack
  chainWebpack(config) {
    // config.when(process.env.NODE_ENV === 'development', config => config.devServer.proxy(Proxy))
    // 建议打开预加载，提高第一屏速度
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])
    // 当有很多页面时，会导致太多无意义的请求
    config.plugins.delete('prefetch')

    // https://webpack.js.org/configuration/devtool/#development
    // .when(process.env.NODE_ENV === 'development',
    //   config => config.devtool('cheap-source-map')
    // )
  },
  // 自定义配置css模块
  css: {

    // 只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块
    requireModuleExtension: true,
    // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。Default: 生产环境下是 true，开发环境下是 false
    extract: process.env.NODE_ENV === 'production',
    // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能。Default: false
    sourceMap: true,
    // 向 CSS 相关的 loader 传递选项
    loaderOptions: {
      // 这里的选项会传递给 css-loader
      // css: {},
      // 这里的选项会传递给 postcss-loader
      // postcss: {}
    }
  },
  // 开发服务器配置
  devServer: {
    port: process.env.port || process.env.npm_config_port || 8080,
    open: true,
    // 设置让浏览器 overlay 同时显示警告和错误
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: Proxy
    // before: require('./mock/mock-server.js')
  },
  // 插件配置
  pluginOptions: {
    foo: {
      // 插件可以作为 `options.pluginOptions.foo` 访问这些选项。
    }
  }
}
