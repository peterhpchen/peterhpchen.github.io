---
layout: post
title:  "JavaScript的var陳述式"
date:   2018-02-04 20:00:00 +0800
categories: javascript
---
> 對JavaScript有稍微了解的人都知道，JavaScript中的var是在宣告變數時所使用的陳述式，但很多人對於var的理解都是建立在像是Java這樣的強型別語言的變數宣告上，這樣的理解對於JavaScript的開發者來說是很致命的，這樣的錯誤會產生Bug讓你多加兩天的班，為了避免少了兩個晚上的悠閒，我們現在來看看var究竟在玩什麼把戲。

## 抬升(Hoisting)

在[JavaScript的Hoisting]({% post_url 2018-01-31-javascript-hoisting %})一文有介紹變數的抬升機制，會有這樣的現象是因為編譯器會先掃過所有的程式碼，如果有`var`宣告的變數就會將其的定義放入記憶體中，現在再來看幾個比較特別的例子，鞏固觀念。

### 兩個變數在同行宣告

```javascript
var a = b, b = 'B';

console.log(`a: ${a}, b: ${b}`);  // a: undefined, b: B
```

上面的程式在**抬升**作用下會變得跟下面一樣:

```javascript
var a, b;

a = b;
b = 'B';

console.log(`a: ${a}, b: ${b}`);  // a: undefined, b: B
```

因為**抬升**的關係，`a`跟`b`的宣告已經被抓到**Scope**的最前面，因此`a=b`不會出現**Reference Error**，而因為`b`還**未設定初始值**，所以`a`會是拿到`undefined`的值。

### 迭代中的`var`

```javascript
for (var i = 0; i < 10; i++) {
  console.log(i);   // 0 1 2 3 4 5 6 7 8 9
}

console.log(i); // 10
```

上面的程式在**抬升**作用下會變得跟下面一樣:

```javascript
var i;
for (i = 0; i < 10; i++) {
  console.log(i); // 0 1 2 3 4 5 6 7 8 9
}

console.log(i); // 10
```

**抬升**會將`i`抬至`for`的設置外，這代表著一個令人喪氣的結果: 所有在`for`區塊中的`i`都**共享著相同的變數**，所以在`for`迴圈後依然可以叫用`i`並且其值會是**迭代結束的數字10**。

## `for`中的`function`

上節提到了抬升，我們接續迭代的例子，來看看將一般的程式觀念帶進JS是多麼的危險，請看下面的例子:

```javascript
var funcs = [];
for (var i = 0; i < 10; i++) {
  funcs.push(function() {
    return i;
  });
}

funcs.forEach(function(func) {
  console.log(func()); // all output 10
});
```

這裡我們在迴圈中將`return i`的函式加到`funcs`的陣列中，並在迭代後各別叫用陣列中的function，並且期望它出現0~9的結果，但卻出乎意料的傳回了10個10。

這是因為它們共享著相同的變數i，這個變數在叫用`funcs`陣列中的函式時已經因為迭代結束的關係被變成10了，所以才會得到錯誤的結果。

為了避免共享相同的變數，我們需要在每個函式中建立i的副本，這樣的目的可以用[IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)達到，下面我們用**IIFE**改寫上面的程式碼:

```javascript
var funcs = [];
for (var i = 0; i < 10; i++) {
  funcs.push(
    (function(value) {
      return function() {
        return value;
      };
    })(i)
  );
}

funcs.forEach(function(func) {
  console.log(func()); // 0 1 2 3 4 5 6 7 8 9
});
```

`IIFE`為每個回傳函式建立`value`的變數，而這個變數就是每個`i`的數值，這樣每個函式就**不是共享著變數i**的數值，而是**每次IIFE中的value**，如此一來就可以取得期望的答案了。

## 覆寫全域物件

當在**全域**下用`var`宣告變數時會**蓋掉全域物件(window in browsers)同名的資料**，我們看下面的例子:

```javascript
console.log(window.RegExp); // function RegExp()

var RegExp = 'Override!!';

console.log(window.RegExp); // Override!!
```

原本的`window.RegExp`因為我們**宣告了同名的變數**而被蓋掉了，在全域中使用`var`宣告變數要注意這樣的現象。

## 未宣告變數(Undeclared Variable)

只有給予變數初始值(ex: `a="A"`)稱為未宣告變數(**undeclared variable**)，它跟宣告變數(**declared variable**)有下面幾點的不同。

* 在嚴格模式下不能使用未宣告變數。

```javascript
'use strict'
a = 'A';    // ReferenceError: assignment to undeclared variable a
```

* 不管宣告的在何處，一定是全域變數。

```javascript
function demo() {
  var a = 'A';
  b = 'B';
}

demo();

console.log(a); // ReferenceError: a is not defined
console.log(b); // B
```

在之前的[JavaScript的Hoisting](/_posts/2018-01-31-javascript-hoisting.md)時有提到抬升只會在相同的作用域下動作，所以`var`宣告的`a`並不能在全域中被叫用，而未宣告變數可以。

* 宣告變數可以在未賦值前叫用，而未宣告變數會拋出錯誤。

```javascript
console.log(c); // ReferenceError: c is not defined

var d;
conosle.log(d); // undefined
```

未宣告變數在沒有賦值前都是不存在的。

* 宣告變數不是configurable，而未宣告變數是configurable

在[Proerty Descriptor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)中的`configurable`是決定可不可以修改`Property Decriptor`及可不可以`delete`的設定值，`true`的話就是可以做上述的操作，否則就不行。

```javascript
var e = 'E';
f = 'F';

delete e;   // Uncaught SyntaxError: Delete of an unqualified identifier in strict mode.
delete f;

console.log(e); // E
console.log(f); // ReferenceError: f is not defined
```

上面的例子有一個**宣告變數e**及**未宣告變數f**，對它們做`delete`，我們可以看到`e`因為`configurable`是`false`所以不能刪除，還是維持原來的值`E`，可是`f`已經被刪除了。

實際上在**嚴格模式**下，刪除宣告變數會拋出**Uncaught SyntaxError**。

## 結語

總結一下var的特別之處:

1. 宣告會被**抬升至Scope的頂端**。
1. 在**迴圈**中叫用函式時會因共享相同變數，而在函式中產生非預期結果，使用**IIFE可以避免**這樣的問題。
1. 在全域下宣告變數會**覆蓋`window`的變數**。

未宣告變數有下面幾個特性:

1. **嚴格模式**下未宣告變數會拋**例外**
1. 未宣告變數在任何Scope下都會是**全域變數**
1. **賦值時才會建立**
1. 是`configurable`

## 參考

* [MDN:var](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var)
* [MDN:IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)
* [Understanding ES6](https://leanpub.com/understandinges6)