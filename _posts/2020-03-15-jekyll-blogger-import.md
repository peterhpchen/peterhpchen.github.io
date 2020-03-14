---
layout: post
title: "從 Blogger 遷移至 jekyll"
tags: [jekyll, blogger, github-page]
---

最近在遷移 Blogger 中的舊文章到 jekyll 的 GitHub page 上，本文紀錄如何輸出 Blogger 的文章並輸入至 jekyll 中，並將原本 Blogger 的頁面導至新的 jekyll 頁面。

## 將 Blogger 文章轉為 jekyll 頁面

首先需要將 Blogger 中的文章轉為 jekyll 頁面，有兩個步驟：

* 將 Blogger 文章輸出為 xml
* 將輸出的 xml 轉換成 jekyll 的格式

### 將 Blogger 文章輸出為 xml

進入 Blogger **後台>設定>其他>備份內容>儲存至您的電腦**：

![blogger-export](/assets/2020-03-15-jekyll-blogger-import/blogger-export.png)

可以看到一個名為 `blog-MM-DD-YYYY.xml` 的檔案載到電腦中，這檔案就是部落格中文章的輸出檔。

### 將輸出的 xml 轉換成 jekyll 的格式

jekyll 有提供轉換程式: [jekyll-import](https://github.com/jekyll/jekyll-import)，我將它做成 Docker image: [peter3598768/jekyll-import](https://hub.docker.com/r/peter3598768/jekyll-import) 以便沒有 Ruby 環境的使用者(就像我...)使用:

```bash
docker run --rm -v $PWD:/srv peter3598768/jekyll-import blogger --source blog-03-13-2020.xml
```

* `blog-03-13-2020.xml` 換成你自己的 xml 檔

如果一切順利的話會產生兩個資料夾： `_drafts`, `_posts` ，這樣一來就已經將 Blogger 的內容轉為 jekyll 的頁面了。

最後只要將 `_drafts`, `_posts` 中的內容貼至 jekyll 的資料夾中就大功告成了。

## 將原本的 Blogger 網址重導至 GitHub page

舊有的 Blogger 網址還是有可能被訪問，為了讓讀者可以訪問新的 GitHub page ，需要將原本 Blogger 導致新的 GitHub page。

在 Blogger 及 jekyll 的設定中都需要作配置：

* Blogger 頁面重導至 GitHub page
* jekyll 的 `permalink` 設定

### Blogger 頁面重導至 GitHub page

開啟 Blogger **後台>主題>編輯HTML**：

![blogger-redirect-github-page](/assets/2020-03-15-jekyll-blogger-import/blogger-redirect-github-page.png)

將下面的程式碼貼到 `<head>` 中：

```html
<script>
    var currentUrl = '<data:blog.url/>';
    var homeUrl = '<data:blog.homepageUrl/>';
    var currentPage = currentUrl.replace(homeUrl, '');
    location.href = 'https://peterhpchen.github.io/' + currentPage;
</script>
```

* `https://peterhpchen.github.io/` 換成你的網頁地址

這樣一來 Blogger 的頁面就會自動重導至對應的頁面中。

### jekyll 的 permalink 設定

大家如果有照上面的做，應該會發現文章的重導會導至 404 頁面，這是因為 Blogger 預設的 permalink 跟 jekyll 預設的不相同：

* Blogger: `https://limitlessping.blogspot.com/2016/04/sql-server-2012northwind.html`
* jekyll: `https://peterhpchen.github.io/2016/04/03/sql-server-2012northwind.html`

Blogger 連結沒有**日**的階層，為解決這問題，需要修改 jekyll 頁面中 front matter 的 `permalink`：

```yaml
permalink: /:year/:month/:title:output_ext
```

如此一來，jekyll 的頁面就會對應至 Blogger 相符的網址。

而為了可以批次修改所有的文章，我使用 Visual Studio Code 的 Search 功能：

![permalink-replace-all](/assets/2020-03-15-jekyll-blogger-import/permalink-replace-all.png)

## 總結

這次分為兩個階段介紹：

* 從 Blogger 文章輸出為 jekyll 內容：Blogger 輸出 xml 並使用 jekyll-import 轉換為 jekyll 內容
* 將 Blogger 網址重導至 GitHub page：設置 Blogger 重導，並修改 jekyll permalink 導至正確網址

## 參考資料

* [GitHub: jekyll/jekyll-import](https://github.com/jekyll/jekyll-import)
* [GitHub: peterhpchen/docker-jekyll-import](https://github.com/peterhpchen/docker-jekyll-import)
* [Blogger Help: Layouts Data Tags](https://support.google.com/blogger/answer/47270)
* [Ken Yang筆記: 如何把Google Blogger搬到Github pages](http://blog.kenyang.net/2015/11/26/move-blogger-to-github)
* [jekyll DOCS: Permalinks](https://jekyllrb.com/docs/permalinks/)
* [BLOGTIMENOW: How to automatically redirect Blogger blog to another blog or website](https://blogtimenow.com/blogging/automatically-redirect-blogger-blog-another-blog-website/)