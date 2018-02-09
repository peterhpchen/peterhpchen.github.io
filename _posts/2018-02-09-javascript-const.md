---
layout: post
title:  "JavaScript中的const"
date:   2018-02-09 23:00:00 +0800
categories: javascript
---

> const宣告的變數是區塊級別的宣告，一開始就要設定初始值，在存在的scope中不能再重新賦值。

## 與let比較

`const`跟`let`非常的相似，它們的相似之處在於宣告區塊的相關特性，總共有下面三項:

* 宣告變數會是**區塊級別**。
* 在相同區塊下**禁止重複宣告**。
* 相同區塊下，在**未宣告前的行數，此變數都是在Temporal Dead Zone(TDZ)中**。

上面三點在[JavaScript的Hoisting]({% post_url 2018-01-31-javascript-hoisting %})一文中已有詳細說明，我們以下面幾個例子再來回想上面所述的特性。

### 區塊級別

```javascript
const a = 'global';

if(true){
  const a = 'block';
  
  console.log(a); // block
}

console.log(a); // global
```

在`if`區塊內的`a`跟全域中的`a`因為區塊不同而被宣告為不同的變數，因此這樣的動作是合法的。

### 禁止重複宣告

```javascript
const a = 'global';

var a = 'redeclaration';  // SyntaxError: redeclaration of const a
```

在最後一行用`var`宣告的`a`因為跟`global`的`a`都同在全域中，因此這次會拋出`SyntaxError`的錯誤。

### TDZ

```javascript
// TDZ
console.log(typeof a);  // ReferenceError: can't access lexical declaration `a' before initialization

console.log(a); // ReferenceError: can't access lexical declaration `a' before initialization
// TDZ
const a = 'global';
```

在TDZ中為了跟未宣告變數作區別，所以在TDZ中使用`typeof`也會拋出`ReferenceError`。

## const的特性

### 不可重複賦值

`const`所宣告的變數本身有不可重複賦值的特性:

```javascript
const a = "global";
a = "reassign"; // TypeError: invalid assignment to const `a'

if(true){
  a = 'reassign'; // TypeError: invalid assignment to const `a'
}
```

* 第一次的`reassign`因在同一個區塊中，所以因為`const`不可重複賦值的特性而拋出`TypeError`。
* 在`if`區塊中的第二次`reassign`雖然區塊不同，但因為`if`區塊內並沒有宣告`a`，所以會向上一層區塊找尋，找到的就是`const`的`a`變數，因此還是拋出`TypeError`。

### 物件中的內容可以改變

```javascript
const arr = [];
const obj = {
  name: 'hi'
};

arr.push('ya');
obj.name = 'oh';

arr = ['ya']; // TypeError: invalid assignment to const `arr'
obj = {
  name: 'oh'
};  // TypeError: invalid assignment to const `obj'
```

這個例子以`Array`及`Object`為例，我們可以看到`arr`用`push`增加元素或是`obj`改變`name`都不會拋出例外，但是對於`const`物件本身做修改的話就會出錯。

## 迴圈中的const

現在我們知道`const`是一個不可以重新賦值的變數，那它可以用在迴圈中嗎? 我們看看下面的例子:

```javascript
for (const i = 0; i < 10; i++) {
  console.log(i); // 0
} // TypeError: invalid assignment to const `i'
```

看這個例子會發現，在第一次巡覽時(`i=0`)是正確的，會輸出`0`，但是在第二次巡覽時因為`i++`試圖改變`const`變數，所以拋出了例外。

上面的例子我們知道`const`不能用在`for`中，那`for of`呢?

```javascript
var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
for (const i of arr) {
  console.log(i); // 0 1 2 3 4 5 6 7 8 9
}
```

因為`for of`會在每次巡覽中重新宣告一個新的`const i`變數，因此每次的巡覽都是不同的變數，也沒有像`i++`這樣改動`const`變數，所以只要在`for`區塊內沒有動到`i`變數就會是合法的操作，所以`for of`及`for in`對`const`來說都是合法的動作。

## 比較表

綜合之前[JavaScript的var陳述式]({% post_url 2018-02-04-javascript-variable-statement %})及[JavaScript中的Let]({% post_url 2018-02-08-javascript-let %})的介紹，我們可以整理成兩張表格，一張是**非區塊級別宣告及區塊級別宣告的差異**，另一張是**let及const的差異**。

### 非區塊級別宣告(var) vs 區塊級別宣告(let/const)

這裡以**作用域**、**重複宣告**及**全域**的特性做比較。

||var|let/const|
|-|-|-|
|**Scope**|Hoisting|Block Bindings(TDZ)|
|**Redeclaration**|Yes|No|
|**Global**|Yes|No|

### let vs const

這裡以**初始化**及**重複賦值**的兩個特性做比較。

||let|const|
|-|-|-|
|**Initialization**|Optional|Necessary|
|**Reassign**|Yes|No(except value of objects)|

## 結語

`const`宣告變數本身是區塊級別的宣告，跟`let`一樣也有不能重複宣告的特性，而其自身有不能重新賦值但物件的內容可以重新賦值的特性，在宣告常數量時非常好用，我們也在文末做了`var`、`let`及`const`的區別比較圖，幫助我們更容易了解三者的差異。

## 參考

* [MDN:const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
* [Understanding ECMAScript 6](https://leanpub.com/understandinges6/)