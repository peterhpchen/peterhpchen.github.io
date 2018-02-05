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

## 參考

* [MDN:let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)