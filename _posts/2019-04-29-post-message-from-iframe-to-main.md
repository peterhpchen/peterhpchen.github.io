---
layout: post
title: "使用 postMessage 由嵌入頁 ( IFrame ) 傳訊息給主頁"
date: 2019-04-29 12:00:00 +0800
tags: [iframe, postmessage, message-channel]
---

> 嵌入頁因為跟主頁屬於不同的視窗，所以不能直接傳遞訊息，本文紀錄如何使用 postMessage 在兩個視窗間傳遞訊息。

## 使用 postMessage 傳遞訊息

視窗物件有提供 [`postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/MessagePort/postMessage) 函式，這個函式會叫起監聽 `message` 事件的處理式，因此我們就可以在想要取得訊息的視窗 ( e.g: 主頁 ) 中加上 `message` 的監聽器，並在要傳訊息的視窗中叫用目標視窗的 `postMessage` 就可以在視窗間傳遞訊息。

```js
// 主頁
window.addEventListener('message', this.receiveMessageFromIframe); // 嵌入頁傳回訊息時要叫用的事件

// IFrame
const message = {
  event: 'download',
  args: {
    opt: 'opt',
    pname: 'pname',
    nname: 'nname',
    nid: 'nid',
    bNid: 'bNid',
    acc: 'acc'
  };
};

window.parent.postMessage(message); // 使用目標視窗物件叫用 postMessage
```

## 支援 IE 10

雖然上面的方法在大部分的瀏覽器中運作正常，但在 [IE 10 中跨域使用此方式時會不能正確的傳遞訊息](https://stackoverflow.com/questions/16226924/is-cross-origin-postmessage-broken-in-ie10)，如果要支援 IE 10 ，必須要使用 [MessageChannel](https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel) 。

### 使用 MessageChannel 傳遞訊息

MessageChannel 使用兩個 `port` 物件，個別對應一個視窗，分別為 `port1` ( e.g: 主頁) 及 `port2` ( e.g: 嵌入頁)，使用的方式與直接使用 `postMessage` 差別在於由其中一個視窗建立 MessageChannel 後要把 `port` 的資訊拋給另一個視窗，然後兩個視窗使用 `port` 物件傳遞訊息。

```js
// 主頁
wa8Iframe.addEventListener('load', this.wa8IframeLoad); // 嵌入頁載入時建立 MessageChannel

wa8IframeLoad() {
  ...
  const channel = new MessageChannel();

  channel.port1.onmessage = this.receiveMessageFromIframe; // 嵌入頁傳回訊息時要叫用的事件
  wa8Iframe.contentWindow.postMessage('Pass port2 to IFrame', '*', [channel.port2]); // 由主頁傳遞 port (channel.port2) 資訊給嵌入頁
}

// 嵌入頁
var mainFramePort = null
window.addEventListener('message', function(e) {
  mainFramePort = e.ports[0]; // 主頁傳給嵌入頁 port 資訊
})

function clickDownload(msg) {
  mainFramePort.postMessage(msg); // 藉由 port 送訊息給主頁
}
```

## 結論

使用 `postMessage` 可以很方便地在視窗間傳遞訊息，但要注意目標瀏覽器的支援度，在 IE 10 時須改用較複雜的 MessageChannel 實作。

## 參考資料

* [MDN: Window​.post​Message()](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
* [stackoverflow: Is cross-origin postMessage broken in IE10?](https://stackoverflow.com/questions/16226924/is-cross-origin-postmessage-broken-in-ie10)
* [MDN: Message​Channel
](https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel)