---
layout: post
title:  "JavaScript中的const"
categories: javascript
---

> const宣告的變數是區塊級別的宣告，一開始就要設定初始值，在存在的scope中不能再重新賦值。

## 與let比較

const跟let非常的相似，它們的相似之處在於宣告區塊的相關特性，總共有下面三項:

* 宣告變數會是區塊級別。
* 在相同區塊下禁止重複宣告。
* 相同區塊下，在未宣告前的行數，此變數都是在Temporal Dead Zone(TDZ)中。

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

在`if`區塊內的a跟全域中的a因為區塊不同而被宣告為不同的變數，因此這樣的動作是合法的。

### 禁止重複宣告

```javascript
const a = 'global';

var a = 'redeclaration';  // SyntaxError: redeclaration of const a
```

在最後一行用var宣告的a因為跟global的a都同在全域中，因此這次會拋出SyntaxError的錯誤。

### TDZ

```javascript
// TDZ
console.log(typeof a);  // ReferenceError: can't access lexical declaration `a' before initialization

console.log(a); // ReferenceError: can't access lexical declaration `a' before initialization
// TDZ
const a = 'global';
```

在TDZ中為了跟未宣告變數作區別，所以在TDZ中使用typeof也會拋出ReferenceError。

## const的特性

### 不可重複賦值

const所宣告的變數本身有不可重複賦值的特性:

```javascript
const a = "global";
a = "reassign"; // TypeError: invalid assignment to const `a'

if(true){
  a = 'reassign'; // TypeError: invalid assignment to const `a'
}
```

* 第一次的reassign因在同一個區塊中所以因為const不可重複賦值的特性而拋出TypeError。
* 在if區塊中的第二次reassign雖然區塊不同，但因為if區塊內並沒有宣告a，所以會像上一層區塊找尋，找到的就是const的a變數，因此還是拋出TypeError。

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

這個例子以Array及Object為例，我們可以看到arr用push增加元素或是obj改變name都不會拋出例外，但是對於const物件本身做修改的話就會出錯。

## 迴圈中的const

現在我們知道const是一個不可以重新賦值的變數，那它可以用在迴圈中嗎? 我們看看下面的例子:

```javascript
for (const i = 0; i < 10; i++) {
  console.log(i); // 0
} // TypeError: invalid assignment to const `i'
```

看這個例子會發現，在第一次巡覽時(i=0)是正確的，會輸出0，但是在第二次巡覽時因為i++試圖改變const變數，所以拋出了例外。

上面的例子我們知道const不能用在for中，那for of呢?

```javascript
var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
for (const i of arr) {
  console.log(i); // 0 1 2 3 4 5 6 7 8 9
}
```

因為for of會在每次巡覽中重新宣告一個新的const i變數，因此每次的巡覽都是不同的變數，也沒有像i++這樣改動const變數，所以只要在for區塊內沒有動到i變數就會是合法的操作。

## 比較表

綜合之前的文章