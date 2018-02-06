---
layout: post
title:  "JavaScript中的Let"
date:   2018-02-05 01:00:00 +0800
categories: javascript
---

> 使用var宣告的變數跟我們一般的認知有很大的不同，主要的原因是抬升及其作用域的特性，使得開發者在使用的時候一不小心就會有誤用的情形，在ES2015後，我們多了let及const的宣告方式，沒有抬升也有了區塊作用域，讓我們擁有更加強固的變數宣告能力，本章會介紹let的相關特性。

## 作用域的範圍

let的作用域是在區塊內而非像var是在整個函式或是全域中，這就是所謂的區塊級別的宣告，區塊級宣告會存在於:

* 宣告變數的函式中。
* 區塊中({}之間的區域)。

第一點是var所宣告的變數也會滿足的條件，兩個的差別在第二點，如果在一個區塊中(ex: `if`)宣告變數，let的變數在離開區塊時就會被消滅，所以在區塊外是不能使用這個變數的，可是var因為Hoisting的影響，所以會被抬升至函式頂端，導致在其他區塊也可以使用。

下面這個例子演示var的作用域範圍:

```javascript
function varDemo(condition){
  var a = 'A';
  
  if(condition){
    var b = 'B';
    
    console.log(a); // A
    console.log(b); // B
  }else{
    console.log(a); // A
    console.log(b); // undefined
  }
  
  console.log(a); // A
  console.log(b); // undefined
}

varDemo(true);
varDemo(false);

console.log(a); // ReferenceError: a is not defined
console.log(b); // ReferenceError: b is not defined
```

* `a`的作用域是整個`varDemo`函式。
* `b`的作用域因為Hoisting抬至`varDemo`函式的頂端，所以作用域還是整個`varDemo`函式，但是初始值的設定還是在原本的位置，所以其他地方叫用`b`會是`undefined`。

我們用上面完全相同的例子，但改用let宣告變數:

```javascript
function letDemo(condition){
  let c = 'C';
  
  if(condition){
    let d = 'D';
    
    console.log(c); // C
    console.log(d); // D
  }else{
    console.log(c); // C
    console.log(d); // ReferenceError: d is not defined
  }
  
  console.log(c); // C
  console.log(d); // ReferenceError: d is not defined
}

letDemo(true);
letDemo(false);

console.log(c); // ReferenceError: c is not defined
console.log(d); // ReferenceError: d is not defined
```

* c的作用域跟var的a一樣都是整個函式。
* 因let沒有Hoisting，所以d的作用域只在if的區塊中。

## 禁止重複宣告

var可以對同一個變數重複宣告，可是對let來說是非法的:

```javascript
var ab = 'A';
let ab = 'B';  // SyntaxError: redeclaration of var a
```

但是如前一節所提，在不同的作用域下的`let`變數會是不同的，所以不會有錯誤:

```javascript
var cd = 'C';

if(true){
  let cd = 'D'; // The scope of let cd is different from var cd.
}
```

因為`let`禁止重複宣告，所以在使用`switch`時要特別小心，來看一下在[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)中的例子:

```javascript
let x = 1;
switch(x) {
  case 0:
    let foo;
    break;
    
  case 1:
    let foo; // SyntaxError for redeclaration.
    break;
}
```

這個`switch`的例子因為在case裡沒有加上`{}`來限制`foo`變數的作用域，導致`foo`的作用域變成`switch`本身，所以`case 0`時已經宣告的`foo`在`case 1`中又宣告了一次，因而產生錯誤。

上面的錯誤示範只要將case以{}包住即可:

```javascript
let x = 1;

switch(x) {
  case 0: {
    let foo;
    break;
  }  
  case 1: {
    let foo;
    break;
  }
}
```

## Temporal Dead Zone(TDZ)

JavaScript的編譯器在發現變數宣告有可能會有兩個動作:

* 遇到var宣告時，將變數抬升至作用域頂端。
* 遇到let或是const宣告時，將變數放至Temporal Dead Zone(TDZ)。

var會將變數的宣告抬升至作用域頂端，所以在宣告前叫用變數是不會出錯的，只會拿到未宣告的初始值undefined。

```javascript
function hoistingDemo(){
  // var a  // Declaration of a By Hoisting
  
  console.log(typeof a);  // undefined
  
  console.log(a); // undefined
  
  var a = 'A';
}
```

而由於let及const並沒有抬升的機制，所以在區塊裡還未執行到宣告的行數前，這個變數都是在TDZ中，在這個範圍內叫用此變數的話會拋出Reference Error的例外。

```javascript
function TDZDemo(){
  // TDZ
  console.log(typeof b);  // undefined

  console.log(typeof a);  // ReferenceError: can't access lexical declaration `a' before initialization
  
  console.log(a); // ReferenceError: can't access lexical declaration `a' before initialization
  // TDZ
  let a = 'A';
}
```

從上面的程式可以看出來未宣告的b叫用typeof會回傳undefined，而用let宣告的變數a卻在叫用typeof的時候丟回ReferenceError的例外，這是因為typeof為了辨識未宣告變數及在TDZ中的變數所做的差異。

接著來看幾個在MDN上的特別例子。

* 同一個陳述式中

```javascript
function test(){
   var foo = 33;
   if (true) {
      let foo = (foo + 55); // ReferenceError
   }
}
```

這裡會拋出ReferenceError的例外，是不是出乎意料呢? 其實仔細想想(foo + 55)已經在if的區塊中了，所以會先找if區塊中是否有宣告foo變數，而if區塊中確實有let foo的宣告，所以會抓到if區塊中的foo，但是這個foo在(foo + 55)執行時還是在TDZ中，所以就會拋出錯誤。

* 迴圈中

```javascript
function go(n) {
  // n here is defined!
  console.log(n); // Object {a: [1,2,3]}

  for (let n of n.a) { // ReferenceError
    console.log(n);
  }
}
go({a: [1, 2, 3]});
```

這裡的(let n of n.a)已經在for的區塊內了，所以會先找for區塊中有沒有n的宣告，發現區塊中的確有let n的宣告，但是在叫用n.a的時候，在for區塊內的n還未被宣告，因此是在TDZ中，所以會拋出ReferenceError例外。

## 迴圈中的let

在迴圈中如果想要用index設定函式的參數時，需要用IIFE來存入副本變數，否則每次的參考變數都會指向同一個。

```javascript
function varForDemo() {
  var funcs = [];
  for (var i = 0; i < 10; i++) {
    funcs.push(function() {
      return i; // same variable i
    });
  }
  funcs.forEach(function(func) {
    console.log(func());  // 10 10 10 10 10 10 10 10 10 10
  });
}

function varForIIFEDemo() {
  var funcs = [];
  for (var i = 0; i < 10; i++) {
    funcs.push(
      (function(value) {
        return function() {
          return value; // value is a copy of i. every value is different variable.
        };
      })(i)
    );
  }
  funcs.forEach(function(func) {
    console.log(func());  // 0 1 2 3 4 5 6 7 8 9
  });
}
```

而let可以幫我們很優雅地解決這個問題，因為let在每個區塊中都會是新的變數，所以每次的迭代都會是不同的變數。

```javascript
function letForDemo() {
  var funcs = [];
  for (let i = 0; i < 10; i++) {
    funcs.push(function() {
      return i; // every i is different variable.
    });
  }
  funcs.forEach(function(func) {
    console.log(func());  // 0 1 2 3 4 5 6 7 8 9
  });
}
```

## 結語

## 參考

* [MDN:let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
* [MDN:typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)