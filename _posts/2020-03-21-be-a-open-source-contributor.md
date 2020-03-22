---
layout: post
title: "當個開源專案的貢獻者吧！"
tags: [github, git, open-source]
---

開發時遇到困難時，你會怎麼做呢？相信大部分的人都跟我一樣： **Google** ，那你有想過 Google 上的資源都是怎麼來的嗎？

全世界有無數的人犧牲自己的時間在網路上貢獻自己的知識，才使我們可以這麼順利找到問題的解答，當然他們也會因其他人的貢獻而節省時間，而其節省的時間又可以拿來充實網路上的資源，這樣的良性循環，才使 **Google** 成為了我們的救命利器。

現在讓我們也為 Google 上的資源貢獻一份心力吧！

## 為什麼要當個貢獻者

貢獻開源專案不僅對他人有利，對自己更是有很大的幫助。

### 改善你使用的軟體或工具

在開發過程中發現了引入的庫有 bug ，你會怎麼做呢？別猶豫，送個 PR 吧，這樣其他使用這庫的人或是你自己下次更新時就不用為被這 bug 焦頭爛額了。

### 增加自我的技術能力

貢獻開源專案時你會更加了解這專案的技術架構，這會使得你的技術大大提升。

### 豐富經歷

在履歷上加一條開源專案貢獻者可是很酷的喔～

> 上面列的是我自己真的感受到的， GitHub 上還有列了[其他項目](https://opensource.guide/how-to-contribute/#why-contribute-to-open-source)。

## 我要當個貢獻者

看完上面的優點，你是不是躍躍欲試了呢？在 GitHub 上貢獻真的不難，只要照下面步驟做就行了：

* Find : 找到合適的專案
* Fork : 複製庫到自己的帳號下
* Clone : 將專案 Clone 到本機
* Checkout : 建立 feature / bugfix branch
* Code : 寫程式或是編輯文件
* Commit : 提交修改
* Push : 將 Commit 推回遠端
* Pull Request : 對原專案發送 PR
* Wait : 等待專案成員接受 PR 或是回饋

### Find : 找到合適的專案

要找到合適的專案，最簡單的方法是選一個平常有在使用的庫，到 Issues 中尋找合適的 Bug 或是 Feature 進行修復或是開發，很多的專案都會有 **good first issue** 這樣的標籤供想要入門的開發者做貢獻，以 [Vue 為例](https://github.com/vuejs/vue/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)：

![good-first-issue](/assets/2020-03-21-be-a-open-source-contributor/good-first-issue.png)

因為是熟悉的語言及技術，在貢獻上也會比較輕鬆。

如果剛開始想我一樣剛開始貢獻就修改程式有點害怕的話，也可以先從修改文件開始， Vue 的話是放在 [vuejs.org](https://github.com/vuejs/vuejs.org/issues?q=is%3Aissue+label%3A%22good+first+issue%22+is%3Aopen) 中。

> 如果還是不知道要選哪個專案開始的話，可以試著到 [first-contributions](https://firstcontributions.github.io/) 找找，這裡面列了很多適合貢獻的專案。

### Fork : 複製庫到自己的帳號下

將想要貢獻的專案複製到自己的帳號下。

![fork](/assets/2020-03-21-be-a-open-source-contributor/fork.png)

完成後會在你的帳號下會有一個一樣名字的專案。

![repo](/assets/2020-03-21-be-a-open-source-contributor/repo.png)

### Clone : 將專案 Clone 到本機

取得庫的路徑後 Clone 至本機。

* 取得專案路徑

![path](/assets/2020-03-21-be-a-open-source-contributor/path.png)

* Clone

```bash
git clone git@github.com:peterhpchen/aspJSON.git
```

![clone](/assets/2020-03-21-be-a-open-source-contributor/clone.png)

> 注意是 Clone 自己帳號下的專案。

### Checkout: 建立 feature / bugfix branch

避免在原有的分支上作業，因此建立新分支。

```bash
git checkout -b fix-typo
```

![checkout](/assets/2020-03-21-be-a-open-source-contributor/checkout.png)

分支命名可以簡單描述 Issue 內容，像上面就是建立一條**修改錯字**的分支。

### Code : 寫程式或是編輯文件

泡杯咖啡並開啟編輯器修復問題/開發功能吧。

### Commit : 提交修改

將修改的檔案提交。

```bash
git add README.md
git commit -m 'Fix README typo'
```

![commit](/assets/2020-03-21-be-a-open-source-contributor/commit.png)

### Push : 將 Commit 推回遠端

將修改推入 GitHub 上。

```bash
git push origin fix-typo
```

### Pull Request : 對原專案發送 PR

最後終於要發出 PR 請求合併了。

![pr](/assets/2020-03-21-be-a-open-source-contributor/pr.png)

在建立 PR 時目標及來源的 repo 及 branch 要注意是否正確，並且遵守原專案 PR Issue 的規則。

![open-pr](/assets/2020-03-21-be-a-open-source-contributor/open-pr.png)

> 過程中請遵守專案的 PR 方針開發，以 Vue 這種規模的專案來說會有[文件](https://github.com/vuejs/vue/blob/dev/.github/CONTRIBUTING.md#pull-request-guidelines)特別說明這部分。

### Wait : 等待專案成員接受 PR 或是回饋

如果修改被接受當然是皆大歡喜，但如果有人回饋問題的話也不要灰心，理解後修復問題依然是次漂亮的貢獻。

## 結論

我自己也是個開源菜雞，希望這篇文章可以幫到跟我一樣的新手，加入開源的行列。

## 參考資料

* [GitHub: Open Source Friday](https://opensourcefriday.com/)