const { fs, path } = require('@vuepress/shared-utils')

require('node-require-alias').setAlias({
  '@vpdp': __dirname
})

module.exports.loadOptions = (dir, ...args) => {
  const dirname = path.join(dir, 'options')
  let files = fs.readdirSync(dirname)
  let optionObj = {}
  files.forEach(filename => {
    filename = filename.split('.js')[0]
    let moduleName = require.resolve(path.join(dirname, filename))
    optionObj[filename] = require(moduleName)(...args)
  })
  return optionObj
}

module.exports.parseTempleteScript = (vars, filename) => {
  filename = path.join(__dirname, 'templete-script', filename)
  let content = fs.readFileSync(filename, 'utf-8')
  let start_idx = 0
  let end_idx = 0
  let replaceArr = []
  while (start_idx > -1) {
    start_idx = content.indexOf('__PLACEHOLDER__(', start_idx)
    end_idx = content.indexOf(')', start_idx + 1)
    if (start_idx > -1 && end_idx > -1)
      replaceArr.push(
        content.substring(start_idx + '__PLACEHOLDER__('.length, end_idx)
      )
    if (start_idx > -1) start_idx = end_idx
  }
  replaceArr.forEach(key => {
    if (typeof vars[key] === 'undefined') throw `Key { ${key} } needed!` // eslint-disable-line
    content = content.replace(`__PLACEHOLDER__(${key})`, vars[key])
  })
  let contentLines = content.split('\n')
  contentLines.forEach((line, index) => {
    if (line.includes('// __IGNORED_LINE__')) {
      contentLines[index + 1] = ''
    }
  })

  return contentLines.join('\n')
}

/**
 * Stringify object with function maintained
 * @param {object} obj object to be stringified
 * @returns {string} stringified object
 */
module.exports.stringify = obj => {
  const placeholder = '____PLACEHOLDER____'
  let fns = []
  let json = JSON.stringify(
    obj,
    (_, value) => {
      if (typeof value === 'function') {
        fns.push(value)
        return placeholder
      }
      return value
    },
    2
  )
  json = json.replace(new RegExp('"' + placeholder + '"', 'g'), () => {
    return fns.shift()
  })
  return json
}
