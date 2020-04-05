const { path } = require('@vuepress/shared-utils')

module.exports = (options = {}, _) => (config, isServer) => {
  const { cdn } = options
  // add global variables before entry files
  const internalDir = config.resolve.alias.get('@internal')
  const globalDefineJs = path.join(internalDir, 'globalDefine.js')

  if (!isServer) {
    config.entry('app').clear()
    config.entry('app').add(globalDefineJs)

    if (!(cdn && cdn.vue))
      config.resolve.alias.set('vue$', 'vue/dist/vue.esm.js')
    else config.externals({ vue: 'Vue' })
  }
}
