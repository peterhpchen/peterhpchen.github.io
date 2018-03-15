---
layout: post
title:  "在Vue.js中使用JQuery"
categories: vuejs jquery
---

> 在開發時最好避免混用Vue.js及JQuery，因為兩個框架的理念並不相同，Vue.js是專注在對Model的操作，而JQuery則是專注在DOM的操作，如果在Vue中使用JQuery，那JQuery所更新的DOM或是處理會因為不是透過Vue.js的Model更新而不會被Vue.js所察覺，導致我們在操作Model時會跟JQuery的資料脫鉤。
>
> 但現實總是沒有這麼簡單，我最近在開發需要組織圖的功能，雖然有找到[vue-orgchart](https://github.com/spiritree/vue-orgchart)，但是功能較少，並不符合專案的需求，於是就找到了這個專案的[原版](https://github.com/dabeng/OrgChart)，功能很充足，也符合需求，但它是用JQuery寫的，本來也有考慮過要重寫成Vue.js版本的，但沒有時間讓我慢慢研究，最後只好妥協在Vue.js中使用JQuery，本篇文章記錄了在Vue.js中使用JQuery的學習過程。