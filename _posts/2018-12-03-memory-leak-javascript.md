---
layout: post
title: "使用 Chrome DevTools 找出 Memory Leak 問題"
date: 2018-12-03 15:15:00 +0800
tags: [memory-leak, chrome-dev-tool, javascript]
---

> 本文介紹如何使用 Chrome DevTools 找出 Memory Leak 問題的發生處。

## 重現 Memory Leak 狀況

要知道 Memory Leak 發生點前要先知道哪個動作或行為會產生 Memory Leak ，步驟如下:

* 開啟 Chrome 的 Task Manager 。

![taskmanager](/assets/2018-12-03-memory-leak-javascript/taskmanager.png)

* 找到存在 Memory Leak 問題的網頁。

![findtab](/assets/2018-12-03-memory-leak-javascript/findtab.PNG)

* 在網頁上重複執行懷疑產生 Memory Leak 的動作。
* 重複多次後再次觀察 Task Manager ，確定 JavaScript memory 有顯著的增加。

由上面的步驟後我們可以鎖定特定動作會產生 Memory Leak 。

## 使用 DevTools 紀錄 Memory Leak 狀況

在鎖定 Memory Leak 的動作後，可以使用 DevTools 的 Perfomance 功能紀錄 Memory 的使用情況:

* 在問題網頁上開啟 DevTools 的 Perfomance Tab 。

![perfomance](/assets/2018-12-03-memory-leak-javascript/perfomance.PNG)

* 勾選 Memory 表示要記錄 Memory 的使用情況。
* 按下左上的開始記錄紐。
* 在頁面上重複觸發會產生 Memory Leak 的動作。
* 幾次後按下 Stop 。

![performancerecord](/assets/2018-12-03-memory-leak-javascript/performancerecord.PNG)

* 可以看到在執行的動作中記憶體的使用量不斷的增加，這表示此動作會使 Memory 無法釋放而產生洩漏的問題。

## 找出發生 Memory Leak 的物件

在建立物件時會分配記憶體給建立的物件，因此 Memory Leak 的原因為物件已經沒有使用但它的記憶體沒有釋放。

為了要找出這個未釋放的物件，我們可以使用 DevTools 中的 Memory Tab 對洩漏前即洩漏後的記憶體分配做快照，以比較這兩個時間點中記憶體分配的不同之處。

* 開啟 DevTools 的 Memory Tab 。

![memory](/assets/2018-12-03-memory-leak-javascript/memory.PNG)

* 選擇 Heap snapshot 。
* 重新載入頁面，並且立即拍一張快照。
* 重複多次 Memory Leak 的動作，然後再照一張快照。

![snapshot](/assets/2018-12-03-memory-leak-javascript/snapshot.PNG)

* 選擇第二張( Memory Leak 的)快照。
* 上方的選項中選擇 Comparison ，並且選擇第一張(初始狀態的)快照。

如此一來我們就可以看到兩個時機點下哪個類型的物件有異常的增長，可以從中發現問題點。

## 確認解決 Memory Leak 問題

要確認已經沒有 Memory Leak 的問題可以在使用 Performance 紀錄記憶體的使用情形。

![normal](/assets/2018-12-03-memory-leak-javascript/normal.PNG)

記憶體在每次動作後會恢復正常水平就代表已經解決此一記憶體洩漏問題。

## 參考資料

* [Hunting memory leaks in JavaScript using Chrome DevTools](https://dreamix.eu/blog/dreamix/hunting-memory-leaks-in-javascript-using-chrome-devtools)
* [Seth Koch /- Find memory leaks with Chrome Dev Tools /- YouTube](https://youtu.be/nrPa0mEk4Pw)