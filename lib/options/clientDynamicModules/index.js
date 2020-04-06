const { loadOptions, parseTempleteScript } = require('@vpdp/utils')

module.exports = (options, ctx) => async () => {
  options = Object.assign({ cache: true, cdn: { vue: null } }, options)
  ctx.entryFiles = [ctx.getLibFilePath('client/clientEntry.js')]
  
  let optionObj = loadOptions(__dirname, options, ctx)
  let rets = []
  for (let name in optionObj) {
    const filename = name + '.js'
    rets.push({
      name: filename,
      content: parseTempleteScript(await optionObj[name], filename),
      dirname: 'internal'
    })
  }

  return rets
}
