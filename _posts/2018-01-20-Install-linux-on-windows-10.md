---
layout: post
title: "在Windows10中使用Bash"
date: 2018-01-20 01:00:00 +0800
tags: [windows, linux, bash]
---

> 在Windows10的Anniversary Update後，Windows Subsystem for Linux(WSL)釋出，震驚了我這個身在Windows心在Linux的開發者，雖然一直想要嘗試一下到底在Windows上吃Bash是什麼樣的滋味，但是一直沒有機會跟時間，但在前不久的Fall Creators Update，我們已經可以在Windows Store中直接安裝ubuntu等Linux環境，看起來已經成熟許多了，我們就來安裝這個神奇的WSL吧。

## 環境

### 條件

本篇的安裝方式特定條件的作業系統環境才能實踐:

* Windows 10
* 64-bit
* build 16215 or later

### 檢查

確認作業系統是否符合條件:

1. 開啟**設定**
1. 點擊**系統**
1. 點擊**關於**

![build number](/assets/2018-01-20-Install-linux-on-windows-10/build-number.png)

## 步驟

### 開啟WSL功能

WSL在Windows 10中是選擇性的功能，預設是關閉的，要使用的話要將此選項開啟。

1. 以**系統管理員**打開**PowerShell**，輸入指令:

```shell
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```

2. 執行完成後，請**重新啟動電腦**。

### 安裝Linux

在**Microsoft Store**中下載**Linux**系統，本篇以**ubuntu**做演示，各位也可以安裝其他的Linux版本。

![download-ubuntu](/assets/2018-01-20-Install-linux-on-windows-10/download-ubuntu.PNG)

### 第一次啟用設定

1. 開啟**ubuntu**應用。
2. 設定**帳號**及**密碼**。
3. 確認**Linux**版本。

```bash
lsb_release -a
```

![hello linux](/assets/2018-01-20-Install-linux-on-windows-10/hello-linux.PNG)

## 結語

照上面的步驟安裝我們就可以有一個WSL了，整個流程很順暢，我在兩台電腦上安裝都沒有遇到問題，看起來穩定性也已經到達一個水準，現在就來嘗試在WSL上寫點東西吧。

## 參考

* [Editing code and files on Windows Subsystem for Linux on Windows 10](https://youtu.be/XfRo63afjtM)
* [【WSL】Windows Subsystem for Linux 安裝及基本配置！](https://blogs.msdn.microsoft.com/microsoft_student_partners_in_taiwan/2017/10/03/wsltune/)
* [Windows 10 Installation Guide](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
* [Windows Subsystem for Linux 環境配置 (最新 1709 版)](https://medium.com/hungys-blog/windows-subsystem-for-linux-configuration-caf2f47d0dfb)