---
layout: post
title:  "使 div 元素在 ActiveX frame 之上"
date:   2019-05-02 17:30:00 +0800
categories: iframe, activex
---

> 舊有的系統為了要在網頁上做到一些桌面應用才能做到的事情，會將 ActiveX 嵌入網頁中，這樣的方式在以前的實作中常常出現，在維護舊系統時就有機會遇到這樣的問題: ActiveX 嵌入頁永遠處於其他 HTML 元素上，本文紀錄如何將其他的 HTML 元素顯示在 ActiveX 嵌入頁之上。

## z-index 不可行

這類的問題，最直接會想到使用 z-index 來解決覆蓋的問題，但由於 ActiveX 是用 iframe 嵌入的，而 iframe 內的 CSS 跟父親視窗物件的 CSS 是不能互相作用的，因此只要是 CSS 相關的解法，對於 ActiveX 來說都是無效的。

## 使用空白(blank) iframe

使用一個 blank iframe 蓋於想要覆蓋 ActiveX 的 HTML 元素上，由於此 blank iframe 較 ActiveX 靠前，因此 IE 會優先顯示此 blank iframe 的畫面，也由於 blank iframe 是透明的，因此就可以顯示想要覆蓋的 HTML 元素。

```html
<div class="sidebar">
    <iframe name="sidebar-blank" src="about:blank" style="left: 0px; top: 0px; width: 100%; height: 100%; position: absolute;"></iframe>
    <div class="menu">...</div>
</div>
```

## 結論

在 IE 上開發時，處處需要小心這類**違反 HTML 規則**的規則，也因歷史久遠，導致能查到的資料較少，做個紀錄避免未來遇到相同的問題又要折騰半天。

## 參考資料

* [Problems positioning a DIV on top of an OBJECT](http://www.dynamicdrive.com/forums/showthread.php?26055-Problems-positioning-a-DIV-on-top-of-an-OBJECT)