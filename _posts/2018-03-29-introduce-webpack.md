---
layout: post
title: "Webpack介紹"
date: 2018-03-29 23:59:00 +0800
tags: webpack
---

> Webpack是一個JavaScript的模組整合工具，它可以幫助我們在開發後的配置更加便利及有效，其最主要的功能就是可以將多個檔案合為一個檔案，達到減少請求的次數，在此同時也可以將模組間的相依問題解決，在前端開發如此複雜的現今，Webpack已經是不可缺少的工具了。

## 為什麼要使用Webpack?

Webpack大概可以有下面三種使用時機:

* 載入多個檔案時
* 在專案中使用轉譯語言時
* 建置專案優化時

下面我們一一介紹這幾個使用時機。

### 載入多個檔案時

以前在開發時我都會將所需的第三方工具庫引入之後再引入自己所撰寫的檔案，使用`<script>`的方式載入的檔案可能在專案起始時就有十幾個，更不用說隨著專案的功能越來越多，**相依性的混亂**及**請求次數的負擔**也就隨之而來，在這裡用一個簡單的例子示範。

首先我們有一個`index.js`:

```js
function component() {
    var element = document.createElement('div');
    
    element.innerHTML = _.join(['Hello', 'Webpack'], ' ');  // 使用Lodash的join
    
    return element;
}

document.body.appendChild(component());
```

這個js檔案中使用了Lodash這個第三方工具庫來處理字串，因此我們需要在`index.html`中引入此庫:

```html
<!doctype html>
<html>
  <head>
    <title>Getting Started</title>
    <script src="https://unpkg.com/lodash@4.16.6"></script> <!-- 引入Lodash -->
  </head>
  <body>
    <script src="./src/index.js"></script> <!-- 引入index.js -->
  </body>
</html>
```

從這例子可以跟之前所說的兩個問題相呼應:

* **請求次數**: 請求兩個`script`: `Lodash`及`index.js`
* **相依性**: `Lodash`一定要在`index.js`之前載入，而且單看`index.js`並不知道其相依於`Lodash`

Webpack可以幫我們解決這兩個長久存在的問題。

### 在專案中使用轉譯語言時

現在的前端有各式各樣不同的轉譯語言: **TypeScript**、**CoffeeScript**、**Babel**...等，使用這些工具可以**提升可讀性**及**減少因不熟悉JS語言特性而發生的錯誤**，但這些工具最麻煩的就是瀏覽器的環境並不支援，需要透過所屬的編譯器將其變成JavaScript，各個轉譯語言幾乎都會提供CLI工具幫助我們做轉換，但我們還是得多下指令來達到目的，而且是每次要執行時都要做，讓我們用Babel來做示範。

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

我們在釋出前為了**減低流量**或是**增加效能**往往會使用一些工具來達成此目的，但這些工具跟轉譯語言一樣都需要使用特定的工具指令來執行，一個可能還可以忍耐，但是這流程中都會是經過很多道程序才能達成。這時使用像是Webpack這樣的工具就會是第一要務。

## 安裝

我們先建立一個`demo`的資料夾，然後安裝`Webpack`:

```bash
mkdir webpack-demo && cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev
```

在我們的例子中會使用`Lodash`，因此也要安裝`Lodash`:

```bash
npm install --save lodash
```

這樣我們就可以開始使用Webpack了。

## 第一步

安裝好後來寫個最簡單的例子。

在`root`資料夾中新增`src`資料夾，在`src`資料夾中新增`index.js`檔案:

```js
import _ from 'lodash';

function component() {
    var element = document.createElement('div');
    
    element.innerHTML = _.join(['Hello', 'Webpack'], ' ');

    return element;
}

document.body.appendChild(component());
```

這裡我們使用剛剛有用到的例子，改為用Webpack處理，Webpack可以看懂ES6的`import`，直接在這裡引入`Lodash`。

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

在`html`中我們可以不用使用`<script>`來載入Lodash了，而這裡也將原本載入`index.js`的`<script>`改為`./dist/main.js`，我們執行Webpack的指令看看結果:

```bash
npx Webpack
```

