---
layout: post
title: "在C#中取得執行時間"
tags: [csharp, dotnet]
---

為了找出系統中的效能問題，各個函數的執行時間是一個參考的依據，本文紀錄如何在 C# 中知道區段的執行時間。

## Stopwatch class

Stopwatch class 是專門用來測量區間內所耗用的時間，它在 `System.Diagnostics` namespace 中。

```csharp
...
using System.Diagnostics;
...
class Program
{
    static void Main(string[] args)
    {
      Stopwatch stopWatch = new Stopwatch();
      // System.Diagnostics.Stopwatch stopWatch = new System.Diagnostics.Stopwatch();
    }
}
```

上面的代碼建立了一個 Stopwatch 的實體，記得加上 `using System.Diagnostics;` ，或是在叫用時包含命名空間。

## 啟動與停止計時器

在想要計算的代碼前使用 `Start` 方法啟動，並在之後使用 `Stop` 方法停止計時器。

```csharp
Stopwatch stopWatch = new Stopwatch();
stopWatch.Start();
// Some Code
stopWatch.Stop();
```

Stopwatch 也有提供單一指令初始化及啟動計時器的 `StartNew` 靜態方法，可以較為簡潔。

```csharp
Stopwatch stopWatch = Stopwatch.StartNew();
// Some Code
stopWatch.Stop();
```

## 取得耗用時間

可以使用 `ElapsedMilliseconds` 屬性取得以毫秒為單位的耗用時間。

```csharp
Stopwatch stopWatch = Stopwatch.StartNew();
// Some Code
stopWatch.Stop();
Console.WriteLine(stopWatch.ElapsedMilliseconds);
```

>> `Stopwatch` 還有提供格式為 `TimeSpan` 的 [`Elapsed` 屬性](https://docs.microsoft.com/zh-tw/dotnet/api/system.diagnostics.stopwatch.elapsed?view=netframework-4.8)，以及更精確的計時器刻度的 [`ElapsedTicks` 屬性](https://docs.microsoft.com/zh-tw/dotnet/api/system.diagnostics.stopwatch.elapsedticks?view=netframework-4.8)。

## 重啟計時器

在開始計時器停止後如果叫用 `Start` 方法，計時器並不會被重製，時間會從原本的往上加:

```csharp
System.Diagnostics.Stopwatch stopWatch = new System.Diagnostics.Stopwatch();
stopWatch.Start();
Thread.Sleep(1000);
stopWatch.Stop();
Console.WriteLine(stopWatch.ElapsedMilliseconds);
stopWatch.Start();
Thread.Sleep(1000);
stopWatch.Stop();
Console.WriteLine(stopWatch.ElapsedMilliseconds);
```

```bash
1003
2018
```

重啟計時器可以使用 `Reset` 方法。

```csharp
System.Diagnostics.Stopwatch stopWatch = new System.Diagnostics.Stopwatch();
stopWatch.Start();
Thread.Sleep(1000);
stopWatch.Stop();
Console.WriteLine(stopWatch.ElapsedMilliseconds);
stopWatch.Reset();
stopWatch.Start();
Thread.Sleep(1000);
stopWatch.Stop();
Console.WriteLine(stopWatch.ElapsedMilliseconds);
```

```bash
1007
1015
```

>> 兩段一樣的代碼，執行時間不一定會相同，因此上面這個例子兩區段的時間是不會一樣的。

也可以使用單一指令 `Restart` 方法同時 `Reset` 及 `Start` 計時器:

```csharp
stopWatch.Restart();
Thread.Sleep(1000);
stopWatch.Stop();
Console.WriteLine(stopWatch.ElapsedMilliseconds);
```

## 範例程式碼

[Gist](https://gist.github.com/peterhpchen/f82bb3f00f6738f432958295c9d3a0c1)

<script src="https://gist.github.com/peterhpchen/f82bb3f00f6738f432958295c9d3a0c1.js"></script>

## 參考資料

* [StackOverflow: Calculate the execution time of a method](https://stackoverflow.com/questions/14019510/calculate-the-execution-time-of-a-method/14019526)
* [.NET Documentation: Stopwatch 類別](https://docs.microsoft.com/zh-tw/dotnet/api/system.diagnostics.stopwatch?view=netframework-4.8)
