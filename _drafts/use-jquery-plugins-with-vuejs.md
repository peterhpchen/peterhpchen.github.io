---
layout: post
title:  "在Vue.js中使用JQuery Plugins"
categories: vuejs jquery
---

> 在開發時最好避免混用Vue.js及JQuery，因為兩個框架的理念並不相同，Vue.js是專注在對Model的操作，而JQuery則是專注在DOM的操作，如果在Vue中使用JQuery，那JQuery所更新的DOM或是處理會因為不是透過Vue.js的Model更新而不會被Vue.js所察覺，導致我們在操作Model時會跟JQuery的資料脫鉤。
>
> 但現實總是沒有這麼簡單，我最近在開發需要組織圖的功能，雖然有找到[vue-orgchart](https://github.com/spiritree/vue-orgchart)這個Vuejs的Plugin，但是功能較少，並不符合專案的需求，最後找到了這個專案的[原版](https://github.com/dabeng/OrgChart)，功能很充足，也符合需求，但它是用JQuery寫的，本來也有考慮過要重寫成Vue.js版本的，但沒有時間讓我慢慢研究，最後只好妥協在Vue.js中使用JQuery，本篇文章記錄了在Vue.js中使用JQuery的學習過程。

## 封裝

由於JQuery更新DOM後，Vue不會發現DOM已經改變，會導致Vue的Model跟真實狀況不符合的問題。

為了處理這個問題我們需要將JQuery的Plugins封裝成Vue的Component，Vue對其可以透過v-model更新封裝後的Component，而JQuery在修改DOM後也可以emit回Vue的Parent Component。

## 範例

本篇文章會以JQuery UI的Datepicker做實際的封裝範例。

## 起步

現在拿到了一個JQuery UI的Plugin: Datepicker，我們需要將它用在Vue的專案中。

我們直覺地寫了一個input的html作為此Plugin的初始元素，宣告了一個v-model作為此日期資料的model。

```html
<input id="pluginDate" v-model="pluginDate">
```

接著我們建立一個Vue實體，在mounted的事件鉤子中初始化Datepicker。

```js
new Vue({
  el: "#app",
  data: {
    pluginDate: null
  },
  mounted() {
    $('#pluginDate').datepicker();
  }
});
```

這樣就完成了Plugin的初始化了，我們高興地開啟頁面，點擊輸入框跑出了日期選擇器，選取完成後輸入框中會有選取日期的資料，當以為一切都很順利時，卻發現pluginDate依然是初始值null!!!

這是因為JQuery UI的Datepicker選取資料之後是直接修改DOM的Value而沒有經由Vue Model所造成的。

我們可以在下面完整的例子中看到使用HTML的input date使可以正常更新v-model的，反之用Plugin的Datepicker並沒有反應。

<p data-height="265" data-theme-id="0" data-slug-hash="NYpGyq" data-default-tab="html,result" data-user="peterhpchen" data-embed-version="2" data-pen-title="Use Jquery with Vue without wrapper(fail)" class="codepen">See the Pen <a href="https://codepen.io/peterhpchen/pen/NYpGyq/">Use Jquery with Vue without wrapper(fail)</a> by Peter Chen (<a href="https://codepen.io/peterhpchen">@peterhpchen</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## 二次嘗試

在經過第一次的嘗試後我們了解當Plugin去修改DOM的Value時並不會去更新v-model，既然這樣那我們就手動更新就好啦。

在Datepicker的onSelect事件中更新v-model。

```js
new Vue({
  ...
  mounted() {
    var self = this;
    $('#datepicker').datepicker({
      onSelect: function(date) {
        self.date = date;   // update date model
      }
    });
  }
});
```

如此一來在選取日期後v-model: date就會自動同步了。

但這樣只解決了由Plugin到v-model方向的同步，從v-model到Plugin方向卻還沒有同步，為此我們加入一個watch監看date的變化，只要v-model更新我們也要同步更新DOM的value。

```js
new Vue({
  ...
  watch: {
    date(value) {
      $('#datepicker').val(value);  // update DOM value
    }
  },
  ...
});
```

這樣來往DOM value跟v-model間的通道都已經打通了，可以使用Plugin並且享用Vue的model binding了。

完整示例如下:

<p data-height="265" data-theme-id="0" data-slug-hash="GxWRVR" data-default-tab="js,result" data-user="peterhpchen" data-embed-version="2" data-pen-title="Use Jquery with Vue without wrapper" class="codepen">See the Pen <a href="https://codepen.io/peterhpchen/pen/GxWRVR/">Use Jquery with Vue without wrapper</a> by Peter Chen (<a href="https://codepen.io/peterhpchen">@peterhpchen</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## 更進一步

在上一節中我們藉由methods跟watch來更新v-model及DOM value，但Plugin這種通常都是要重複利用的，如果我們每新增一個Datepicker就要一段程式碼的話，應該會非常難使用，接著我們就來將Plugin用Components包裝來達到復用的效果。

### 在包裝之前

再用Component封裝Plugin前，我們先來認識v-model，它其實是一個語法糖，[官網](https://vuejs.org/v2/guide/components.html#Form-Input-Components-using-Custom-Events)中說明:

```html
<input v-model="something">
```

是下面這段的語法糖:

```html
<input
  v-bind:value="something"
  v-on:input="something = $event.target.value">
```

由此可知要滿足v-model的功能需要實作:

* value資料: 更新something時，value也會更新
* input事件: 叫用input事件，傳入目前DOM的value來更新something

### 封裝至component

首先建立一個date-picker的component:

```js
Vue.component("date-picker", {
  template: "<input/>",
  mounted: function() {
    var self = this;
    $(this.$el).datepicker();
  },
  beforeDestroy: function() {
    $(this.$el)
      .datepicker("hide")
      .datepicker("destroy");
  }
});
```

這裡比較需要注意的是因為是JQuery Plugin的關係，所以Vue並不會將其銷毀在銷毀前需要再beforeDestroy的鉤子中手動將其實體銷毀。

再來要實作v-model，我們需要將value當作props傳入，以及在onSelect時驅動input事件。

```js
Vue.component("date-picker", {
  ...
  props: ["value"],
  watch: {
    value(value) {
      $(this.$el).val(value);   // value改變時代表v-model改變，此時需要更新DOM的Value
    }
  },
  mounted: function() {
    var self = this;
    $(this.$el).datepicker({
      onSelect: function(date) {
        self.$emit("input", date);  // 叫用input事件，帶入更新後的日期資料來更新v-model
      }
    });
  },
  ...
});
```

這樣一個Datepicker的wrapper就完成了。

下面是完整的程式碼:

<p data-height="265" data-theme-id="0" data-slug-hash="RMaGbx" data-default-tab="js,result" data-user="peterhpchen" data-embed-version="2" data-pen-title="Use Jquery with Vue" class="codepen">See the Pen <a href="https://codepen.io/peterhpchen/pen/RMaGbx/">Use Jquery with Vue</a> by Peter Chen (<a href="https://codepen.io/peterhpchen">@peterhpchen</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## 結語

在Vue中使用JQuery時一定要特別小心，要不然會因為其跟Vue實體的脫鉤而造成Bug，如果有時間的話最好還是重寫成Vue的版本，如果有時程上的限制最少也要包成Wrapper的方式使用，可以減少除錯的時間。

## 參考

* [Anthony Gore: vue-js-safely-jquery-plugin](https://vuejsdevelopers.com/2017/05/20/vue-js-safely-jquery-plugin/)
* [Vue.js Examples: Wrapper Component](https://vuejs.org/v2/examples/select2.html)