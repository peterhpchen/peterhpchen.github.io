---
layout: post
title: "Goroutine 與 Channel"
tags: [golang]
---

Goroutine 是 Go 語言的 thread, 它使 Go 建立多工處理簡單化, 搭配 Channel 使 Goroutine 間的溝通無虞, 本文記錄學習 Goroutine 及 Channel 的軌跡。

## 單執行緒

在單執行緒下，每行程式碼都會依照順序執行。

```go
func say(s string) {
    for i := 0; i < 5; i++ {
        time.Sleep(100 * time.Millisecond)
        fmt.Println(s)
    }
}

func main() {
    say("world")
    say("hello")
}
```

```bash
world
world
world
world
world
hello
hello
hello
hello
hello
```

上例會先執行完 `say("world")` 後再執行 `say("hello")`。

## 多執行緒

在多執行緒下，最多可以同時執行與 CPU 數相等的 Goroutine。

```go
func main() {
    go say("world")
    say("hello")
}
```

```bash
world
hello
hello
world
world
hello
hello
world
world
hello
```

如此一來, `say("world")`會跑在另一個執行緒(Goroutine)上，使其並行執行。

> CPU 數可以使用 `runtime.NumCPU()` 取得。

## Goroutine 語法

```go
go f(x, y, z)
```

* 以 `go` 開頭的函式叫用可以使 `f` 跑在另一個 Goroutine 上
* `f`, `x`, `y`, `z` 取自目前的 goroutine
* `main` 函式也是跑在 Goroutine 上
* Main Goroutine 執行結束後, 其他的 Goroutine 會跟著強制關閉

## 等待

再多執行緒下，其中一個經常發生的事情是**等待**，等待有時是好的有時是應該被避免的。

### 應該等待的時機

```go
func main() {
    go say("world")
    go say("hello")
}
```

這個狀態下會有三個 Goroutine:

* `main`
* `say("world")`
* `say("hello")`

這裡的問題發生在 `main` Goroutine 結束時，另外兩個 `say` Goroutine 會被強制關閉導致結果錯誤，這時就需要等待其他的 Goroutine 結束後 `main` Goroutine 才能結束。

#### time.Sleep

使 Goroutine 休眠，讓其他的 Goroutine 有執行的機會。

```go
func main() {
    go say("world")
    go say("hello")

    time.Sleep(5 * time.Second)
}
```

休息指定時間可能會比 Goroutine 需要執行的時間長或短，**太長會耗費多餘的時間，太短會使其他 Goroutine 無法完成**。

#### sync.WaitGroup

```go
func say(s string, wg *sync.WaitGroup) {
    defer wg.Done()

    for i := 0; i < 5; i++ {
        time.Sleep(100 * time.Millisecond)
        fmt.Println(s)
    }
}

func main() {
    wg := new(sync.WaitGroup)
    wg.Add(2)

    go say("world", wg)
    go say("hello", wg)

    wg.Wait()
}
```

* 產生與想要等待的 Goroutine 同樣多的 `WaitGroup` counter
* 將 `WaitGroup` 傳入 Goroutine 中，在執行完成後叫用 `wg.Done()` 將 counter 減一
* `wg.Wait()` 會等待直到 counter 減為零為止

#### Channel

最後介紹的是 Channel 原為 Goroutine 溝通時使用的，但因其阻塞的特性，使其可以當作等待 Goroutine 的方法。

```go
func say(s string, c chan string) {
    for i := 0; i < 5; i++ {
        time.Sleep(100 * time.Millisecond)
        fmt.Println(s)
    }
    c <- "FINISH"
}

func main() {
    ch := make(chan string)

    go say("world", ch)
    go say("hello", ch)

    <-ch
    <-ch
}
```

起了兩個 Goroutine(`say("world", ch)`, `say("hello", ch)`) ，因此需要等待兩個 `FINISH` 推入 Channel 中才能結束 Main Goroutine。

## 參考資料

* [A tour of Go - Goroutines](https://tour.golang.org/concurrency)
* [Trevor Forrey - Learning Go’s Concurrency Through Illustrations](https://medium.com/@trevor4e/learning-gos-concurrency-through-illustrations-8c4aff603b3)