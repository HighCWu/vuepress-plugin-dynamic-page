const webpack = require('webpack')
const { env } = require('@vuepress/shared-utils')
const Build = require('@vuepress/core/lib/node/build')

const { render: buildRender } = Build.prototype

Object.assign(Build.prototype, {
  async render() {
    const stats = await compile(this.clientConfig)
  }
})

/**
 * Compile a webpack application and return stats json.
 *
 * @param {Object} config
 * @returns {Promise<Object>}
 */

function compile (config) {
  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err) {
        return reject(err)
      }
      if (stats.hasErrors()) {
        stats.toJson().errors.forEach(err => {
          console.error(err)
        })
        reject(new Error(`Failed to compile with errors.`))
        return
      }
      if (env.isDebug && stats.hasWarnings()) {
        stats.toJson().warnings.forEach(warning => {
          console.warn(warning)
        })
      }
      resolve(stats.toJson({ modules: false }))
    })
  })
}

module.exports = () => ({})