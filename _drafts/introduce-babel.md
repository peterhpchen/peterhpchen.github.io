---
layout: post
title:  "Babel介紹"
categories: javascript babel
---

> 每次ECMAScript新標準出來時，看著酷炫的語法卻礙於瀏覽器支援問題而確步的我，在知道了Babel這個工具可以將最先進的語法轉為每個瀏覽器都通用的舊語法時，真的是像看到救世主一樣，感動的說不出話來。

Babel是一個可以將工程師所撰寫的程式經由載入的Plugins來轉換為目標語法，也可以用Polyfill來使我們可以用新的globals(ex: `Promise`)。

## 安裝

Babel的[安裝方式](https://babeljs.io/docs/setup/)有很多種，在專案中一般會使用像是Webpack這樣的bundler工具引入Babel，但會牽扯到Webpack的設置，本文想聚焦在Babel的概念上，所以使用**CLI**來做安裝。

1. 建立`package.json`，本文只是練習用法，直接使用預設的設定

```bash
npm init -y
```

2. 安裝`babel-cli`

```bash
npm install --save-dev babel-cli
```

3. 新增`src`資料夾，在裡面撰寫`index.js`

```js
const helloFunc = (input) => { console.log(`Hello ${input}`)};
```

這個例子裡用到三個ES2015的語法: **const**、**arrow function**和**template string**，本文將以這三個語法來展示Babel的轉換功能。

4. 在`package.json`中新增`build`指令

```js
"scripts": {
    "build": "babel src -d dist"
    ...
},
```

5. 執行`build`指令

```bash
npm run build
```

執行後會看到`dist`的資料夾，裡面有一個`index.js`的檔案，開起來會發現跟原本`src`中的`index.js`程式碼相同，並沒有經過轉換，這是為什麼呢?

## Plugins

**BABEL**執行時有三個步驟: **parsing**，**transforming**和**generation**。

上一節的例子中執行`babel`的指令時也經過這三個步驟，而沒有轉換的原因就是出在第二步的**transforming**，**BABEL**的轉換步驟是仰賴各個**plugins**提供轉換能力，我們的程式中沒有載入任何的**Plugins**，所以轉換時並不會做任何事情，現在我們來加入各個語法的**Plugins**。

1. 載入Plugins

```bash
npm install --save-dev babel-plugin-transform-es2015-arrow-functions
npm install --save-dev babel-plugin-transform-es2015-block-scoping
npm install --save-dev babel-plugin-transform-es2015-template-literals
```

上面這三個Plugins分別處理程式碼中的三個語法特性**arrow function**、**const**和**template string**。

2. 修改`build`指令

```js
"scripts": {
    "build": "babel src -d dist --plugins=transform-es2015-block-scoping,transform-es2015-arrow-functions,transform-es2015-template-literals"
    ...
},
```

用`--plugins`參數設置要使用的**plugins**。

3. 執行`build`指令

執行之後我們會在`dist`中的`index.js`中看到轉換的結果。

```js
var helloFunc = function (input) {
  console.log("Hello " + input);
};
```

可以看到我們的程式碼已經被轉為**ES5**的語法了。

## `.babelrc`

