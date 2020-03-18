---
layout: post
title: "JS 中的陣列 trim 方法"
tags: [JavaScript, ES2015]
---

JavaScript 中有[字串的 `trim` 方法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)，但卻沒有陣列的 `trim` ，現在就來嘗試實作一個陣列的 `trim` 吧。

> 本文的範例不考慮型別錯誤等問題，聚焦於方法本身的說明。

## 字串的 trim

在實作前，我們先來了解一下 `trim` 這個方法的功用，在字串的 `trim` 中，會將前後的空白字元，包括行的結束字符從字串中去除，例如下面這字串：

```js
` hello
world 
`
```

![string](/assets/2020-03-20-array-trim-js/string.png)

* 開頭有個空白字元
* 中間有空白及換行字元
* 結尾有換行字元

使用了 `trim` 回傳的結果為：

![string-trim](/assets/2020-03-20-array-trim-js/string-trim.png)

* 只剩下中間的空白及換行字元

大部分的情況下，由於字串前後的空白及換行字元多半是沒有意義且容易造成 bug 產生，例如比對字串是否相等時：

```js
'hi' === 'hi ' // false
```

這時候 `trim` 就很有用處：

```js
'hi'.trim() === 'hi '.trim() // true
```

除了前後都作用的 `trim` 之外，也有只作用一邊的方法：

```js
' ya '.trimStart() // 'ya '
' ya '.trimEnd() // ' ya'
```

### 特定字元的 trim

前面內建的 `trim` 很好用，但如果想要刪去的是除了空白和換行字元以外的其他字元呢？例如：底線(`_`)或是小老鼠(`@`)。

這是就需要自製的方法來達成，首先設計介面：

```js
function trimChar(string, chars) {...}
```

* `string`: `String` 型別，原字串
* `chars`: `String` 型別，要刪除的字元
* 回傳值是 `trim` 作用過的字串

> 也可以直接寫在 `String` 的 `prototype` 上: `String.prototype.trimChar = function(chars) {...}`。

接下來實作方法：

```js
function trimChar(string, chars) {  
  const strArr = string.split('');

  // 找到第一個不排除的字元索引
  const start = strArr.findIndex(ch => !chars.includes(ch));
  if(start === -1) return '';

  // 找到最後一個不排除的字元索引
  let reverseStart = strArr.slice().reverse().findIndex(ch => !chars.includes(ch));
  const end = string.length - reverseStart;

  // 去頭去尾
  return strArr.slice(start, end).join('');
}
```

```js
trimChar('!hello!@world@', '!@'); // "hello!@world"
```

* 因為要仰賴陣列處理，先將字串分割為字元陣列
* 使用 `findIndex` 找到第一個不排除的字元索引
* 如果找不到的話，代表整個字串都是想要排除的字元組成，因此回傳空字串
* 將原字串反轉找出第一個不排除的字元，此為最後一個不排除的字元的索引
* 由於取得的索引是反轉後的，所以需要利用字串長度反轉回正確的索引
* 用 `slice` 刪除前後想要排除的字元，並合併後回傳

這樣 `trim` 特定字元的方法就建置完成了。

### 只 trim 開頭/結尾特定字元

上面的是前後都 `trim` 的方法，想想如果只 `trim` 開頭或結尾其一的方法怎麼寫呢？

```js
function trimCharStart(string, chars) {  
  const strArr = string.split('');

  // 找到第一個不排除的字元索引
  const start = strArr.findIndex(ch => !chars.includes(ch));
  if(start === -1) return '';

  // 直接取長度當作結尾索引
  const end = string.length;

  // 去頭去尾
  return strArr.slice(start, end).join('');
}

function trimCharEnd(string, chars) {  
  const strArr = string.split('');

  // 直接取 0 為開頭索引
  const start = 0;

  // 找到最後一個不排除的字元索引
  let reverseStart = strArr.slice().reverse().findIndex(ch => !chars.includes(ch));
  const end = string.length - reverseStart;

  // 去頭去尾
  return strArr.slice(start, end).join('');
}
```

