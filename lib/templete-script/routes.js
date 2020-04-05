import Vue from 'vue'
import mdVueRenderer from '@internal/renderer'

__PLACEHOLDER__(headCode) // eslint-disable-line

const cache = __PLACEHOLDER__(cache) // eslint-disable-line

let dynamicPageGetter
try {
  dynamicPageGetter = __PLACEHOLDER__(dynamicCode) // eslint-disable-line
} catch (error) {
  console.warn('Use the default dyanamic page getter.')
  dynamicPageGetter = () => ({
    content: '',
    status: 404
  })
}

let siteData
const initSiteData = () => {
  if (!siteData && Vue.options.computed && Vue.options.computed.$site) {
    siteData = JSON.parse(JSON.stringify(Vue.options.computed.$site()))
    Vue.options.computed.$site = () => siteData
  }
}

Vue.mixin({
  beforeCreate: () => initSiteData()
})

const addRouter = path => {
  const { content, status } = dynamicPageGetter(path)
  let index
  if (status === 404) {
    index = siteData.pages.findIndex(({ path: _path }) => _path === path)
    if (index >= 0) siteData.pages.splice(index, 1)
    return status
  }
  siteData.pages.push(mdVueRenderer(path, content))

  return status
}

// __IGNORED_LINE__
export const routes = [
  __PLACEHOLDER__(tailCodeHead), // eslint-disable-line
  // __IGNORED_LINE__
  {
    // replace router actions
    component: GlobalLayout, // eslint-disable-line
    beforeEnter: (to, from, next) => {
      let newPage = true
      initSiteData()
      for (let index in siteData.pages) {
        if (siteData.pages[index].path === to.path) {
          if (cache) {
            newPage = false
          } else {
            newPage = true
          }
          break
        }
      }
      if (newPage) {
        addRouter(to.path)
      }
      next()
    }
  }
]
