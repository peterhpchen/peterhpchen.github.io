---
layout: post
title:  "在 Visual Studio 中除錯 ASP "
date:   2018-08-23 19:00 +0800
categories: asp
---

> 本文介紹開發 Active Server Pages 時的除錯方法。

在開發時會有兩個不同情境下的除錯:

* 未部署至 IIS 。
* 已部屬至 IIS 。

## 未部署至 IIS

在未部署上 IIS 前，要除錯 ASP 需要在 Visual Studio 中使用 IIS Express 將網站跑起來。

步驟如下:

* 修改 **IIS Express** 的設定

在 **%USERPROFILE%\Documents\IISExpress\config\applicationhost.config** 中的 **\<system.webServer\>** 中找到 **\<asp\>** 的標籤:

```xml
<asp scriptErrorSentToBrowser="true">
    <cache diskTemplateCacheDirectory="%TEMP%\iisexpress\ASP Compiled Templates" />
    <limits />
</asp>
```

改為下面這樣:

```xml
<asp scriptErrorSentToBrowser="true" enableParentPaths="true" bufferingOn="true" errorsToNTLog="true" appAllowDebugging="true" appAllowClientDebug="true">
    <cache diskTemplateCacheDirectory="%TEMP%\iisexpress\ASP Compiled Templates" />
    <session allowSessionState="true" />
    <limits />
</asp>
```

* 建立一個空的**解決方案**( Solution )。

![empty solution](/assets/2018-08-23-debugging-classic-asp/emptysolution.PNG)

* 新增已存在的網站至方案中(使用 **File System** )。

![add existing website from file system](/assets/2018-08-23-debugging-classic-asp/addexistingwebsitefromfilesystem.PNG)

* 不啟用偵錯下啟動網站( `Ctrl+F5` )。
* 在 **Debug** 中的 **Attach to Process** 將 **Attach to** 的選項改為 **Script Code** 。
* 在下方選擇 **iisexpress.exe** ( **ID** 需與啟動的網站相同))。
* 按下 **Attach** 即可開始偵錯。

![attach to process](/assets/2018-08-23-debugging-classic-asp/attachtoprocess.PNG)

* 如果在方案總管看到 **應用程式除錯已停用** ，代表 IIS Express 沒有吃預設的設定檔，是吃方案下的設定檔。

![debug disable](/assets/2018-08-23-debugging-classic-asp/debugdisable.PNG)

* 將 **%Solution%/.vs/config/applicationhost.config** 中同樣的地方做修改。
* 在方案總管中選擇 **Script Documents** 下的檔案，下中斷點。
* 不能使用網站中的檔案下中斷點。

![debug iis express](/assets/2018-08-23-debugging-classic-asp/debugiisexpress.PNG)

## 已部屬至 IIS

對於已部屬至 IIS 的網站必須先到 **IIS 管理員**中將站台中 **ASP** 的設定**啟用伺服器端偵錯**。

### 使用 stop 除錯

* 在想要除錯的程式行前加上 `stop` 。
* 開啟網站。
* 執行到 `stop` 的行數會跳出詢問是否調適 **w3wp** ，按**是**即可開啟 Visual Studio 偵錯。

![open w3wp](/assets/2018-08-23-debugging-classic-asp/openw3wp.PNG)

![debugging by stop](/assets/2018-08-23-debugging-classic-asp/debuggingbystop.PNG)

### 使用 Visual Studio 的中斷點除錯

上面使用 `stop` 的方式有個缺點，因為在程式碼中加了 `stop` ，之後如果忘記拔掉就部屬到正式機，會導致錯誤。

因此最保險的方式還是在 Visual Studio 上下中斷點。

下面是設置步驟:

* 建立一個空的**解決方案**( Solution )。
* 新增已存在的網站至方案中(使用 Local IIS ))。

![add existing web site from iis](/assets/2018-08-23-debugging-classic-asp/addexistingwebsitefromiis.PNG)

* 在 **Debug** 中的 **Attach to Process** 將 **Attach to** 的選項改為 **Script Code** 。
* 在下方選擇 **w3wp.exe** ( **User Name** 是此網站))。
* 按下 **Attach** 即可開始偵錯。

![w3wp](/assets/2018-08-23-debugging-classic-asp/w3wp.PNG)

## 參考資料

* [Dixin's Blog: Debugging Classic ASP with Modern Visual Studio](https://weblogs.asp.net/dixin/debugging-classic-asp-with-visual-studio)