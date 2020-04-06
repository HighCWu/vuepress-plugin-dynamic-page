// @internal/globalDefine
module.exports = async (options = {}, ctx) => {
  const { cdn } = options
  let cdnStr = '['
  if (cdn)
    for (let m in options.cdn) {
      if (options.cdn[m] !== null) cdnStr += `'${options.cdn[m]}', `
    }
  cdnStr += ']'

  let entryFilesStr = ''
  for (let i in ctx.entryFiles)
    entryFilesStr += `require('${ctx.entryFiles[i]}')\n`

  return {
    cdn: cdnStr,
    entryFilesStr: entryFilesStr
  }
}
