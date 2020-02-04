---
layout: post
title: "如何用Bootstrap做左導覽列"
date: 2018-02-01 23:00:00 +0800
tags: bootstrap
---

> Bootstrap上有個navbar的功能，裡面提供了一個[External content](https://getbootstrap.com/docs/4.0/components/navbar/#external-content)的功能讓我們可以將內容先隱藏起來，等到使用者點擊按鈕觸發後才會以動畫的方式拉開內容，這樣的動畫呈現是使用了Bootstrap它自己的[Collapse元件](https://getbootstrap.com/docs/4.0/components/collapse/)，但是Collapse只提供上下的展開，並沒有左右伸縮的功能，這讓我很苦惱，因為需求是要做從左邊展開的導覽列，[自己刻一個](https://codepen.io/peterhpchen/pen/qppNwR)是沒有問題，但既然Bootstrap都有提供Collapse以及跟按鈕的整合了，不用一下說不過去，這篇就來看看要怎麼使用Bootstrap做出一個可以有轉換動畫做隱藏及顯示的左清單列吧。

> 2018-02-08: add new content: 使用transform的轉場動畫

## Navbar external content

> 先來做個一般的隱藏內容。

新增一個**隱藏內容**的元素:

```html
<div class="collapse" id="navbarToggleExternalContent">
  <div class="bg-dark p-4">
    <h4 class="text-white">Collapsed content</h4>
    <span class="text-muted">Toggleable via the navbar brand.</span>
  </div>
</div>
```

* `class`要加上`collaspe`。

新增一個觸發按鈕:

```html
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent">
  <span class="navbar-toggler-icon"></span>
</button>
```

* `data-toggle`要設為`collapse`。
* `data-target`設定選擇器，指向你要隱藏的元素(這裡是`#navbarToggleExternalContent`)。

這樣我們就完成了一個簡單的隱藏/顯示內容的功能了，下面是完整的程式碼:

<p data-height="265" data-theme-id="0" data-slug-hash="NyqmoZ" data-default-tab="html,result" data-user="peterhpchen" data-embed-version="2" data-pen-title="bootstrap 4 simple collapse with navbar" class="codepen">See the Pen <a href="https://codepen.io/peterhpchen/pen/NyqmoZ/">bootstrap 4 simple collapse with navbar</a> by Peter Chen (<a href="https://codepen.io/peterhpchen">@peterhpchen</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

## Collapse

要動手前我們要先知道關於**Collapse**這個元件的用法，它是一個可以讓對象在動作時有**慢慢展開的效果**，主要是由下面三個class來控制:

* `collapse`: 初始化時設定的class，會將**元素隱藏**。
* `collapsing`: 觸發展開/縮回時開始到完成前會有的class，這上面設定了**轉換時的動畫**。
* `collapse.show`: 展開後的元素會多一個show的class，將**元素顯示**出來。

### 小小的原碼探險

我們由文件知道了上面三個類別會做的動作，從我們的需求上看，`collapsing`是我們應該深入的地方，因為這裡是在處理**動畫呈現**的部分，現在來看Bootstrap是怎麼實作出來的，我們可以看到[_transitions.scss](https://github.com/twbs/bootstrap/blob/v4-dev/scss/_transitions.scss)這個檔案，把焦點聚在`Collapsing`這邊:

```css
/* _transitions.scss */
.collapsing {
  position: relative;
  height: 0;
  overflow: hidden;
  @include transition($transition-collapse);
}

/* _variables.scss */
$transition-collapse:         height .35s ease !default;
```

我們可以注意到`transition-property`是設定`height`，所以**Collapse**是不會有橫向的動畫的，所以之後再覆寫時應該要改動這個設置。

上面`collapsing`的樣式會看到它將`height`設為`0`，而`transition`會在`height`改變的時候動作，所以一定有個地方改變了元素的`height`，接著找到了[collapse.js](https://github.com/twbs/bootstrap/blob/v4-dev/js/src/collapse.js):

```js
...

const dimension = this._getDimension()

...

const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1)
const scrollSize = `scroll${capitalizedDimension}`

...

this._element.style[dimension] = `${this._element[scrollSize]}px`   // 用元素的scrollWidth(scrollHeight)來決定展開的大小

...

_getDimension() {
  const hasWidth = $(this._element).hasClass(Dimension.WIDTH)   // 判斷有沒有width class來決定要抓高度還是寬度
  return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT
}

...
```

這邊有兩個重點:

* `_getDimension()`會決定要抓的是**Width**還是**Height**，如果有設定**Width類別**的話就會抓**Width**。
* 展開的大小是由[scrollwidth](https://www.w3schools.com/jsref/prop_element_scrollwidth.asp)([scrollHeight](https://www.w3schools.com/jsref/prop_element_scrollheight.asp))決定。

這樣就萬事具備了，接著我們來試著開發吧。

## 將隱藏內容由左邊展開

> 接著進入本篇的重點，我們想要把隱藏的內容由左邊展開。

加上`width`類別讓`_getDimension()`取到的是**Width**:

```html
<div class="collapse width" id="navbarToggleExternalContent">
...
</div>
```

覆寫`.collapsing`:

```css
.collapsing {
  width: 0;
  transition-property: width;
  height: 100%;
}
```

覆寫的原因說明在下面:

* `width`設為`0`: **起始**寬度設置。
* `transition-property`設為`width`: 轉換的**目標**變為`width`。
* `height`設為`100%`: 因**高度不再是轉換的目標**，所以原本的`height: 0`要改為**原來的高度**，要不然會因為長寬都是0造成在轉換期間會看不到元素的錯誤。

下面是依照上面設置後的演示:

<p data-height="265" data-theme-id="0" data-slug-hash="ddoEwL" data-default-tab="html,result" data-user="peterhpchen" data-embed-version="2" data-pen-title="bootstrap 4 simple collapse with navbar(have scrollWidth Problem)" class="codepen">See the Pen <a href="https://codepen.io/peterhpchen/pen/ddoEwL/">bootstrap 4 simple collapse with navbar(have scrollWidth Problem)</a> by Peter Chen (<a href="https://codepen.io/peterhpchen">@peterhpchen</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

上面這樣成功讓隱藏內容由右邊展開了，但有兩個問題:

* 展開後的元素會**擠掉其他元素**。
* 在展開過程中內文的**文字會依照目前的寬度折行**。

第一個問題可以用`position:fixed`的設置來解決，我們用Bootstrap的`position-fixed`類別來實作。

```html
<div class="collapse width position-fixed" id="navbarToggleExternalContent">
...
</div>
```

第二個問題可以`white-space`設為`nowrap`來實現(參考自[StackOverflow](https://stackoverflow.com/a/1383147/9265131))。

解決這兩個問題後，現在會像是下面這樣。

<p data-height="265" data-theme-id="0" data-slug-hash="vdOoNZ" data-default-tab="html,result" data-user="peterhpchen" data-embed-version="2" data-pen-title="bootstrap 4 left navbar(have scrollWidth Problem)" class="codepen">See the Pen <a href="https://codepen.io/peterhpchen/pen/vdOoNZ/">bootstrap 4 left navbar(have scrollWidth Problem)</a> by Peter Chen (<a href="https://codepen.io/peterhpchen">@peterhpchen</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

如果觸發的話我們又會看到另一個問題，在轉換的最後會突然的顯示一節，有**不平滑**的感覺。

經過觀察發現`scrollwidth`的長度並不是真正的長度，它並不包含`right padding`，從這篇[StackOverflow](https://stackoverflow.com/a/10055302/9265131)我們可以知道將`padding`改為用`margin`實作就好，因此我們將內容改為下面這樣:

```html
<div class="bg-dark py-4">
  <h4 class="text-white mx-4">Collapsed content</h4>
  <span class="text-muted mx-4">Toggleable via the navbar brand.</span>
</div>
```

程式如下:

<p data-height="265" data-theme-id="0" data-slug-hash="yvYXbK" data-default-tab="html,result" data-user="peterhpchen" data-embed-version="2" data-pen-title="bootstrap v4 left menu bar(not height 100%)" class="codepen">See the Pen <a href="https://codepen.io/peterhpchen/pen/yvYXbK/">bootstrap v4 left menu bar(not height 100%)</a> by Peter Chen (<a href="https://codepen.io/peterhpchen">@peterhpchen</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

## 使用transform的轉場動畫

上面的例子所使用的轉場對象是`width`，看到的是清單內容慢慢隱沒的效果，還有另一種是直接把內容向左推，推動的是整個區塊，我們來看兩者的效果差別:

![transform-vs-width-transition](/assets/2018-02-01-bootstrap-left-collapse/transform-vs-width-transition.gif)

上面的比較圖我們可以看到左邊的是我們目前使用`width`做轉換的版本，可以看到它會慢慢的把內容文字從又變捲掉，而右邊會是整個區塊往左推，所以可以看到是從左邊的內容開始消失。

兩種不同的版本會因設計需求不同而被採用，現在來示範用`translate`的方式實作。

首先因為bootstrap的`collapse`是對長度(寬度或高度)做轉換，而`translate`的效果是不需要動到長度的，因此我們先把原本設定寬度`dimension`的`width`類別拿掉:

```html
<div class="bg-dark collapse position-fixed" id="navbarToggleExternalContent">...</div>
```

拿掉`width`後，bootstrap變回抓預設的`dimension`: `Height`了，所以我們現在要**固定高度**:

```css
#navbarToggleExternalContent{
  display: block;
  height: 100%;
  min-height: 100%;
}
```

在固定高度後，就要來修改動畫的部分，前面有說因為`collapse`是以長度為動畫依據，所以全部的預設動畫都沒有用處了，我們需要自己加上動畫。

為此我們需要定義一個`class`，在`show`的時候加到元素上，藉這個`class`來設定開啟時候的狀態，為了達到這個目的我們用bootstrap提供的js事件來實作:

```javascript
const $menu = $('#navbarToggleExternalContent');

$menu.on('show.bs.collapse', function () {
  $menu.addClass('menu-show');
});

$menu.on('hide.bs.collapse', function () {
  $menu.removeClass('menu-show');
});
```

使用`menu-show` class，在`show`的時候加上，在`hidden`的時候清掉，現在我們在`show`的時候元素上會有`menu-show`這個類別了。

最後我們來加上動畫吧，在**初始的狀態下我們是要隱藏menu的**，所以我們用`translateX(-100%)`來隱藏清單:

```css
#navbarToggleExternalContent{
  transform: translateX(-100%);
  transition: transform .35s ease;
  ...
}
```

接著在顯示的狀態下，清單的起始位置應該要在`0px`(靠左)的地方:

```css
#navbarToggleExternalContent.menu-show{
  transform: translateX(0%);
}
```

如此一來，我們就可以得到一個`translate`的左導覽列了:

<p data-height="265" data-theme-id="0" data-slug-hash="MQbYgp" data-default-tab="html,result" data-user="peterhpchen" data-embed-version="2" data-pen-title="bootstrap v4 left menu transform bar" class="codepen">See the Pen <a href="https://codepen.io/peterhpchen/pen/MQbYgp/">bootstrap v4 left menu transform bar</a> by Peter Chen (<a href="https://codepen.io/peterhpchen">@peterhpchen</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

## 結語

Bootstrap是個很易用的元件庫，我們可以用它來節省不少的時間及精力，像這次的覆寫也是因為Bootstrap本身就已經有開好入口讓我們可以輕鬆地修改，會卡住的應該就是對Transition還不太了解的人(就是我)，理解CSS的Transition後就很簡單了。

## 備註

* 本文使用的是**Bootstrap 4**。

## 參考

* [Github:bootstrap-_transitions.scss](https://github.com/twbs/bootstrap/blob/v4-dev/scss/_transitions.scss)
* [Github:bootstrap-_variables.scss](https://github.com/twbs/bootstrap/blob/v4-dev/scss/_variables.scss)
* [Github:bootstrap-collapse.js](https://github.com/twbs/bootstrap/blob/v4-dev/js/src/collapse.js)
* [bootstrap:collapse](https://getbootstrap.com/docs/4.0/components/collapse/)
* [bootstrap:navbar](https://getbootstrap.com/docs/4.0/components/navbar/)