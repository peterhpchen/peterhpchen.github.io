上次已經開發了一個最基本的Grafana datasource plugin，也可以寫測試程式了，這次要為這個插件增加設置頁面的view及controller，本文會使用TDD的方式做開發，所以會以測試跟程式交互的方式來進行。

## Config頁面

Config頁面是用來設置datasource級別下的設定，例如說這個datasource的連線、驗證，或是這個datasource下的全域設定，它會在Configuration的Datasource裡做配置。

![DatasourceConfig](/assets/2018-08-10-grafana-datasource-plugin-configctrl/DatasourceConfig.png)

這裡會顯示你設定過的Datasource，點擊欲設定的Datasource就會進入Config頁面，或是想要增加新的Datasource可以按Add data source按鈕同樣也會進入Config頁面。

![GoConfig](/assets/2018-08-10-grafana-datasource-plugin-configctrl/GoConfig.png)

下面藍色框中的就是在ConfigCtrl中要開發的頁面，可以看到主要是連線、驗證還有全域變數的設定。

![ConfigPage](/assets/2018-08-10-grafana-datasource-plugin-configctrl/ConfigPage.png)

## 建立客製的Datasource設定頁面

接著要撰寫ConfigCtrl的HTML，在這之前有兩個東西要先介紹，Grafana提供的styles及components。

### 內建的components

有些設定是大部分的datasource都需要的，像是連線設定，Grafana就會將它包成components，方便不同的插件可以重複利用，我們也可以在自己的插件上使用這些components做開發。

#### datasource-http-settings

這個datasource-http-settings裡面有包好連線時常用的設定，它的定義在[ds_edit_ctrl.ts](https://github.com/grafana/grafana/blob/master/public/app/features/plugins/ds_edit_ctrl.ts)中，有提供三個參數:

* current: 設定資料的model。
* suggestUrl: 建議的連線URL。
* noDirectAccess: 不開啟Access的選項，一律使用Proxy連線。

### 內建的styles

Grafana有提供styles給客製的Plugin使用，使用內建的styles不僅可以使得外觀像是原生的功能一樣，也可以在視窗做放大縮小時做對應的配置，十分的方便。