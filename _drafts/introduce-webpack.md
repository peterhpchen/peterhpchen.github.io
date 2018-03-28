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

### 在專案中使用轉譯語言時

現在的前端有各式各樣不同的轉譯語言: TypeScript、CoffeeScript、Babel...等，使用這些工具可以提升可讀性及減少因不熟悉JS語言特性而發生的錯誤，但這些工具最麻煩的就是瀏覽器的環境並不支援，需要透過所屬的編譯器將其變成JavaScript，各個轉譯語言幾乎都會提供CLI工具幫助我們做轉換，但我們還是得多下指令來達到目的，而且是每次要執行時都要做，讓我們用Babel來做示範。

在沒有Webpack的幫忙下我們需要安裝`babel-cli`:

```bash
npm install --save-dev babel-cli
```

之後用`npx`執行`babel`:

```bash
npx babel src -d dist
```

就可以將`src`資料夾下的`js`檔案轉譯後放入`dist`資料夾。

但每次我們修改了`js`要執行前就要再執行指令，顯得有些麻煩，而Webpack可以幫我們解決這個問題。

### 建置專案優化時

我們在執行前為了減低流量或是增加效能往往會使用一些工具來達成此目的，但這些工具跟轉譯語言一樣都需要使用特定的工具指令來執行，一個可能還可以忍耐，但是這中流程都會是經過很多道程序才能達成。這時使用像是Webpack這樣的工具就會是第一要務。

## 安裝

我們先建立一個`demo`的資料夾，然後安裝`webpack`:

```bash
mkdir webpack-demo && cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev
```

在我們的例子中會使用`Lodash`，我們也要安裝`Lodash`:

```bash
npm install --save lodash
```

這樣我們就可以開始使用webpack了。

## 第一步

安裝好後來寫個最簡單的例子。

在`root`資料夾中新增`src`資料夾，在`src`資料夾中新增`index.js`檔案:

```js
import _ from 'lodash';

function component() {
    var element = document.createElement('div');
    
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
}

document.body.appendChild(component());
```

這裡我們使用剛剛有用到的例子，改為用webpack處理，webpack可以看懂ES6的`import`，直接在這裡引入`lodash`。

現在在`root`中新增`index.html`:

```html
<!doctype html>
<html>
  <head>
    <title>Getting Started</title>
  </head>
  <body>
    <script src="./dist/main.js"></script>
  </body>
</html>
```

在`html`中我們可以不用使用`<script>`來載入Lodash了，而這裡也將原本載入`index.js`的`<script>`改為`./dist/main.js`，我們執行webpack的指令看看結果:

```bash
npx webpack
```

我們可以看到多了一個`dist`資料夾，裡面有`main.js`這個檔案，他已經包含了Lodash及`index.js`的內容，是不是很方便呢?

這裡我們可以看到webpack預設了兩個設定:

* Entry: `./src`
* Output: `./dist`

webpack會預設輸入為`./src`下的js及輸出至`./dist`的資料夾中，因此我們直接引用`dist`中的檔案即可。

從這個例子我們可以看出webpack的威力，並且解決了**載入多個檔案的相依性及讀取次數的問題**。