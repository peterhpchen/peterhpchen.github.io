---
layout: post
title:  "如何用Bootstrap做Left Sidebar"
categories: bootstrap
---

> Bootstrap上有個navbar的功能，裡面提供了一個[External content](https://getbootstrap.com/docs/4.0/components/navbar/#external-content)的功能讓我們可以將內容先隱藏起來，等到使用者點擊按鈕觸發後才會以動畫的方式拉開內容，這樣的動畫呈現是使用了Bootstrap它自己的[Collapse元件](https://getbootstrap.com/docs/4.0/components/collapse/)，但是Collapse只提供上下的展開，並沒有左右伸縮的功能，這讓我很苦惱，因為需求是要做從左邊展開的導覽列，[自己刻一個](https://codepen.io/peterhpchen/pen/qppNwR)是沒有問題，但既然Bootstrap都有提供Collapse以及跟按鈕的整合了，不用一下說不過去，這篇就來看看要怎麼使用Bootstrap做出一個可以隱藏的左清單列吧。

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

要動手前我們要先知道關於Collapse這個元件的用法，它是一個可以讓對象在動作時有慢慢展開的效果，主要是由下面三個class來控制:

* collapse: 初始化時設定的class，會將元素隱藏。
* collapsing: 觸發展開/縮回時開始到完成前會有的class，這上面設定了轉換時的動畫。
* collapse.show: 展開後的元素會多一個show的class，將元素顯示出來。

### 小小的原碼探險

我們由文件知道了上面三個類別會做的動作，從我們的需求上看，collapsing是我們應該深入的地方，因為這裡是在處理動畫呈現的部分，現在來看Bootstrap是怎麼實作出來的，我們可以看到[_transitions.scss](https://github.com/twbs/bootstrap/blob/v4-dev/scss/_transitions.scss)這個檔案，把焦點聚在`Collapsing`這邊:

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

我們可以注意到`transition-property`是設定`height`，所以**Collapse**是不會有橫向的動畫的，這裡就是我們應該覆寫的地方。

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

* `_getDimension()`會決定要抓的是Width還是Height，如果有設定Width class的話就會抓Width。
* 展開的大小是由[scrollwidth](https://www.w3schools.com/jsref/prop_element_scrollwidth.asp)([scrollHeight](https://www.w3schools.com/jsref/prop_element_scrollheight.asp))決定。

這樣就萬事具備了，接著我們來試著開發吧。

## 將隱藏內容由左邊展開

> 接著進入本篇的重點，我們想要把隱藏的內容由左邊展開。

加上width class讓_getDimension()取到的是width:

```html
<div class="collapse width" id="navbarToggleExternalContent">
...
</div>
```

覆寫.collapsing:

```css
.collapsing {
  width: 0;
  transition-property: width;
  height: 100%;
}
```

* width設為0: 起始寬度設置。
* transition-property設為width: 轉換的目標變為width。
* height設為100%: 因高度不在是轉換的目標，所以原本的Height: 0要改為原來的高度，要不然會因為長寬都是0造成在轉換期間會看不到元素。

下面是依照上面設置後的演示:

<p data-height="265" data-theme-id="0" data-slug-hash="ddoEwL" data-default-tab="html,result" data-user="peterhpchen" data-embed-version="2" data-pen-title="bootstrap 4 simple collapse with navbar(have scrollWidth Problem)" class="codepen">See the Pen <a href="https://codepen.io/peterhpchen/pen/ddoEwL/">bootstrap 4 simple collapse with navbar(have scrollWidth Problem)</a> by Peter Chen (<a href="https://codepen.io/peterhpchen">@peterhpchen</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

上面這樣成功讓隱藏內容由右邊展開了，但有兩個問題:

* 展開後的元素會擠掉其他元素。
* 在展開過程中內文的文字會依照目前的寬度折行。

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

如果觸發的話我們又會看到另一個問題，在轉換的最後會突然的顯示一節，有不平滑的感覺。

經過觀察發現scrollwidth的長度並不是真正的長度，它並不包含`right padding`，從這篇[StackOverflow](https://stackoverflow.com/a/10055302/9265131)我們可以知道將padding改為用margin實作就好，因此我們將內容改為下面這樣:

```html
<div class="bg-dark py-4">
  <h4 class="text-white mx-4">Collapsed content</h4>
  <span class="text-muted mx-4">Toggleable via the navbar brand.</span>
</div>
```

最後的程式如下:

<p data-height="265" data-theme-id="0" data-slug-hash="VQLOVO" data-default-tab="html,result" data-user="peterhpchen" data-embed-version="2" data-pen-title="bootstrap v4 left menu bar" class="codepen">See the Pen <a href="https://codepen.io/peterhpchen/pen/VQLOVO/">bootstrap v4 left menu bar</a> by Peter Chen (<a href="https://codepen.io/peterhpchen">@peterhpchen</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

## 結語

Bootstrap是個很易用的元件庫，我們可以用它來節省不少的時間及精力，像這次的覆寫也是因為Bootstrap本身就已經有開好入口讓我們可以輕鬆地修改，會卡住的應該就是對Transition還不太了解的人(我)，理解CSS的Transition後就很簡單了。

## 參考

* [Github:bootstrap-_transitions.scss](https://github.com/twbs/bootstrap/blob/v4-dev/scss/_transitions.scss)
* [Github:bootstrap-_variables.scss](https://github.com/twbs/bootstrap/blob/v4-dev/scss/_variables.scss)
* [Github:bootstrap-collapse.js](https://github.com/twbs/bootstrap/blob/v4-dev/js/src/collapse.js)
* [bootstrap:collapse](https://getbootstrap.com/docs/4.0/components/collapse/)
* [bootstrap:navbar](https://getbootstrap.com/docs/4.0/components/navbar/)