上次已經開發了一個最基本的Grafana datasource plugin了，這次要為這個插件增加設置頁面的view及controller。

## Config頁面

Config頁面是用來設置datasource級別下的設定，例如說這個datasource的連線、驗證，或是這個datasource下的全域設定，它會在Configuration的Datasource裡做配置。

![DatasourceConfig](/assets/2018-08-10-grafana-datasource-plugin-configctrl/DatasourceConfig.png)

這裡會顯示你設定過的Datasource，點擊欲設定的Datasource就會進入Config頁面，或是想要增加新的Datasource可以按Add data source按鈕同樣也會進入Config頁面。

![GoConfig](/assets/2018-08-10-grafana-datasource-plugin-configctrl/GoConfig.png)

下面藍色框中的就是在ConfigCtrl中要開發的頁面，可以看到主要是連線、驗證還有全域變數的設定。

![ConfigPage](/assets/2018-08-10-grafana-datasource-plugin-configctrl/ConfigPage.png)

## 建立config.html

