---
layout: post
title: "使用 Cypress 做 E2E 測試 Part 2 : 撰寫測試腳本"
date: 2018-12-04 23:20:00 +0800
tags: [test, cypress]
---

> 本文會用範例來帶大家了解如何使用 Cypress 做 e2e 測試。

## 基本範例

下面是一個基本的 Cypress 測試腳本:

```js
// 建立一個 login 的測試描述
describe('login', function () {
  beforeEach(function () { // 在每個測試案例之前所執行的代碼
    cy.visit('/#/login'); // 拜訪 /#/login 頁面
  });
  it('greets with login', function () { // 測試預期為 login 頁面
    cy.get('[data-cy=message]').should('contain', 'Welcome');   // 預期取得 Welcome 的字串
  });
});
```

Cypress 是使用 [Mocha](https://docs.cypress.io/guides/references/bundled-tools.html#Mocha) 中 BDD 的語法，因此像是 `describe()` , `beforeEach()` , `it()` 都是 Mocha 所提供的函式。

> 詳細的用法可以參考 [Mocha 的說明](https://mochajs.org/#bdd)。

這個例子是將測試頁面定在 login ，之後去判斷頁面內容是否符合需求。

## 指令

Cypress 提供許多測試時需要使用的指令，像是上面例子的 visit , get 或是 should ，這些指令都會存放在 cy 這個全域的物件上，接著我們要來看兩個使用最頻繁的指令: get 及 should 。

### get

get 這個指令等同於 JQuery 中的 $() ，她會將目標 DOM 元素取得，這裡面可以使用 CSS Selector 做定位，因此我們可以是用像是 cy.get('#target') 這樣的方法取得目標元素。

由於一般的屬性的變化性太大，像是 #target 這樣的 selector 只要元素的 ID 一有變化，測試案例就要全部重寫，因此 [Cypress 的最佳實踐](https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements)建議可以使用 data-cy 這個附加的屬性，這樣一來不管是 DOM 產生了什麼變化，只要測試的需求不變就不用重新撰寫測試案例。

### should

should 為斷言函式，是判斷測試是否正確的依據，它的參數為 [Chai](https://docs.cypress.io/guides/references/assertions.html#Chai) , [Chai-jQuery](https://docs.cypress.io/guides/references/assertions.html#Chai-jQuery) 或是 [Sinon-Chai](https://docs.cypress.io/guides/references/assertions.html#Sinon-Chai) 中的斷言。

例如:

```js
it('greets with login', function () {
  cy.get('[data-cy=message]').should('contain', 'Welcome');
});
```

這裡的 should 中的斷言是 contain ，意思是在 get 取得的元素中應該要包含 Welcome 這樣的字串。

## 參考資料

* [cypress.io](https://www.cypress.io/)