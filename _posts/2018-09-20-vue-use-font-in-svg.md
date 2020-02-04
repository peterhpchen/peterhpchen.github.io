---
layout: post
title: "在 Vue.js 專案中的 svg 檔裡使用客製的字型"
date: 2018-09-21 01:00 +0800
tags: [vue, svg, font]
---

> 當在 svg 檔中需要有文字，而文字的字型卻是客製的時候，會發生在 svg 中的文字無法吃到 @font-face 設定的字型，本文紀錄解決方法。

## 原因

使用 `<img>` 載入 svg 檔時，它會將檔案以 Base64 編碼，因此你看到的 `src` 值會像下面這樣:

```html
<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iOTNweCIgaGVpZ2h0PSI0OHB4IiB2aWV3Qm94PSIwIDAgOTMgNDgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUxLjEgKDU3NTAxKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5idG4vbWFpbi9jYW5jZWwvbm9ybWFsPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9ImJ0bi9tYWluL2NhbmNlbC9ub3JtYWwiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtMyIgZmlsbC1ydWxlPSJub256ZXJvIiB4PSIwIiB5PSIwIiB3aWR0aD0iOTMiIGhlaWdodD0iNDgiPjwvcmVjdD4KICAgICAgICA8dGV4dCBpZD0iQ0FOQ0VMIiBmb250LWZhbWlseT0iUm9ib3RvIiBmb250LXNpemU9IjE2IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzc4Nzg3OCI+CiAgICAgICAgICAgIDx0c3BhbiB4PSIxNi4xNjc5Njg4IiB5PSIyNyI+Q0FOQ0VMPC90c3Bhbj4KICAgICAgICA8L3RleHQ+CiAgICA8L2c+Cjwvc3ZnPgo=">
```

這樣的做法圖的確會出來，但因為已經轉換為 Base64 了，這個 svg 已經不再是 html 的 tag 所組成，因此在 `@font-face` 定義的客製字型自然也就吃不到了。

## 解決方法

解決問題的辦法就是不要將其編碼，用原來的 svg 程式碼加到 html 中，這樣的載入方式稱為 inline ，程式碼如下面所示:

```html
<svg width="93px" height="48px" viewBox="0 0 93 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 51.1 (57501) - http://www.bohemiancoding.com/sketch -->
    <title>btn/main/cancel/normal</title>
    <desc>Created with Sketch.</desc>
    <defs></defs>
    <g id="btn/main/cancel/normal" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <rect id="Rectangle-3" fill-rule="nonzero" x="0" y="0" width="93" height="48"></rect>
        <text id="CANCEL" font-family="Roboto" font-size="16" font-weight="bold" fill="#787878">
            <tspan x="16.1679688" y="27">CANCEL</tspan>
        </text>
    </g>
</svg>
```

這樣就可以吃到客製的 `Roboto` 字型了。

## 解法的難處

這樣的解法雖然解決了字型的問題，但在實作上會十分麻煩，需要將 svg 檔的程式碼複製然後貼至對應的 html 位置，而且使用多次的圖片會在程式碼中被重複貼上，造成維護上的困難。

## 更好的解決方法

### vue-svg-inline-loader

[vue-svg-inline-loader](https://github.com/oliverfindl/vue-svg-inline-loader) 提供了將載入的 svg 置換為 inline 形式的功能:

1. Install `vue-svg-inline-loader`

```bash
npm install vue-svg-inline-loader --save-dev
```

2. Add Webpack Config

```js
{
  ...
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          ...
          {
            loader: 'vue-svg-inline-loader'
          }
        ]
      },
      ...
    ]
  },
  ...
}
```

3. Add `svg-inline` directive to img tag

```html
<img svg-inline src="./assets/img/normal.svg">
```

### vue-svg-loader

[vue-svg-loader](https://github.com/visualfanatic/vue-svg-loader) 提供了將載入的 svg 用 vue component 的形式載入，底子裡還是把 svg 的 html 賦予給 component。

1. Install `vue-svg-loader`

```bash
npm i -D vue-svg-loader
```

2. Add Webpack Config

```js
{
  ...
  module: {
    rules: [
      ...
      {
        test: /\.svg$/,
        loader: 'vue-svg-loader',
      },
      ...
    ]
  },
  ...
}
```

3. Import svg component

```html
<template>
  <div id="app">
    ...
    <normal />
    ...
  </div>
</template>

<script>
...
import normal from './assets/img/normal.svg'

export default {
  name: 'App',
  components: {
    ...
    normal
  },
  ...
}
</script>
```

這兩個方式都可以達成目的又減輕開發的負擔。

## Demo

[GitHub](https://github.com/peterhpchen/vue-font-in-svg)

## 參考資料

* [Using Custom Fonts With SVG in an Image Tag](https://css-tricks.com/using-custom-fonts-with-svg-in-an-image-tag/)
* [vue-svg-inline-loader](https://github.com/oliverfindl/vue-svg-inline-loader)
* [vue-svg-loader](https://github.com/visualfanatic/vue-svg-loader)