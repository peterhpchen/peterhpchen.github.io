---
layout: post
title: "在Postman中使用環境變數"
date: 2018-05-04 13:56 +0800
tags: postman
---

> 通常我們測試的API都會需要夾帶Token來驗證使用者的合法性，而這個Token會在登入成功後放進cookie裡，以便之後的請求可以使用token，但在postman中每次驗證前都要先把登入的Token貼到待測試的API中，這個動作雖然小，但每次都要做也著實讓人不舒服，這篇就利用Postman中的環境變數來解決這個問題。

## 建立環境

在建立環境變數前要先建立環境。

* 齒輪 > Manage Environments

![manage env](/assets/2018-05-04-postman-env-variable/manage-env.PNG)

* Add

![add](/assets/2018-05-04-postman-env-variable/add.PNG)

* 輸入Environment name > Add

![env-name](/assets/2018-05-04-postman-env-variable/env-name.PNG)

* 切換目前環境至剛剛設定的環境

![change-env](/assets/2018-05-04-postman-env-variable/change-env.PNG)

如此一來我們就有一個新的環境可以設置環境變數了。

## 第一個環境變數

建立環境後我們就可以建立環境變數，首先來建立個`url`的變數。

![first-env-var](/assets/2018-05-04-postman-env-variable/first-env-var.PNG)

我們可以用雙中括號來使用這個環境變數:

![use-env-var](/assets/2018-05-04-postman-env-variable/use-env-var.PNG)

## 將token放入環境變數

由於token每次登入都會改變，因此需要在叫用Login API後將取得的Token放進環境變數中，為此我們需要使用撰寫測試程式的Tests來寫入Token。

* 開啟Login API > Tests Tab

![write-code](/assets/2018-05-04-postman-env-variable/write-code.PNG)

* 在Block中寫入下面的程式碼:

```js
var csrfToken = pm.response.json().csrfToken;

pm.environment.set("csrfToken", csrfToken);
```

這樣在執行Login後就會把Token放進環境變數中。

* 在其他API中使用Token

![use-env-token](/assets/2018-05-04-postman-env-variable/use-env-token.PNG)

## 結語

有了這個方法終於可以不用每次都要貼token到各個API了。

## 參考資料

* [stack overflow](https://stackoverflow.com/a/35925413)
* [postman blog](http://blog.getpostman.com/2014/02/20/using-variables-inside-postman-and-collection-runner/)