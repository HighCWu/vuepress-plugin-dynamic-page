const { fs, path } = require('@vuepress/shared-utils')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = (options = {}, ctx) => (config, isServer) => {
  const { cdn } = options
  // add global variables before entry files
  const internalDir = config.resolve.alias.get('@internal')
  const globalDefineJs = path.join(internalDir, 'globalDefine.js')

  if (!isServer) {
    config.entry('app').clear()
    config.entry('app').add(globalDefineJs)
    config.resolve
      .alias
        .set('@vpdp', path.join(__dirname, '..', '..'))

    config.optimization.minimize(true)

    config.target('web')

    config
      .plugin('html')
      .use(require('vuepress-html-webpack-plugin'), [{
        template: ctx.devTemplate
      }])

    config
      .plugin('html2')
      .use(require('vuepress-html-webpack-plugin'), [{
        filename: '404.html',
        template: ctx.devTemplate
      }])

    const publicDir = path.resolve(ctx.sourceDir, '.vuepress/public')
    if (fs.existsSync(publicDir)) {
      config
        .plugin('copy')
        .use(CopyPlugin, [[
          { from: publicDir, to: outDir }
        ]])
    }
    
    if (!(cdn && cdn.vue))
      config.resolve.alias.set('vue$', 'vue/dist/vue.esm.js')
    else config.externals({ vue: 'Vue' })

  } 
}
