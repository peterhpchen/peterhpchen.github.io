---
layout: post
title:  "使用 vue cli 建立 NPM package"
date:   2019-03-24 16:00:00 +0800
categories: vue, vue-cli
---

> 在寫程式的時候，常會有需要可以重複使用的代碼或是元件的情形，而這些很有可能對其他的開發者來說也十分的有用，這時候我們就可以把這些代碼或是元件包成 NPM 的 package 並且發布上 NPM ，一方面可以更有效的管理這些元件，另外也可以幫助到需要使用相同功能的開發者，貢獻開源專案。

本文將會介紹如何使用 Vue CLI 來發布 Vue 的元件到 NPM 上。

## 前置條件

* [安裝 Vue CLI 3](https://cli.vuejs.org/guide/installation.html)
* 建立專案: `vue create [library name]`

## 開發元件

在 `components` 的資料夾中，我們可以開發這個庫需要的各種元件，用一般在專案的開發方式即可。

## 建置腳本

等到都開發完了以後，就要做建置的動作，建置時我們不能使用平常的專案建置方式，而是要改為使用建置 plugin 的方式。

* 在 `src/components` 資料夾下建立 `index.js` :

```js
import component from './Triangle.vue';

// Vue 安裝 Plugin 時 ( Vue.use ) 會叫用 install 函式，在此時註冊元件
export function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('VTriangle', component);
}

// 建立 Plugin 物件
const plugin = {
  install,
};

// 如果使用全域 Vue 物件 (例如 <script> 載入) 時直接使用 Plugin
let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

// 在 Local 引入時要直接使用元件
export default component;
```

## 建置指令

Vue CLI 有提供建置 package 的指令:

```js
{
  ...
  "scripts": {
    ...
    "build-bundle": "vue-cli-service build --target lib --name v-triangle ./src/components/index.js",
  },
  ...
}
```

* `target` 要設為 `lib` 表示要建立為 package 。
* `name` 為此 package 的名稱。
* 入口要改為我們剛剛建立的 `src/components/index.js` 腳本檔。

現在一切準備就緒了，下 `yarn build-bundle` 執行建置，建置好後會在 dist 出現幾個檔案:

```shell
File                          Size                   Gzipped

dist/v-triangle.umd.min.js    22.52 KiB              6.99 KiB
dist/v-triangle.umd.js        61.47 KiB              13.57 KiB
dist/v-triangle.common.js     61.08 KiB              13.45 KiB
```

* `umd` : 直接在 browser 上或是 AMD Loader 使用。
* `common` : CommonJS 使用。

## 設定 package.json

在發布上 npm 之前，可以將此庫的介紹及資訊寫在 package.json 上，在 `publish` 時，這些資訊會被 npm 所讀取並且顯示在 package 的資訊頁上，下面列了幾個我使用到的資訊:

```js
{
  "name": "v-triangle",
  "version": "0.1.1",
  "description": "Simple triangle icon which made by html element.",
  "author": "Peter Chen <peterhsinpingchen@gmail.com> (https://github.com/peterhpchen)",
  "bugs": {
    "url": "https://github.com/peterhpchen/v-triangle/issues"
  },
  "homepage": "https://github.com/peterhpchen/v-triangle",
  "jsdelivr": "dist/v-triangle.umd.js",
  "keywords": [
    "vue"
  ],
  "license": "MIT",
  "main": "dist/v-triangle.common.js",
  "repository": {
    "type": "git",
    "url": "https://github.com/peterhpchen/v-triangle"
  },
  "unpkg": "dist/v-triangle.umd.js"
}
```

大多都滿直觀的，都是一些跟此 package 相關的資訊，比較需要注意的有下面幾個:

* `main`: npm 抓取的檔案。
* `unpkg`: unpkg 抓取的檔案。
* `jsdelivr`: jsdelivr 抓取的檔案。

每個服務都需要設定個預設抓去的檔案， `unpkg` 及 `jsdelivr` 需要使用 `umd` 的來源。

## 登入 npm

在 npm 中註冊帳號後，使用 `npm login` 登入。

## 發布 package

```shell
npm publish
```

接著就可以在 npm 上看到剛剛上傳的 package 了。

## Demo

這次的文章是因為自己想要把 v-triangle 這個簡單的元件分享出來而研究的， 需要參考的可以去看一下這個庫。

[v-triangle](https://www.npmjs.com/package/v-triangle)

## 結論

只要使用 library 的建置方式，再加上 npm 所需的資訊就可以發布 package 了，是不是很方便呢~~~。

## 參考資料

* [Divyam Rastogi: How to create, publish and use your own VueJS Component library on NPM using @vue/cli 3.0](https://medium.com/justfrontendthings/how-to-create-and-publish-your-own-vuejs-component-library-on-npm-using-vue-cli-28e60943eed3)
* [Vue Cookbook: Packaging Vue Components for npm](https://vuejs.org/v2/cookbook/packaging-sfc-for-npm.html)
* [chrisvfritz/hello-vue-components](https://github.com/chrisvfritz/hello-vue-components)