import matter from 'gray-matter'
import toml from 'toml'
import hash from 'hash-sum'
import Vue from 'vue'

const parseFrontmatter = content => {
  return matter(content, {
    // eslint-disable-next-line @typescript-eslint/camelcase
    excerpt_separator: '<!-- more -->',
    engines: {
      toml: toml.parse.bind(toml)
    }
  })
}

const md = require('markdown-it')()

const mdVueRenderer = (path, content) => {
  const key = 'v-' + hash(path)
  const { data, content: mdSrc } = parseFrontmatter(content)
  Vue.component(key, {
    template: md.render(mdSrc) // `<template>${md.render(mdSrc)}</template>`
  })

  return {
    path,
    key,
    frontmatter: data
  }
}

export default mdVueRenderer
