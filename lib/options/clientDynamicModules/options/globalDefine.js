// @internal/globalDefine
module.exports = async (options = {}, ctx) => {
  const { cdn } = options
  let cdnStr = '['
  if (cdn)
    for (let m in options.cdn) {
      if (options.cdn[m] !== null) cdnStr += `'${options.cdn[m]}', `
    }
  cdnStr += ']'

  return {
    cdn: cdnStr,
    entryFile: ctx.entryFile
  }
}
