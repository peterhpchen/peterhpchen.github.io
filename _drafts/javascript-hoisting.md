---
layout: post
title:  "JavaScript的Hoisting"
categories: javascript
---

> JavaScript有很多，Hoisting就是其中一個跟其他程式語言比較不同的地方，它會將變數及函數的宣告向上擺，讓程式感覺上不像是由上往下執行，而是有某幾行先執行這樣的感覺，這顛覆了一般程式執行的概念，本章會由例子來觀察JavaScript的Hoisting機制。

## 抬升(Hoisting)

JavaScript中的Hoisting是個將變數及函式定義抬至作用域頂端的動作，但這樣的講法其實並不精確，事實上會有這樣的現象是因為在編譯階段時會先將所有的變數及函式的宣告放進記憶體裡，但並不會去改變程式碼執行的順序，由於變數的宣告已放進記憶體，所以在執行時才會有像是抬升的效果。

## 例子

一個例子抵千言萬語，我們就來看幾個例子。

### 什麼都沒有的a

```javascript
console.log(a); // ReferenceError: a is not defined
```

a並未宣告，會直接拋出ReferenceError的錯誤。

### 在叫用後設定初始值的A

```javascript
console.log(A); // ReferenceError: A is not defined
A = "def";
```

只有宣告有抬升的作用，設定初始值並不會抬升變數。

### 在叫用前宣告的b

```javascript
var b;
console.log(b); // undefined
```

b在叫用前宣告，JS會將未設定初始值的變數都設維undefined，故b會是undefined。

### 在叫用前宣告及設定初始值的B

```javascript
var B = 'B';
console.log(B); // B
```

B在叫用前宣告並設定初始值，會輸出設定的初始值。

### 在叫用後宣告的c

```javascript
console.log(c); // undefined
var c;
```

c因為宣告抬升的關係，所以在叫用console.log(c);時是以宣告的狀態，這樣的寫法同於在叫用前宣告的效果。

### 在叫用後宣告及設定初始值的C

```javascript
console.log(C); // undefined
var C = 'def';
```

因為初始值並不會被抬升，所以C依然是undefined。

### 在非全域的抬升

```javascript
function func() {
  console.log(d); // undefined
  var d;
}

console.log(d); // ReferenceError: d is not defined
```

在非全域中宣告變數d，它只會被抬升到這個作用域(function func)中的最上面，並不會在全域中宣告，因此在全域中的d是沒有被宣告的。

### 函式的抬升

```javascript
console.log(f()); // f

function f() {
  return "f";
}
```

函式也有抬升的動作，且可以正常被叫用。

## 結語

JavaScript的抬升

## 範例程式

<p data-height="265" data-theme-id="0" data-slug-hash="yvyXOQ" data-default-tab="js,result" data-user="peterhpchen" data-embed-version="2" data-pen-title="Hoisting in JavaScript" class="codepen">See the Pen <a href="https://codepen.io/peterhpchen/pen/yvyXOQ/">Hoisting in JavaScript</a> by Peter Chen (<a href="https://codepen.io/peterhpchen">@peterhpchen</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

## 參考

* [Understanding ECMAScript 6](https://leanpub.com/understandinges6/read#leanpub-auto-var-declarations-and-hoisting)
* [MDN-Hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)