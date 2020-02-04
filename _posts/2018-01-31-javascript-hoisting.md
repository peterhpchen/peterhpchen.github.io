---
layout: post
title: "JavaScript的Hoisting"
date: 2018-01-31 08:00:00 +0800
tags: javascript
---

> JavaScript有很多奇怪的地方，Hoisting就是其中一個跟其他程式語言比較不同的地方，它會將變數及函數的宣告向上擺，讓程式感覺上不像是由上往下執行，而是有某幾行先執行這樣的感覺，這顛覆了一般程式執行的概念，本章會由例子來觀察JavaScript的Hoisting機制。

## 抬升(Hoisting)

JavaScript中的**Hoisting**是個**將變數及函式定義抬至作用域頂端**的動作，但這樣的講法其實並不精確，事實上會有這樣的現象是因為**在編譯階段時會先將所有的變數及函式的宣告放進記憶體裡**，但並**不會去改變程式碼執行的順序**，由於變數的宣告已放進記憶體，所以在執行時才會有像是抬升的效果。

## 例子

一個例子抵千言萬語，我們就來看幾個例子。

### 什麼都沒有的a

```javascript
console.log(a); // ReferenceError: a is not defined
```

`a`並未宣告，會直接拋出**ReferenceError**的錯誤。

### 在叫用後設定初始值的A

```javascript
console.log(A); // ReferenceError: A is not defined
A = "A";
```

只有宣告有抬升的作用，**設定初始值並不會抬升變數**。

### 在叫用前宣告的b

```javascript
var b;
console.log(b); // undefined
```

`b`在叫用前宣告，JS會將未設定初始值的變數都設為`undefined`，故`b`會是`undefined`。

### 在叫用前宣告及設定初始值的B

```javascript
var B = 'B';
console.log(B); // B
```

`B`在叫用前宣告並設定初始值，會輸出設定的初始值。

### 在叫用後宣告的c

```javascript
console.log(c); // undefined
var c;
```

`c`因為宣告抬升的關係，所以在叫用`console.log(c);`時是已宣告的狀態，這樣的寫法**同於在叫用前宣告**的效果。

### 在叫用後宣告及設定初始值的C

```javascript
console.log(C); // undefined
var C = 'def';
```

因為**初始值並不會被抬升**，所以`C`依然是`undefined`。

### 在非全域的抬升

```javascript
function func() {
  console.log(d); // undefined
  var d;
}

console.log(d); // ReferenceError: d is not defined
```

在非全域中宣告變數`d`，它只會**被抬升到這個作用域(`function func`)中的最上面**，並不會在全域中宣告，因此在全域中的`d`是沒有被宣告的。

### 函式的抬升

```javascript
console.log(f()); // f

function f() {
  return "f";
}
```

**函式也有抬升的動作**，且可以正常被叫用。

## 結語

由上面的說明及例子我們可以得出結論:

* 抬升是因為**在編譯階段時會將變數宣告先放入記憶體裡**，它並**不會改變程式執行的順序**。
* 會做**抬升的只有變數及函式的宣告**，就算初始值寫在同一個陳述式依然只會抬升宣告。
* 如果在**非全域中做變數宣告，抬升並不會抬至全域**。
* **函式在抬升後可以被宣告前的程式碼正常叫用**，而變數會是`undefined`。

## 範例程式

<p data-height="265" data-theme-id="0" data-slug-hash="yvyXOQ" data-default-tab="js,result" data-user="peterhpchen" data-embed-version="2" data-pen-title="Hoisting in JavaScript" class="codepen">See the Pen <a href="https://codepen.io/peterhpchen/pen/yvyXOQ/">Hoisting in JavaScript</a> by Peter Chen (<a href="https://codepen.io/peterhpchen">@peterhpchen</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

## 參考

* [Understanding ECMAScript 6](https://leanpub.com/understandinges6/read#leanpub-auto-var-declarations-and-hoisting)
* [MDN-Hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)