```js
trimCharStart('!hello!@world@', '!@'); // "hello!@world@"
trimCharEnd('!hello!@world@', '!@'); // "!hello!@world"
```

只要將開頭/結尾的索引設回原本的值就可以了。

## 陣列中的 trim

看了字串的 `trim` 實作後，對於陣列的 `trim` 有沒有一點概念了呢？接著就來想一下改怎麼處理陣列的部分吧。

## 陣列 trim 的定義

首先先來定義陣列 `trim` 介面：

```js
function arrayTrim(array, exclude) {...}
```

* `array`: `any[]` 型別，原陣列
* `exclude`: `element => boolean` 型別，要排除的元素傳回 `true` 的回呼函數
* 回傳值是 `trim` 作用過的陣列

> 同字串 `trim` 也可以寫在 `Array.prototype` 上。

可以先試著用上面字串的思維想想要怎麼實作 `arrayTrim` 。

## 實作 arrayTrim

```js
function arrayTrim(array, exclude) {
  // 找到第一個不排除的字元索引
  const start = array.findIndex(ch => !exclude(ch));
  if(start === -1) return '';

  // 找到最後一個不排除的字元索引
  let reverseStart = array.slice().reverse().findIndex(ch => !exclude(ch));
  const end = array.length - reverseStart;

  // 去頭去尾
  return array.slice(start, end);
}
```

可以發現跟字串的方法大同小異，這是因為在上面講解字串 `trim` 時刻意使用陣列的思路來說明，要不然字串可以使用正規表達式寫出更簡潔的方法，詳細可以參考 [StackOverflow 上的解答](https://stackoverflow.com/a/32516190/3493127)。

```js
// ex1
arrayTrim(['!', 'hello', '!', '@', 'world', '@'], element => ['!', '@'].includes(element));
// ["hello", "!", "@", "world"]

// ex2
arrayTrim([[0, '@'], [1, 'hello'], [2, '!'], [3, '@'], [4, 'world'], [5, '@']], element => ['!', '@'].includes(element[1]));
// [[1, 'hello'], [2, '!'], [3, '@'], [4, 'world']]
```

陣列的第二個參數會需要是回呼函數，因為陣列中可能會是複雜結構，像是第二個例子一樣。

> 只 `trim` 陣列的開頭/結尾的方法就交給各位想想嘍～

## 結論

會需要這個方法是由於最近處理到時間流的資料，他的資料會像下面這樣：

```js
const datapoints = [
  [622,1450754160000],
  [587,1450754220000],
  [622,1450754280000],
  [123,1450754340000],
  [622,1450754400000],
  [851,1450754460000]
];
```

待在某個時間點的資料有可能是 `null` ：

```js

const datapoints = [
  [null,1450754160000],
  [587,1450754220000],
  [null,1450754280000],
  [123,1450754340000],
  [622,1450754400000],
  [null,1450754460000]
];
```

繪圖時前後的資訊是不需要的，因為那個時間點本來就**還**沒有資料或是**已經**沒有資料了，但中間的資料如果是 `null` 的話就需要將圖上的那個時間畫為 0 值，否則前後的資料會相連使人誤以為這是連續的數值。

## 參考資料

* [MDN: String.prototype.trim()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)
* [MDN: Array.prototype.findIndex()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
* [Sonya Moisset: Reverse a String in JavaScript](https://medium.com/sonyamoisset/reverse-a-string-in-javascript-a18027b8e91c#:~:text=The%20split()%20method%20splits,an%20array%20into%20a%20string.)
* [stackoverflow: Trim specific character from a string](https://stackoverflow.com/questions/26156292/trim-specific-character-from-a-string)
* [Lodash: trim](https://lodash.com/docs/4.17.15#trim)