我們可以看到多了一個`dist`資料夾，裡面有`main.js`這個檔案，他已經包含了Lodash及`index.js`的內容，是不是很方便呢?

這裡我們可以看到Webpack預設了兩個設定:

* Entry: `./src`
* Output: `./dist`

Webpack會預設輸入為`./src`下的js及輸出至`./dist`的資料夾中，因此我們直接引用`dist`中的檔案即可。

從這個例子我們可以看出Webpack的威力，並且解決了**載入多個檔案的相依性及讀取次數的問題**。

## 設定檔

Webpack的配置預設是設定在`root`資料夾中的`webpack.config.js`，設定在此可以不用另外設定config參數，如果要使用指定的設置檔要輸入下面的指令:

```bash
npx Webpack --config Webpack.config.js
```

這樣就可以讀取指定的設置檔來執行Webpack。

在使用config前有四個基本觀念要釐清，我們下面一一說明。

## 基本概念

Webpack有四個基本概念:

* **Entry**: 來源
* **Output**: 輸出
* **Loaders**: 載入器
* **Plugins**: 插件

這四個基本概念在配置Webpack config的時候是必須的。

### Entry

這個設置屬性是來設定要執行的程式來源，也就是想要整合的程式碼，我們可以在config中設置:

```js
const config = {
  entry: './src'
};

module.exports = config;
```

上面的設置如之前的例子一樣，會將`src`資料夾中的`index.js`當作來源，由此檔案追蹤其相依的檔案，將它們都加進建置後的檔案中。

### Output

output屬性是設置最後輸出的檔案，在經由**Loaders**跟**Plugins**處理後的檔案最後會集成到這個設置的檔案中，在config檔中可以如下設置:

```js
const path = require('path');

const config = {
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};

module.exports = config;
```

上面的例子會將Webpack的結果輸出至`dist`資料夾中的`main.js`，這樣我們就可以直接在想要引用的地方引入，就像之前在`index.html`中引入`./dist/main.js`一樣。

### Loaders

**Loaders**的存在使Webpack的功能可以不局限於JavaScript的檔案，我們可以使用**Loaders**讓Webpack可以讀懂更多不同的檔案，例如CSS、Image等等，現在我們用Babel來示範Loaders的用法。

在設置檔中設定**Loaders**需要在`module`中的`rules`裡做設置，它會有兩個屬性:

* `test`: 目標檔案
* `use`: 欲使用的載入器

在使用**Loaders**前我們需要用**npm**下載欲使用的**Loaders**，這裡我們先下載`babel-loader`及`babel-core`:

```bash
npm install --save-dev babel-loader babel-core
```

接著在`webpack.config.js`中設置Babel Loader，我們的目標是所有的`.js`檔案:

```js
module.exports = {
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader' }
        ]
    }
};
```

這樣就完成設置了，執行Webpack後，所有的js都會經由Babel處理，只要在.babelrc設置相關的目標環境還有載入所需的Plugins就可以做轉換。

### Plugins

在開發後會需要用一些工具來讓程式碼的效率最佳化，這時可以設置**Plugins**的設定來讓Webpack知道要執行哪些工具來優化程式碼，下面我們用**Uglify**做演繹:

```js
module.exports = {
    plugins: [
        new UglifyJsPlugin()
    ]
}
```

這樣設置之後Webpack就會使用**Uglify**來為程式碼做優化。

## 總結

由上面的設置我們可以把其先後順序如下排列:

**Entry > Loaders > Plugins > Output**

將來源(**Entry**)的程式碼經過載入器(**Loaders**)解析後輸出，輸出的結果經由插件(**Plugins**)的處理後輸出(**Output**)。

## 結語

從前端的開發問題切入，到使用Webpack來解決這些問題，對於Webpack應該會有初步的認識，在開發前端時使用Webpack可以減輕很多的負擔。

## 程式碼

* [GitHub](https://github.com/peterhpchen/Webpack)

## 投影片

<iframe src="//slides.com/peter3598768/webpack/embed" width="576" height="420" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## 參考

* [Webpack](https://Webpack.js.org/)