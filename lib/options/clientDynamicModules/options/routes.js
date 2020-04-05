const { stringify } = require('@vpdp/utils')

// @internal/routes
module.exports = async (options, ctx) => {
  options = Object.assign(
    {
      dynamicCode: `require('@source/.vuepress/dynamic').default`
    },
    options
  )
  const {
    content: srcCode
  } = await require('@vuepress/core/lib/node/internal-plugins/routes')(
    {},
    ctx
  ).clientDynamicModules()

  const splitStr1 = `export const routes`
  const splitStr2 = `path: '*'`
  const [headCode, tailCode] = srcCode.split(splitStr1)
  const tailCodeHead = splitStr1 + tailCode.split(splitStr2)[0] + splitStr2

  return {
    headCode,
    appOptions: stringify(ctx.options),
    cache: options.cache ? 'true' : 'false',
    dynamicCode: options.dynamicCode,
    tailCodeHead
  }
}
