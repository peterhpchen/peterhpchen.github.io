---
layout: post
title: "使用 Command Line 建立 mdb 的 odbc data source"
date: 2018-11-28 12:00:00 +0800
tags: [odbc, mdb]
---

> 一般設定 odbc 會使用 odbc 資料來源管理員，本文將使用 Command Line 的方式新增 .mdb 的資料來源。

## 指令

```bash
%WINDIR%\SysWOW64\odbcconf /A {CONFIGSYSDSN "Microsoft Access Driver (*.mdb)" "DSN=test|DBQ=C:\test.mdb|Description=testmdb"}
```

* `%WINDIR%\SysWOW64\odbcconf` : 使用 32 位元的 odbc ，要使用 64 位元的直接下 `odbcconf` 即可。
* `CONFIGSYSDSN` : 新增的對象是系統的資料來源。
* `Microsoft Access Driver (*.mdb)` : 使用的 driver 名稱。
* `DSN=test` : 資料來源的名稱。
* `DBQ=C:\test.mdb` : mdb 檔案路徑。
* `Description=testmdb` : 資料來源描述。

## 參考資料

* [ODBCCONF.EXE|Microsoft Docs](https://docs.microsoft.com/en-us/sql/odbc/odbcconf-exe)
* [Easysoft Data Access](https://www.easysoft.com/support/kb/kb01084.html)
* [stackoverflow: How to create User DSN for *.accdb from commandline in Windows?](https://stackoverflow.com/questions/12744071/how-to-create-user-dsn-for-accdb-from-commandline-in-windows)