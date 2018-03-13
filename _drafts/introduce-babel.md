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

各位不知道是否注意到，在加入了**Plugins**後，指令變得很長，這還只是設置了三個**Plugins**的情況，如果之後要設置更多的**Plugins**那我們的設置會變得相當的困難，所幸**BABEL**有提供`config`檔的功能，我們可以將設定全部放到設定檔中。

1. 於根目錄中(跟`package.json`同個資料夾)建立`.babelrc`

```js
{
    "plugins": [
        "transform-es2015-arrow-functions",
        "transform-es2015-block-scoping",
        "transform-es2015-template-literals"
    ]
}
```

這邊我們設置**plugins**的載入。

2. 刪除指令中的`--plugins`

```js
"scripts": {
  "build": "babel src -d dist"
  ...
},
```

存檔執行後我們一樣可以得到轉換為**ES5**的程式碼。

## Presets

使用Plugins對Babel做設置時，每次要轉換一種語法就必須要載入一種Plugins，每次的設置都是一個麻煩，而且有新的ECMAScript標準釋出，就要自己手動再加入，真的很不方便，為此Babel提供了Presets的設置方式，載入特定目標的Preset時會將相關的Plugins都包含進來，使得載入一個Preset就可以使用整組語法轉換的Plugins。

Babel目前提供三個Presets:

* env: 依據開發者目標環境的需求做轉換。
* react: React相關(JSX)的轉換。
* flow: Flow相關的轉換。

### env

**env**的轉換是為了可以在目標的環境(**Browsers**或是**Node.js**)順利地使用較新的語法，例如我們可以直接在專案下撰寫**ES2017**的語法，在經由**env**中載入的**Plugins**做轉換。

#### 查看包含的Plugins

我們可以在[plugin-features.js](https://github.com/babel/babel-preset-env/blob/master/data/plugin-features.js)中找到**env**中所包含的**Plugins**。

#### 使用方式

1. 安裝**env**的**preset**

```bash
npm install --save-dev babel-preset-env
```

2. 設置.babelrc

```js
{
    "presets": ["env"]
}
```

這樣的設置啟用了**env**預設的設定，會將所有**ES2015**、**ES2016**、**ES2017**相關的語法做轉換。

下`npm run build`的指令後我們可以得到轉換為**ES5**後的程式碼。

#### 指定轉換後的目標環境

env也可以指定專案所需支援的環境來做轉換，如果你只要支援Chrome或是Fire Fox這類的現代化瀏覽器，由於這些瀏覽器已經支援大部分的ES2015語法，所以就可以使用較少的Plugins來做轉換，節省花費。

env中可以設置node或是browsers的環境目標。

##### 瀏覽器環境

指定瀏覽器環境的方式是使用[browserslist](https://github.com/ai/browserslist)，它是使用查詢字串來設定目標瀏覽器。

例如我們只想要支援最新的Chrome，我們可以在.babelrc中做下面的設定:

```js
{
    "presets": [
        [
            "env", {
                "targets": {
                    "browsers": ["last 1 Chrome versions"]
                }
            }
        ]
    ]
}
```

這樣我們得到的執行結果就不會經過Plugins的轉換，因為Chrome已經支援這些語法了。