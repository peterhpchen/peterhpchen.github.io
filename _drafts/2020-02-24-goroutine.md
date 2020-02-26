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

## Goroutine 介紹

可以想成建立了一個 Goroutine 就是建立了一個新的 Thread。

```go
go f(x, y, z)
```

* 以 `go` 開頭的函式叫用可以使 `f` 跑在另一個 Goroutine 上
* `f`, `x`, `y`, `z` 取自目前的 goroutine
* `main` 函式也是跑在 Goroutine 上
* Main Goroutine 執行結束後, 其他的 Goroutine 會跟著強制關閉

## 等待

多執行緒下，經常需要處理的是執行緒之間的狀態管理，其中一個經常發生的事情是**等待**，例如A執行緒需要等B執行緒計算並取得資料後才能繼續往下執行，在這情況下**等待**就變得十分重要。

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

接下來會介紹三種等待的方式，並且分析其利弊：

* `time.Sleep`: 休眠指定時間
* `sync.WaitGroup`: 等待直到指定數量的 `Done()` 叫用
* Channel 阻塞: 使用 Channel 阻塞機制，使用接收時等待的特性避免執行緒繼續執行

#### time.Sleep

使 Goroutine 休眠，讓其他的 Goroutine 有執行的機會。

```go
func main() {
    go say("world")
    go say("hello")

    time.Sleep(5 * time.Second)
}
```

缺點：

* 休息指定時間可能會比 Goroutine 需要執行的時間長或短，**太長會耗費多餘的時間，太短會使其他 Goroutine 無法完成**

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

優點

* 避免時間預估的錯誤

缺點

* 需要手動配置對應的 Counter

#### Channel

最後介紹的是使用 Channel 等待, 原為 Goroutine 溝通時使用的，但因其阻塞的特性，使其可以當作等待 Goroutine 的方法。

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

優點

* 避免時間預估的錯誤
* 語法簡潔

Channel 阻塞的方法為 Go 語言中等待方式的主流。

## Channel 介紹

Channel 可以想成一條管線，這條管線可以推入數值，並且也可以將數值拉取出來。

因為 Channel 會等待至另一端完成推入/拉出的動作後才會繼續往下處理，這樣的特性使其可以在 Goroutines 間同步的處理資料，而不用使用明確的 lock, unlock 等方法。

建立 Channel

```go
ch := make(chan int) // 建立 int 型別的 Channel
```

推入/拉出 Channel 內的值，使用 `<-` 箭頭運算子：

* Channel 在 `<-` 左邊：將箭頭右邊的數值推入 Channel 中

```go
ch <- v    // Send v to channel ch.
v := <-ch  // Receive from ch, and assign value to v.
```

### Channel 的阻塞

Goroutine 使用 Channel 時有兩種情況會造成阻塞：

* 將資料推入 Channel，但其他 Goroutine 還未拉取資料時，將資料推入的 Goroutine 會被迫等待其他 Goroutine 拉取資料才能往下執行
* 當 Channel 中沒有資料，但要從中拉取時，想要拉取資料的 Goroutine 會被迫等待其他 Goroutine 推入資料並自己完成拉取後才能往下執行

#### Goroutine 推資料入 Channel 時的等待情境

```go
func main() {
    ch := make(chan string)

    go func() { // calculate goroutine
        fmt.Println("calculate goroutine starts calculating")
        time.Sleep(time.Second) // Heavy calculation
        fmt.Println("calculate goroutine ends calculating")

        ch <- "FINISH" // goroutine 執行會在此被迫等待

        fmt.Println("calculate goroutine finished")
    }()

    time.Sleep(2 * time.Second) // 使 main 比 goroutine 慢
    fmt.Println(<-ch)
    time.Sleep(time.Second)
    fmt.Println("main goroutine finished")
}
```

```bash
calculate goroutine starts calculating
calculate goroutine ends calculating
FINISH
calculate goroutine finished
main goroutine finished
```

此例使用 `time.Sleep` 強迫 main 執行慢於 calculate，現在來觀察輸出的結果：

* calculate 會先執行並且計算完成
* calculate 將 `FINISH` 訊號發送給 Channel
* 但由於目前 main 還未拉取 Channel 中的資料，所以 calculate 會被迫等待，因此 calculate 的最後一行 `fmt.println` 沒有馬上輸出在畫面上
* main 拉取了 Channel 中的資料
* calculate 執行完成 / main 執行完成(哪個先不一定)

#### Goroutine 拉資料出 Channel 時的等待情境

```go
func main() {
    ch := make(chan string)

    go func() {
        fmt.Println("calculate goroutine starts calculating")
        time.Sleep(time.Second) // Heavy calculation
        fmt.Println("calculate goroutine ends calculating")

        ch <- "FINISH"

        fmt.Println("calculate goroutine finished")
    }()

    fmt.Println("main goroutine is waiting for channel to receive value")
    fmt.Println(<-ch) // goroutine 執行會在此被迫等待
    fmt.Println("main goroutine finished")
}
```

```bash
main goroutine is waiting for channel to receive value
calculate goroutine starts calculating
calculate goroutine ends calculating
calculate goroutine finished
FINISH
main goroutine finished
```

* main 因拉取的時候 calculate 還沒將資料推入 Channel 中，因此 main 會被迫等待，因此 main 的最後一行 `fmt.println` 沒有馬上輸出在畫面上
* calculate 執行並且計算完成
* calculate 將 `FINISH` 訊號發送給 Channel
* calculate 執行完成 / main 拉取了 Channel 中的資料並且執行完成(哪個先不一定)

## 參考資料

* [A tour of Go - Goroutines](https://tour.golang.org/concurrency)
* [Trevor Forrey - Learning Go’s Concurrency Through Illustrations](https://medium.com/@trevor4e/learning-gos-concurrency-through-illustrations-8c4aff603b3)