---
layout: post
title: "客製 Jekyll 的 minima 主題 style"
tags: [jekyll, jekyll-theme]
---

使用 GitHub Page 建立自己的網頁時， Jekyll 的 [minima](https://github.com/jekyll/minima) 是個很好的入門選擇，因為 GitHub Page 預設的使用的 static generator ，而 minima 也是 Jekyll 預設的主題，所以 minima 常常會是開發者第一個接觸到的 Jekyll 主題，並且它小而全的特性使得修改可以很輕鬆，這篇會介紹要怎麼修改 minima 主題的樣式。

## Jekyll 主題種類區別

Jekyll 的主題大致分為兩種

* **regular** theme: 所有的檔案包括樣式配置及網頁內容(markdown)的檔案都在資料夾中
* **gem-based** theme: 只有網頁內容(markdown)的檔案，樣式配置檔案由 gem 上在建置的時候抓取

minima 是屬於 gem-based 的主題。

## 找到 minima 主題的檔案

如果是 regular theme ，直接打開樣式表編輯即可，但因 minima 是 gem-based theme ，所以檔案會存在 gem 中，這時就需要找出樣式表的內容。

### 從 gem 上抓取

> gem 是 ruby 的套件管理工具，跟 node 的 npm 相似。

#### 找到主題的檔案位置

由於 minima 是個 ruby 套件，可以使用 `bundle` 指令找到其位置：

```bash
bundle info --path minima # /usr/local/bundle/gems/minima-2.5.1
```

找出位置後就可以將樣式表給複製出來。

### 從 GitHub 上直接抓取

也可以從 [jekyll/minima](https://github.com/jekyll/minima/tree/2.5-stable) 的 GitHub 庫抓取。

> 從 GitHub 上抓取須要注意版本的差異。

## 覆寫樣式

在 minima 中 `assets/main.scss` 這個檔案是所有樣式表的入口，修改這個檔案就可以覆寫樣式。

```scss
// main.scss
---
# Only the main Sass file needs front matter (the dashes are enough)
---
@import "minima";

@font-face {
  font-family: 'jf-openhuninn';
  src: url('jf-openhuninn-1.0.ttf') format('truetype');
}


body {
  font-family: jf-openhuninn, $base-font-family;
}
```

在 `@import "minima";` 之後的樣式會覆寫原本的樣式，而如果要修改 `_saas/minima.scss` 中的變數的話，要寫在 `@import` 之前。

```scss
// main.scss
---
# Only the main Sass file needs front matter (the dashes are enough)
---

$base-font-family: jf-openhuninn;

@import "minima";

@font-face {
  font-family: 'jf-openhuninn';
  src: url('jf-openhuninn-1.0.ttf') format('truetype');
}
```

## 結論

最近 **open 粉圓**字型推出，想說換一下部落格預設的字型來支持一下，順便學習如何客製 Jekyll 的主題。

> 如果想要看此文範例程式的可以到 [peterhpchen.github.io](https://github.com/peterhpchen/peterhpchen.github.io) 看喔。

## 參考資料

* [GitHub: jekyll/minima](https://github.com/jekyll/minima/tree/2.5-stable)
* [Jekyll DOCS: themes](https://jekyllrb.com/docs/themes/)
* [thoughtbot: A Sass `!default` use case](https://thoughtbot.com/blog/sass-default)