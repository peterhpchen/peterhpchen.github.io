---
layout: post
title: "在WSL下編寫程式"
date: 2018-01-26 11:00:00 +0800
tags: [windows, linux, bash, ruby]
---

> Ruby是一個很棒的程式語言，它的函式庫RubyGems上更是有很多很棒的套件可以使用，包括Jekyll這個GitHub Page的引擎，但Ruby對想要在Windows平台上做開發的人來說並不友善，我們必須要先安裝RubyInstaller才能進行編程，對於Linux只要一個指令就可以開始開發來說實在是有夠麻煩，WSL的出現是否會改變這個情況呢? 這篇就來介紹如何在WSL下編寫程式。

## 編成前

1. 開啟ubuntu應用
2. 將目前位置移至`/mnt`

```bash
cd /mnt
```

3. 查看目錄下的資料夾

```bash
ls
```

![directory](/assets/2018-01-26-code-on-wsl/directory.PNG)

在這裡我們會看到windows檔案系統的分割槽，我們將在這上面做開發。

* 如果想要使用Windows做編程的話請不要在Linux的檔案系統下做開發，詳情請看這篇官方部落格的[文章](https://blogs.msdn.microsoft.com/commandline/2016/11/17/do-not-change-linux-files-using-windows-apps-and-tools/)

## 安裝Ruby

1. 使用Linux套件系統取得Ruby

```bash
sudo apt-get install ruby
```

2. 確定安裝成功

```bash
ruby --version
```

![install ruby](/assets/2018-01-26-code-on-wsl/install-ruby.PNG)

## 寫些東西

1. 在工作目錄下開啟**Visual Studio Code**

```bash
code .
```

2. 在工作目錄下創建`ILoveRuby.rb`後存檔

```ruby
# Output "I love Ruby"
say = "I love Ruby"
puts say

# Output "I *LOVE* RUBY"
say['love'] = "*love*"
puts say.upcase

# Output "I *love* Ruby"
# five times
5.times { puts say }
```

3. 執行`ILoveRuby.rb`

```bash
ruby ILoveRuby.rb
```

![run ruby](/assets/2018-01-26-code-on-wsl/run-ruby.PNG)

## 上傳至GitHub

```bash
git init
git status
git add .
git commit -m 'Initial Project'
git remote add origin https://github.com/peterhpchen/rubyDemo.git
git push origin master
```

## 結語

在說明中整個流程相當的流暢輕快，也不用再安裝RubyInstaller就可以建置Ruby，但其實我在嘗試的時候將檔案建立在Linux的檔案系統下，在做編寫的時候就出現了編碼的問題(斷行字元)，所以如果要開發的話請在Windows下的檔案系統做開發，這樣以來使用WSL就會是事半功倍的了。

## 參考

* [Ruby](https://www.ruby-lang.org/zh_tw/)
* [msdn blog-Do not change Linux files using Windows apps and tools](https://blogs.msdn.microsoft.com/commandline/2016/11/17/do-not-change-linux-files-using-windows-apps-and-tools/)