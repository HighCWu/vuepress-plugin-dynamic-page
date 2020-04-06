# vuepress-plugin-dynamic-page

[![NPM version](https://badgen.net/npm/v/vuepress-plugin-dynamic-page)](https://npmjs.com/package/vuepress-plugin-dynamic-page) [![NPM downloads](https://badgen.net/npm/dm/vuepress-plugin-dynamic-page)](https://npmjs.com/package/vuepress-plugin-dynamic-page)


> `vuepress-plugin-dynamic-page` - Make your static vuepress site dynamic.

**Warning: This plugin will make your site lose the SSR feature.**

## Features

This plugin help render the markdown files on the client side.

(New dynamic page does not use default markdown renderer plugins. This is the plugin next developing step.)

## Install

```bash
yarn add -D vuepress-plugin-dynamic-page
# OR npm install -D vuepress-plugin-dynamic-page
```

## Usage

```javascript
module.exports = {
  plugins: ['dynamic-page']
}
```

### Passing Options

```javascript
module.exports = {
  plugins: ['dynamic-page', {
    cache: true,
    cdn: {
      vue: '<YOUR-VUE-CDN-URL>'
    },
    dynamicCode: `require('@source/.vuepress/dynamic').default`
  }]
}
```

## Options

### cache

- Type: `Boolean`
- Default: `true`

Use the cached page if the path has been loaded once. 

### cdn

- Type: `Object`
- Default: `cdn: {
      vue: null
    }`

Add CDN using for some modules.

### dynamicCode

- Type: `String`
- Default: `'require('@source/.vuepress/dynamic').default'`

Way to dynamically load your pages

## Author

**vuepress-plugin-dynamic-page** © [HighCWu](https://github.com/HighCWu), Released under the [MIT](./LICENSE) License.<br>

> [github.com/HighCWu](https://github.com/HighCWu) · GitHub [@HighCWu](https://github.com/HighCWu) 
