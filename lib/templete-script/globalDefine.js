/*global globalThis*/
globalThis.global = globalThis

const requireUrlModule = url => {
  let m_tag = document.createElement('script')
  return new Promise((resolve, _) => {
    m_tag.onload = m_tag.onreadystatechange = function() {
      if (
        !this.readyState ||
        this.readyState === 'loaded' ||
        this.readyState === 'complete'
      ) {
        resolve(m_tag)
        m_tag.onload = m_tag.onreadystatechange = null
      }
    }
    m_tag.src = url
    document.body.appendChild(m_tag)
  })
}

let urls = __PLACEHOLDER__(cdn) // eslint-disable-line

const initModules = async () => {
  if (urls.length) {
    let all_modules = []
    urls.forEach(url => {
      all_modules.push(requireUrlModule(url))
    })
    await Promise.all(all_modules)
  }

  __PLACEHOLDER__(entryFilesStr) // eslint-disable-line
}

initModules()
