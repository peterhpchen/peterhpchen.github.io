---
layout: post
title:  "避免瀏覽器的基本驗證彈跳視窗"
date:   2018-09-17 00:30 +0800
categories: basicauth
---

> 一般的基本認證在失敗的時候，瀏覽器會跳出驗證的彈跳視窗，但是有一些 Web Service 也是會使用基本驗證，可是我們並不想要在使用 Web Service 時還跳出視窗，所以這文章記錄了如何避免觸發基本驗證的彈跳視窗。

## 基本驗證

Basic Auth 的原理是 Client 去存取擁有 Basic Auth 的 Server 時，需要加上 Basic Auth 的 Authorization Header 。

這個 Authorization 的 Header 格式是 `Basic Base64({User Name}:{Password})`。

Server 接收到這個 Request 的時候，會去檢查帳號及密碼是否正確:

* 正確: 傳回請求的回應。
* 不正確: Header 上加上 `WWW-Authenticate` ，格式是 `Basic realm="{Secure Area}"`，回傳 401 狀態碼。

下面是一個 Basic Auth 的 Server :

```js
const http = require('http');

const BASIC_AUTH = 'Basic';
const USER_NAME = 'admin';
const PASSWORD = 'admin';

function unauthorizedRes(res) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', `${BASIC_AUTH} realm="Secure Area"`);
    res.write('401 Unauthorized');
    res.end();
}

const server = http.createServer((req, res) => {
    const auth = req.headers['authorization'];

    console.log(`Authorization Header: ${auth}`);

    if (!auth) { // Without Authorization Header
        unauthorizedRes(res);
        return;
    }

    if (!auth.startsWith(`${BASIC_AUTH} `)) { // Wrong Authorization Type
        unauthorizedRes(res);
        return;
    }

    const encodeAuth = auth.substring(`${BASIC_AUTH} `.length);

    console.log(`Encode Authorization: ${encodeAuth}`);

    const decodeAuth = Buffer.from(encodeAuth, 'base64').toString();

    console.log(`Decode Authorization: ${decodeAuth}`);

    const userPasswordArray = decodeAuth.split(':');

    if (userPasswordArray.length !== 2) { // Wrong Authorization Format
        unauthorizedRes(res);
        return;
    }

    const [userName, password] = userPasswordArray;

    console.log(`User Name: ${userName}, Password: ${password}`)

    if (userName === USER_NAME && password === PASSWORD) { // User Name and Password Correct
        res.statusCode = 200;
        res.write('200 OK');
        res.end();
        return;
    }

    // User Name or Password Wrong
    unauthorizedRes(res);
});

server.listen(12345);
```

## 基本驗證失敗時瀏覽器的反應

上節說到驗證未過時， Server 會回傳 `WWW-Authenticate: Basic realm="{Secure Area}"` 的 Header，以及 401 的狀態碼，瀏覽器就是在收到 401 的回應後，再去檢查 `WWW-Authenticate` 的開頭是否為 `Basic` 來判斷是否需要開啟基本驗證的彈跳視窗，因此只要把這兩個其中一個改掉就好。

## 避免彈跳視窗

現在我們知道有兩種方式可以避免基本驗證的彈跳視窗:

* 修改 Server 回傳的狀態碼: 除了 401 外都可以。
* 客製驗證類型: 除了 Basic 外都可以。

因此我們可以修改狀態碼:

```js
...
function unauthorizedRes(res) {
    res.statusCode = 400; // Use Status Code Except 401
    // res.statusCode = 401;
    res.setHeader('WWW-Authenticate', `${BASIC_AUTH} realm="Secure Area"`);
    res.write('401 Unauthorized');
    res.end();
}
...
```

也可以客製驗證類型:

```js
...
const BASIC_AUTH = 'xBasic'; // Use Custom Authorization Type to Prevent Browser Basic Auth Popup
// const BASIC_AUTH = 'Basic';
...
```

## Source Code

* [Gist](https://gist.github.com/peterhpchen/c4a47028ec27f086836aa1f6410eb65b)

## 參考資料

* [stack overflow: How to prevent browser to invoke basic auth popup and handle 401 error using Jquery?](https://stackoverflow.com/a/9872582)