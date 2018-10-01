---
layout: post
title:  "安裝 Oracle ODBC Client"
date:   2018-10-01 12:30 +0800
categories: oracle, odbc
---

> 本文紀錄在 Windows 10 上安裝 Oracle ODBC Client (32-bit) 的流程。

## 下載 Instant Client

* 到官網下載 [Oracle Instant Client Basic 及 ODBC](https://www.oracle.com/technetwork/topics/winsoft-085727.html) 。
* 解壓 **Basic** 至任一路徑，本文以 `C:\` 為範例，解壓後會有一個 `instantclient_12_2` 在目標路徑下，後面的版號因下載的版本而異。
* 解壓 **ODBC** 後，將解壓出來的資料夾(跟 `Basic` 解壓出來的資料夾名稱相同為 `instantclient_12_2`) 內的檔案都貼到 `C:\instantclient_12_2` 下。
* 以系統管理員執行 `odbc_install.exe` 。
* `odbc_install.exe` 執行前會檢查目前目錄下是否有 `oci.dll`, `oraociei11.dll`, `orannzsbb11.dll` ，所以請確定 `Basic` 及 `ODBC` 的解壓檔案都在相同目錄下才可以安裝成功。

## 設定 `tnsnames.ora`

接著要設定 `tnsnames.ora` 檔，這個檔是放連線方式的配置，可以參考[這個](http://www.orafaq.com/wiki/Tnsnames.ora)來配置。

下面是範例:

```
<addressname> =
  (DESCRIPTION =
    (ADDRESS = (PROTOCOL = TCP)(HOST = <hostname>)(PORT = <port>))
    (CONNECT_DATA =
      (SERVER = DEDICATED)
      (SERVICE_NAME = <service_name>)
    )
  )
```

* `<addressname>`: 在 **ODBC 資料來源管理員** 設定中的 **TNS Service Name** 。
* `<hostname>`: DB 的 IP 。
* `<port>`: DB 的 Port 。
* `<service_name>`: 服務名稱。

撰寫好後將其放置於 `C:\instantclient_12_2\network\admin` 下。

## 設置環境變數

* 設置 `PATH` 環境變數，增加 `C:\instantclient_12_2` ，即為 Instant Client 路徑，這樣 ODBC 資料來源管理員才抓的到 driver。
* 設置 `TNS_ADMIN` 環境變數為 `C:\instantclient_12_2\network\admin` ，讓 Oracle 取得 `tnsnames.ora` 檔案。
* 如果沒設置 `TNS_ADMIN` 的話， Oracle 會搜尋 `%ORACLE_HOME%/network/admin/tnsnames.ora` ，所以也可以設置 `ORACLE_HOME` 環境變數為 `C:\instantclient_12_2` 來取得 `tnsnames.ora` 檔案，這個方法就一定要將 `tnsnames.ora` 放於 `%ORACLE_HOME%/network/admin/` 下。

## 設置 ODBC 資料來源管理員

最後要設置 **ODBC 資料來源**，按下新增後可以看到 `Oracle in instantclient_12_2` ，後面的名字會依安裝版本而異。

![select](/assets/2018-10-01-install-oracle-odbc-client/select.PNG)

如果上述的設置成功可以看到 **TNS Service Name** 的選項中可以選擇在 `tnsnames.ora` 檔中設置的 `<addressname>` 。

![select](/assets/2018-10-01-install-oracle-odbc-client/settings.PNG)

## 參考資料

* [Oracle Instant Client ODBC Installation Notes](https://www.oracle.com/technetwork/database/features/oci/odbc-ic-releasenotes-094306.html)
* [Instant Client Downloads for Microsoft Windows 32-bit](https://www.oracle.com/technetwork/topics/winsoft-085727.html)
* [Tnsnames.ora](http://www.orafaq.com/wiki/Tnsnames.ora)