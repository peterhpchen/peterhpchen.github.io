---
layout: post
title: "XML 解析時遭遇非法字元錯誤"
tags: [xml, debug]
---

使用 `jekyll-feed` 所產生的 `feed.xml` 出現 **PCDATA invalid Char value 8** 錯誤，造成解析失敗。

## 原因

使用 `RSS` 消息來源訂閱文章時，來源要產生一個描述檔，讓訂閱器可以知道來源的資訊，這個描述檔使用 XML version 1.0 的格式寫成，你會看到類似下面這樣的內容：

```xml
<?xml version="1.0" encoding="utf-8"?>
<feed
    xmlns="http://www.w3.org/2005/Atom" >
    <generator uri="https://jekyllrb.com/" version="3.8.5">Jekyll</generator>
    <link href="https://peterhpchen.github.io/feed.xml" rel="self" type="application/atom+xml" />
    <link href="https://peterhpchen.github.io/" rel="alternate" type="text/html" />
    <updated>2020-03-16T12:38:36+08:00</updated>
    <id>https://peterhpchen.github.io/feed.xml</id>
    <title type="html">Limitless Ping</title>
    <subtitle>Personal GitHub Page</subtitle>
    <entry>
        <title type="html">從 Blogger 遷移至 jekyll</title>
        <link href="https://peterhpchen.github.io/2020/03/15/jekyll-blogger-import.html" rel="alternate" type="text html" title="從 Blogger 遷移至 jekyll" />
        <published>2020-03-15T00:00:00+08:00</published>
        <updated>2020-03-15T00:00:00+08:00</updated>
        <id>https://peterhpchen.github.io/2020/03/15/jekyll-blogger-import</id>
        <content type="html" xml:base="https://peterhpchen.github.io/2020/03/15/jekyll-blogger-import.html">
            ...
        </content>
        <author>
            <name></name>
        </author>
        <category term="jekyll" />
        <category term="blogger" />
        <category term="github-page" />
        <summary type="html">最近在遷移 Blogger 中的舊文章到 jekyll 的 GitHub page 上，本文紀錄如何輸出 Blogger 的文章並輸入至 jekyll 中，並將原本 Blogger 的頁面導至新的 jekyll 頁面。</summary>
    </entry>
    ...
</feed>
```

可以看到描述檔中包含文章的內容，`jekyll-feed` 會自動由文章產生這個描述檔，但是[有些字元](https://en.wikipedia.org/wiki/Valid_characters_in_XML)在 XML 中是非法的，像是這個錯誤中的 value 8 指的就是 `U+0008` 這個[控制字元](https://en.wikipedia.org/wiki/Control_character#:~:text=In%20computing%20and%20telecommunication%2C%20a,a%20symbol%20to%20the%20text.) **Backspace** 。

## 解法

只要把非法字元刪除即可解決此問題，使用 Visual Studio Code 的 Search 功能將 **Backspace** 刪去：

![replace](/assets/2020-03-17-xml-parse-invalid-char-value/replace.png)

## 參考資料

* [CSDN: XML 解析中，如何排除控制字符](https://blog.csdn.net/jayxujia123/article/details/5990213)
* [WIKI: Valid characters in XML](https://en.wikipedia.org/wiki/Valid_characters_in_XML)
* [WIKI: RSS](https://en.wikipedia.org/wiki/RSS)
* [WIKI: Control Character](https://en.wikipedia.org/wiki/Control_character#:~:text=In%20computing%20and%20telecommunication%2C%20a,a%20symbol%20to%20the%20text.)