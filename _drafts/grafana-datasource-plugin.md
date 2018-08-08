Grafana允許使用插件來引入本來為支援的資料來源，例如說想要用自己開發的api來取得資料時，就需要開發資料來源插件來擴充Grafana。

官方有提供很多範例，但大部分的範例所對應的版本都比較舊，編譯後放在Grafana上都會有一些問題，因此本文會從無到有建置一個datasource的plugin。

## 初始專案

Grafana最新版本的插件都已經改成使用Typscript做開發語言、Webpack當作打包工具及使用Jest做測試框架，因此這次的演繹也會使用這些技術。

### 設定package.json

1. 初始化package.json: npm init -y
1. 安裝typescript: npm install typescript --save-dev
1. 安裝webpack: npm install webpack webpack-cli --save-dev
1. 安裝jest: npm install jest --save-dev
1. webpack要可以解析typescript: npm install ts-loader --save-dev
1. jest要可以測試用typescript所寫的程式: npm install ts-jest --save-dev

## Metadata

Grafana會以plugin.json及README.md的資訊來對外展示這個插件，如果這個插件是不公開的，那只需要在plugin.json中設定`type`、`name`及`id`即可。

註: 詳細的Metadata設定方式可以在[這裡](http://docs.grafana.org/plugins/developing/plugin-review-guidelines/#metadata)找到。

### plugin.json

在src資料夾中新建plugin.json檔案:

```js
{
  "type": "datasource",
  "name": "Typescript Webpack Jest Demo",
  "id": "peterhpchen-demo-datasource"
}
```

* type: 插件的種類，目前分為三種: panel、datasource及app(本文所介紹的是datasource)。
* name: 此插件的名字，用以顯示在選單中供人選取。
* id: 這個插件的識別碼，需要照特定的格式撰寫: [github username/org]-[plugin name]-[datasource|app|panel]。

datasource類型的插件有metrics跟annotations這兩個特殊的參數:

* metrics: 讓panel使用的資料。
* annotations: 在Graph上的註解資料([參考](http://docs.grafana.org/reference/annotations/))。

本文只會講述metrics，因此最後的plugin.json會長得像是下面這樣:

```js
{
  "type": "datasource",
  "name": "Typescript Webpack Jest Demo",
  "id": "peterhpchen-demo-datasource",

  "metrics": true,
  "annotations": false
}
```

## module.ts

module.ts是整個專案的入口檔，Grafana在執行插件時會從這裡取得對應的程式碼，在datasource中有下面幾個元件需要實作:

* Datasource(Required): 取得資料來源。
* QueryCtrl(Required): 在Panel中設定metrics時的畫面。
* ConfigCtrl(Required): 在設定Datasource時的畫面。
* AnnotationsQueryCtrl: 設定註解的查找時的畫面。

除了Datasource外，其他三個都是AngularJS的Controller，每個都有View需要撰寫，分別對應到Grafana上不同的配置設定。

### 每個Controller在Grafana下的位置

這裡用[simple-json-datasource](https://github.com/grafana/simple-json-datasource)插件截圖來說明每個畫面在Grafana系統下的配置。

#### QueryCtrl

![QueryCtrl](/assets/2018-08-08-grafana-datasource-plugin/QueryCtrl.png)

Panel的編輯模式中有個Metrics的tab可以做datasource的設置，這個Controller是每筆datasource的查詢所需要的資訊設置。

#### ConfigCtrl

![QueryCtrl](/assets/2018-08-08-grafana-datasource-plugin/ConfigCtrl.png)

整個Grafana系統設置Datasource時所需輸入的參數，像是連線、驗證等資訊。

#### AnnotationsQueryCtrl

![AnnotationsQueryCtrl](/assets/2018-08-08-grafana-datasource-plugin/AnnotationsQueryCtrl.png)

Dashboard的Settings中有個Annotations的tab，這個Controller就是在設置註解時所用的客製配置。

這三個Controller中這次只會用到前面兩個QueryCtrl及ConfigCtrl，AnnotationsQueryCtrl之後會跟Annotations一起介紹。

### 初始module.ts

我們這裡先用空的Class來配置module.ts，之後會介紹每個Class的開發方式。

```ts
class DemoDatasource {}
class DemoQueryCtrl {}
class DemoConfigCtrl {}

export {
    DemoDatasource as Datasource,
    DemoQueryCtrl as QueryCtrl,
    DemoConfigCtrl as ConfigCtrl,
};
```

這裡我們對外公布了Datasource、QueryCtrl及ConfigCtrl這三個必要的Class，而Class都是空的。

## 使用webpack建置專案

module.ts跟plugin.json就是插件的基礎構成，雖然現在各個功能都還沒有實作，不過已經可以編譯成Grafana的插件了，因此這節會使用webpack建置且部署到Grafana上。

### 建立webpack.config.js

#### 設定專案的輸入及輸出

輸入webpack的資料夾為src，要將建置好的程式碼放於dist資料夾下:

```js

```

#### 將plugin.json移至dist資料夾

由於Grafana是以plugin專案下的dist資料夾來建置，所以需要將plugin.json複製至dist中。

* 安裝copy-webpack-plugin: npm install copy-webpack-plugin --save-dev