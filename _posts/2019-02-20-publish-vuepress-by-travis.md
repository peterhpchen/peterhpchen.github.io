---
layout: post
title:  "使用 Travis CI 部署 VuePress 靜態網頁至 Github Page"
date:   2019-02-20 21:00:00 +0800
categories: tarvis-ci, vuepress, github-page
---

> 本文介紹如何使用 Travis CI 將 VuePress 的靜態網頁部署到 Github Page 上。

## VuePress

VuePress 是用 Vue.js 開發的靜態網站產生工具，在 Vuepress 中，我們可以使用熟悉的 Vue.js 元件及 Markdown 語法撰寫技術文件。

VuePress 的使用方式相當簡單，沒有繁雜的配置，只要將文件放在對應的資料夾中，就能建立漂亮的文件網頁。

## Travis CI

Travis CI 是個跟 Github 高度整合的工具，利用其強大的部屬功能，我們可以很輕鬆的部署網站。

## Github Page

Github Page 是 可以將 Github 上的專案文件部署到靜態網頁的服務。

## 在專案中配置 VuePress

### 在專案中安裝 VuePress

```bash
$ yarn add -D vuepress
```

### 在 package.json 的 scripts 中加入建置指令

```js
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

* `docs:dev` : 開發環境，有 hot reload ，在修改文件或是代碼時會立即反應在頁面上。
* `docs:build` : 發行環境，此指令會在 `docs/.vuepress/dist` 中建立部屬時所需的環境。

### 將文件放至 docs 資料夾中

* 目錄頁以 README.md 命名，此檔案會是 `/` 路由取得的內容。
* 剩餘的檔案依照想要配置的路由放置， root 是 docs ，每下一個層級就會多一層資料夾名稱的路由。

如此一來， Vuepress 就已經配置完成，現在可以使用 `yarn docs:dev` 開始撰寫文件了。

### 在 .vuepress 中建立 config.js

我們要配置在 https://<USERNAME or GROUP>.gitlab.io/<REPO>/ 路徑下，因此 base 不再是 `/` ，而是 `/<REPO>/` :

```js
module.exports = {
  base: "/<REPO>/"
}
```

## 在專案上設定 Github Page

在專案的 Settings 中將 Github Page 設置如下圖:

![github-page-setting](/assets/2019-02-20-publish-vuepress-by-travis/github-page-setting.png)

* Source 調整為 gh-pages branch : Travis 會將建置結果部署至 gh-pages 分支中，故這裡要設定為 gh-pages 。

## 將專案加入 Travis CI

在使用者的設定中，將 Travis 的設定加入目前的專案:

![tarvis-setting](/assets/2019-02-20-publish-vuepress-by-travis/travis-setting.png)

### 設定 github token

因為 Travis 在將建置好的檔案部署至專案時會需要專案的存取權限，因此需要給它一個 token 。

* 依照 [文件說明](https://docs.travis-ci.com/user/deployment/pages/#setting-the-github-token) 產生所需的 github token 。

* 在 Travis 的設置中加上 GITHUB_TOKEN 這個環境變數:

![travis-github-token](/assets/2019-02-20-publish-vuepress-by-travis/travis-github-token.png)

### 建立 `.travis.yml`

在專案根目錄中建立 `.travis.yml` 檔案:

```yaml
language: node_js
node_js:
  - "10"
script:
  - npm run docs:build
deploy:
  provider: pages
  skip-cleanup: true
  local_dir: docs/.vuepress/dist
  github-token: $GITHUB_TOKEN # a token generated on github allowing travis to push code on you repository
  keep-history: true
  on:
    branch: master
```

接著，將修改都的檔案 push 至 master 分支， travis 就會開始部署程序了，建置完成後專案會多一個 gh-pages 分支，這樣就可以在對應的路徑下看到成果了。

## DEMO

[peterhpchen/VuejsQuest](https://github.com/peterhpchen/VuejsQuest)

## 參考資料

[VuePress](https://vuepress.vuejs.org)
[Travis CI : GitHub Pages Deployment](https://docs.travis-ci.com/user/deployment/pages/)
[Publish a Vuepress site on GitHub pages with Travis](https://itnext.io/publish-a-vuepress-site-on-github-pages-with-travis-82036243bf36)
