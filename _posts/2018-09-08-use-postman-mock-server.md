---
layout: post
title: "使用Postman的Mock Server"
date: 2018-09-08 18:03 +0800
tags: postman
---

>> 前後端分離的系統開發時，為了可以同時進行開發會先寫一個傳送假資料的 Server ，以便在後端的 API 還沒有開發完成時前端可以同時開發，之前在開發時都是使用 [axios-mock-adapter](https://github.com/ctimmerm/axios-mock-adapter) 來做 Mock Server ，在使用上沒有什麼太大的問題，但還是必須要寫程式，在佈署的時候也要記得記得把程式修改，如今有 Postman 的幫忙不用寫程式也可以建立一個強大功能的 Mock Server 了。

## 建立 Mock Server

首先先建立一個 Mock Server 。

* 按下左上角的 **New** ，按下彈出視窗中的 **Mock Server**。

![newmockserver](/assets/2018-09-08-use-postman-mock-server/newmockserver.PNG)

* 第一步是選擇要 Mock 的對象是誰，可以直接**新增新的 API** ，也可以使用目前 **Workspace 中已有的 Collection**。

![selectmocktarget](/assets/2018-09-08-use-postman-mock-server/selectmocktarget.PNG)

* 第二步可以設定這個 Mock Server 的相關設置，在這裡我們可以指定這個 **Mock Server 的環境變數**以及 **server 是否要設置成私有的**。

![configmockserver](/assets/2018-09-08-use-postman-mock-server/configmockserver.PNG)

如果設置環境變數的話，此環境變數就會被設置到 Mock Server 的環境變數中，而設為私有則要加上 postman API Key 的 header 才能使用。

* 到這裡我們已經完成建立 Mock Server 了，對話框中會出現這個 Mock Server 的 URL 及接下來的設置方式。

![finishcreatemockserver](/assets/2018-09-08-use-postman-mock-server/finishcreatemockserver.PNG)

## 取得 API Key

如果是私有的 Mock Server ，在戳 API 時會需要有 Postman 的 API Key ，沒有這個 Key 的話戳 API 會出現下面的回應:

![withoutapikey](/assets/2018-09-08-use-postman-mock-server/withoutapikey.PNG)

所以需要在 Postman 的 Dashboard 中新增一個 **API Key** 。

* 按下 **Get API Key** 。

![generateapikey](/assets/2018-09-08-use-postman-mock-server/generateapikey.PNG)

如此一來就可以將取得的 **API Key** 貼於 `header` 的 `x-api-key` 來通過驗證了。

## 新增 Example

加上 `x-api-key` 後送出會產生下面的回應:

```js
{
    "error": {
        "name": "mockRequestNotFoundError",
        "message": "This collection does not have any Examples. Please add examples to the requests in this collection to enable mocking."
    }
}
```

代表我們戳的 API 並沒有新增任何的 **Example** ，導致 Mock Server 不知道要回應什麼而產生的錯誤，接著要來新增 **Example** 。

* 在右上角 **Examples(0)** 按下 **Add Example** 。

![addexample](/assets/2018-09-08-use-postman-mock-server/addexample.PNG)

* 新增一個 **Example** 。

重新戳 API 後就會得到回應了。

## 參考資料

* [POSTMAN DOCS: Setting up a mock server](https://www.getpostman.com/docs/v6/postman/mock_servers/setting_up_mock)