---
layout: post
title: "為什麼JavaScript的Function是First-class Function?"
date: 2018-01-27 11:00:00 +0800
tags: javascript
---

> JavaScript是我目前最常使用的語言，但對於它的特性我一直沒有深入研究，只是在使用的時候隱約感覺到它有自己的特別之處，在這裡就來探討JavaScript的函式為什麼First-class function，它需要具備什麼特性以及在JavaScript中是怎麼運用First-class function的這些特性。

## First-class citizen

在講**First-class function**前，我們先來聊聊**First-class citizen**。

在程式語言中，**First-class citizen**是指**某個實體可以執行所有的操作**，這寫操作包括下面這幾項:

* 可以當作**參數**
* 可以當作函式的**回傳值**
* 可以被**修改**
* 可以指派給**變數**

現在知道定義了，但是實際上在程式語言上到底什麼是**First-class citizen**還是不太清楚，我們來看些例子吧。

### 舉例

下面的兩個例子分別探討在C語言中的兩個實體**Integer**及**Array**是不是**First-class citizen**。

#### Integer

首先來看看**Integer**在**C**中是不是**First-class citizen**。

```c
#include <stdio.h>

// Pass as an argument
int integer_is_first_class_citizen ( int arg ) {
    return arg; // Returned from a function
}

int main()
{
    int arg = 0;    // Assigned to a variable

    arg = 1;    // Modified

    integer_is_first_class_citizen ( arg );

    printf("Integer is a First-class citizen\n");

    return 0;
}
```

上面這個例子顯示了**Integer**在**C**中的確是**First-class citizen**，它滿足了所有的條件。

#### Array

再來我們來看**Array**在**C**中是否有滿足**First-class citizen**的條件。

```c
#include<stdio.h>

// arr is a pointer to the array's first element
void array_is_not_first_class_citizen ( int *arr, int count ) {
    for(int i = 0; i < count; i++) {
        arr[i]++;
    }
}

int main() {
    int arr[] = {0, 1, 2, 3, 4};

    array_is_not_first_class_citizen ( arr, 5 );

    for(int i = 0; i < 5; i++) {
        printf("%d ", arr[i]);
    }   // 1 2 3 4 5
}
```

這裡可以看到**Array**並不是**First-class citizen**，因在**C**中**Array**只能**用指標的方式傳入函式內**，也就是第一個元素的記憶體位置，所以它其實不能當作參數，所以他並**不是First-class citizen**。

## First-class function

來到本篇的重點，其實**First-class function**這個特性其實就是: **一個程式語言將函式賦予First-class citizen的特性**，實際來說有下面幾個特性:

* Higher-order functions
* Nested functions
* Anonymous functions
* Non-local variables

我們依序來說明上述的這些特性。

### Higher-order functions

**Higher-order functions**有兩個特性:

* 將一個或多個函式當作參數
* 回傳結果可以是函式

上面的特性以下面的例子說明:

```javascript
//  Higher-order function
//  1. Take one or more functions as arguments

function takeFuncAsArg(callback) {
  return callback("Arguments");
}

function helloWorld(featureName) {
  return "Hello " + featureName;
}

console.log(takeFuncAsArg(helloWorld));

//  2. Returns a function as its result

function returnFunc(callback) {
  return callback;
}

console.log(returnFunc(helloWorld)("Results"));
```

這個例子我們可以知道JavaScript的確可以將函式當作**參數**及**回傳值**。

### Nested functions

顧名思義就是**可以在函式被其他函式宣告**，我們來看下面的例子:

```javascript
// 2. Nested function
// A function which is defined within another function

function outterFunc(){
  function innerFunc() {
    return 'Inner';
  }

  return 'Hello Outter ' + innerFunc();
}

console.log(outterFunc());
```

可以看到`innerFunc`是在`outterFunc`中宣告的。

### Anonymous functions

匿名函式是可以**不用替函式命名就可以宣告函式**。

```javascript
// 3. Anonymous function
// A function definition that is not bound to an identifier

console.log(function() {return 'Hello Anonymous'}());
```

上述範例回傳`Hello Anonymous`的函式並沒有名稱，是一個**匿名函式**。

### Non-local variable

在**函式中可以取得不是全域也不是本區的變數**，請看下面的例子:

```javascript
// 4. Non-local variable
// A variable that is not defined in the local scope

function nonLocalVariable() {
  // outter is non-local variable for innerFunc
  var outter = "Non-local variable";

  function innerFunc() {
    return outter;
  }

  return "Hello " + innerFunc();
}

console.log(nonLocalVariable());
```

`outter`這個參數既**不是在全域**也**不是innerFunc中的區域變數**，它是在**Closure**時帶進來的。

## 代碼

附上CODEPEN的代碼供參考。

<p data-height="265" data-theme-id="0" data-slug-hash="ppXKWB" data-default-tab="js,result" data-user="peterhpchen" data-embed-version="2" data-pen-title="Why does JS have First-class function?" class="codepen">See the Pen <a href="https://codepen.io/peterhpchen/pen/ppXKWB/">Why does JS have First-class function?</a> by Peter Chen (<a href="https://codepen.io/peterhpchen">@peterhpchen</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

## 簡報

<iframe src="//slides.com/peter3598768/why-javascript-is/embed" width="576" height="420" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## 結語

由上述的特性及其JavaScript的範例來證明Function確實是**First-class functions**，其實**函數式語言一定會有First-class function**，所以屬於函數式語言的JavaScript理所應當會有**First-class function**。

## 參考

* [wiki: First-class citizen](https://en.wikipedia.org/wiki/First-class_citizen)
* [wiki: First-class function](https://en.wikipedia.org/wiki/First-class_function)
* [wiki: Higher-order function](https://en.wikipedia.org/wiki/Higher-order_function)
* [wiki: Nested function](https://en.wikipedia.org/wiki/Nested_function)
* [wiki: Non-local variable](https://en.wikipedia.org/wiki/Non-local_variable)
* [Medium: currying partial application](https://medium.com/javascript-inside/currying-partial-application-f1365d5fad3f)