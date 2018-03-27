---
layout: post
title:  "Webpack介紹"
categories: webpack
---

> Webpack是一個JavaScript的模組整合工具，它可以幫助我們在開發後的配置更加便利及有效，其最主要的功能就是可以將多個檔案合為一個檔案，達到減少請求的次數，在此同時也可以將模組間的相依問題解決，在前端開發如此複雜的現今，Webpack已經是不可缺少的工具了。

## 為什麼要使用Webpack?

就我所知道的功能，Webpack大概可以有下面三種使用方式:

* 載入多個檔案時
* 在專案中使用轉譯語言時
* 建置專案優化時

下面我們一一介紹這幾個使用時機。

### 載入多個檔案時

以前在開發時我都會將所需的第三方工具庫引入之後再引入自己所撰寫的檔案，使用`<script>`的方式載入的檔案可能在專案起始時就有十幾個，更不用說隨著專案的功能越來越多，相依性的混亂及請求次數的負擔也就隨之而來，在這裡用一個簡單的例子示範。

首先我們有一個`index.js`:

```js
function component() {
    var element = document.createElement('div');
    
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');  // 使用lodash的join
    
    return element;
}

document.body.appendChild(component());
```

這個js檔案中使用了loadsh這個第三方工具庫來處理字串，因此我們需要在`index.html`中多引入此庫:

```html
<!doctype html>
<html>
  <head>
    <title>Getting Started</title>
    <script src="https://unpkg.com/lodash@4.16.6"></script> <!-- 引入lodash -->
  </head>
  <body>
    <script src="./src/index.js"></script> <!-- 引入index.js -->
  </body>
</html>
```

從這例子可以跟之前所說的兩個問題相呼應:

* 請求次數: 請求兩個`script`: `lodash`及`index.js`
* 相依姓: `lodash`一定要在`index.js`之前載入，而且單看`index.js`並不知道其相依於`lodash`

Webpack可以幫我們解決這兩個長久存在的問題。

