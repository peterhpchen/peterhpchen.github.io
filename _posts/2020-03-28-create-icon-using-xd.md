---
layout: post
title: "使用 Adobe XD 建立 Icon"
tags: [icon, svg, adobe-xd]
---

現在網路上可以找到許多免費 Icon ，對於大部分的網頁開發已經很足夠了，但真的需要自己設計 Icon 時該怎麼辦呢？這篇來分享一下一個工程師要如何用 Adobe XD (免費)建立一個屬於自己的 Icon 。

> 這篇是從美學概念很差的工程師(小弟我)出發的，所做的只是簡易的 favicon 用在部落格上，因此使用到的都是基本簡單的技巧而已，設計師大大們可以忽略這篇。

## 安裝 Adobe XD

做一個簡單的圖標使用免費的 Adobe XD 就很夠用了，首先到[官網](https://www.adobe.com/tw/products/xd.html)下載。

![download](/assets/2020-03-28-create-icon-using-xd/download.png)

照著步驟就可以完成安裝了。

## 建立專案

我們只是要建立圖示，使用 **Custom Size** ，調整為 **512*512** 的大小，並按下圖示建立專案。

![new](/assets/2020-03-28-create-icon-using-xd/new.png)

## 設定畫布

建立完成後會看到一個白色的區塊，在 XD 中叫做 artboard ，將名稱改為 `Icon` ，並將右下角的格線開出來，這樣一來作業環境就完成了～

![artboard](/assets/2020-03-28-create-icon-using-xd/artboard.png)

## 工具欄

工具欄上有多種工具可供使用，由上而下依序是：

* Select: 選取元素
* Rectangle: 四邊形元素
* Ellipse: 圓形元素
* Polygon: 有角形元素
* Line: 直線元素
* Pen: 畫筆元素
* Text: 文字元素
* Artboard: 新增畫布
* Zoom: 放大

![tools](/assets/2020-03-28-create-icon-using-xd/tools.png)

元素的部分下一節會提到，先來介紹功能性的工具：Select, Artboard 及 Zoom。

### Select 工具

Select 工具(快捷鍵為 `v`)，可以選取元素並做修改。

選取後，右方會出現細節的調整工具，這時就可以針對元素作細節的調整。

![select](/assets/2020-03-28-create-icon-using-xd/select.png)

也可以直接拖拉元素上**各邊的點**做大小的調整。

![select-size](/assets/2020-03-28-create-icon-using-xd/select-size.png)

再往**點稍遠**的地方移動鼠標，可以轉動元素。

> 按住 `Shift` 做拉移的動作可以保持等比例。

對元素**連點兩下**，可以開啟自訂模式，以圓形為例：

![custom](/assets/2020-03-28-create-icon-using-xd/custom.png)

就可以自由地改變圖形，中間是決定**邊的位置**，左右兩個點是**調整弧度**。

> Rectangle, Ellispe, Polygon, Line, Pen 都可以使用此功能任意的改變圖形樣貌。

### Artboard

此工具為增加一個畫布，當你有不只一個 Icon 想要在同個專案下設計的話可以按此工具增加一塊畫布。

![artboard-create](/assets/2020-03-28-create-icon-using-xd/artboard-create.png)

可以自己拖拉一個自訂大小的畫布(左上)，也可以在空白處點一下產生與原本相同的畫布(右下)。

### Zoom

局部放大，通常都用滾輪達成此功能。

## 使用元素

元素的種類有 Rectangle, Ellipse, Polygon, Line, Pen, Text，接下來會介紹各別的特殊功能，一般常用的功能都滿直覺的就不浪費篇幅了。

### Rectangle

Rectangle 畫出四邊形元素，按著 `Shift` 拉的話可以畫出正方形。

![rectangle](/assets/2020-03-28-create-icon-using-xd/rectangle.png)

拉動內部四個虛點可以改變角的弧度：

![rectangle-angle](/assets/2020-03-28-create-icon-using-xd/rectangle-angle.png)

按住 `option` 拖拉虛點可以只拉單角：

![rectangle-single](/assets/2020-03-28-create-icon-using-xd/rectangle-single.png)

如果想要直接指定各角度的話可以在設定欄的下方個別調整：

![rectangle-detail](/assets/2020-03-28-create-icon-using-xd/rectangle-detail.png)

### Ellipse

Ellipse 畫出圓形，按著 `Shift` 拉的話可以畫出正圓形。

![ellipse](/assets/2020-03-28-create-icon-using-xd/ellipse.png)

### Polygon

畫出多邊形，一開始拉出來的會是三角形，按著 `Shift` 拉的話可以畫出正三角形。

![triangle](/assets/2020-03-28-create-icon-using-xd/triangle.png)

拉動內部的**虛點**可以改變角的弧度：

![triangle-angle](/assets/2020-03-28-create-icon-using-xd/triangle-angle.png)

拉動邊上的**實點**，可以產生對應角數量的星形。

![triangle-star](/assets/2020-03-28-create-icon-using-xd/triangle-star.png)

設定欄上可以調整角的數量也可以做角度及星形內縮率的調整：

![triangle-detail](/assets/2020-03-28-create-icon-using-xd/triangle-detail.png)

### Line

Line 畫出直線，按著 `Shift` 拉的話可以畫出水平, 垂直及 45 度角的直線。

![line](/assets/2020-03-28-create-icon-using-xd/line.png)

### Pen

Pen 可以畫出隨意的線條，點一下為線的起始，直到按下 `esc` 結束或連回起始點形成圖形。

![pen](/assets/2020-03-28-create-icon-using-xd/pen.png)

在畫線時，單指拉移決定線段，三指拉移會拉出弧線：

![arc](/assets/2020-03-28-create-icon-using-xd/arc.png)

Line 及 Pen 在**自訂模式**下都可以改變任一地方的弧度，因此可以先畫直線，在做細部的弧度調整。

![arc-after](/assets/2020-03-28-create-icon-using-xd/arc-after.png)

### Text

Text 可以插入字串，對字串點兩下可以在設定欄中設定字體及配置。

![text](/assets/2020-03-28-create-icon-using-xd/text.png)

### 通用功能

元素中有些共通的設定，例如顏色或是陰影的調整，會在這裡介紹一下。

#### Color

顏色的調整可以直接使用調色盤，或是在畫面上看到適合的顏色可以直接使用右方的選擇器取用顏色。

![color](/assets/2020-03-28-create-icon-using-xd/color.png)

#### Shadow

可以在設定欄上設定陰影：

![shadow](/assets/2020-03-28-create-icon-using-xd/shadow.png)

## 儲存常用的顏色, 字型, 元件

接著我們可以放些常用顏色, 字型, 元件到 ASSETS 中，使我們在使用的時候可以不用在重新調整這些設定。

使用的方法如下:

* 點擊目標元件
* 在右方 ASSETS 中選擇想加的項目
* 按右方的加號

![asset](/assets/2020-03-28-create-icon-using-xd/asset.png)

已經加過或是不適配的(例如字型只會在 Text 選中時才能加入)，加號會是暗掉的狀態。

另外使用同個 asset 產生的元件，**只要一個做修改，其他的都會跟著修改**。

## 產生更多的圖形

XD 他已經提供了基本的圖形：四邊形，圓形及三角形，足夠應付大部分的場境，但還是有一些圖形會需要自己做，下面介紹幾個較常用的圖形。

### 扇形

將正方形的其中一角弧度拉到最大：

![sector](/assets/2020-03-28-create-icon-using-xd/sector.png)

### 半圓形

將一個圓形及一個四邊形成別，使用交集功能，就可以產生半圓形：

![half](/assets/2020-03-28-create-icon-using-xd/half.png)

## 輸出

上面講要如何使用各類的工具，現在花費了千辛萬苦終於完成了，剩下最後的輸出過程，只要按下 `Export` 就大功告成了！

![export](/assets/2020-03-28-create-icon-using-xd/export.png)

可以選擇目標的格式：

![type](/assets/2020-03-28-create-icon-using-xd/type.png)

## 結論

最近在設計部落格的 Icon ，花了一些時間研究 XD 的用法，目前只有設計 Icon 的時候使用到 XD ，但 XD 的主要功能其實是設計 UX 的，如果之後有機會用到的話，再來分享這部分。

## 參考資料

[Smashing Magazine: How To Create Icons In Adobe XD](https://www.smashingmagazine.com/2016/07/how-to-create-icons-adobe-xd/#icon-nr-1-clipboard)