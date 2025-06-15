# Lilith Swisseph Calculator

本專案是一個基於 Node.js 的星座換算與伺服器應用，並使用 swisseph 進行天文運算。專案內含：
- `index.js`：伺服器啟動與星座換算主程式
- `date.js`：負責日期計算的輔助模組

## 目錄結構
```
.
├── index.js         # 伺服器啟動與星座換算主程式
├── date.js          # 日期計算輔助模組
├── package.json     # 專案依賴與設定
└── README.md        # 專案說明文件
```

## 安裝方式

1. 下載或 clone 此專案
2. 安裝依賴套件
   ```bash
   npm install
   ```
3. 啟動伺服器
   ```bash
   node index.js
   ```

## 主要功能

- 根據輸入日期與時間計算星座
- 提供 HTTP API 伺服器介面
- 所有天文計算皆依賴 [swisseph](https://github.com/andrmoel/node-sweph) 函式庫

## swisseph 授權說明 (AGPL-3.0)

本專案引用之 swisseph 函式庫，其授權為 GNU Affero General Public License v3.0 (AGPL-3.0)。依據 AGPL 條款，您在下列情境需注意：

- 若您修改本專案或 swisseph 原始碼，並將修改後的程式碼於網路上提供服務，您必須公開您的修改原始碼。
- 您可自由複製、散布、修改本專案，但散布時必須保留原有授權條款與本說明。
- 請參閱 [swisseph AGPL 授權全文](https://www.gnu.org/licenses/agpl-3.0.html) 以瞭解您的權利與義務。

## 其他需說明事項

- 本專案僅作為學術研究或個人用途，若用於商業用途請特別注意 AGPL 條款。
- 若您將本專案整合進其他服務，請確保下游用戶也能取得完整原始碼。
- 本專案未內嵌 swisseph 資料檔，請依照 swisseph 官方指示下載相關天文資料檔案。

## 貢獻方式

歡迎提交 issue 或 pull request！請確保您的貢獻同樣遵循 AGPL-3.0 授權。

## 聯絡方式

如有任何疑問，請於 GitHub issue 留言或聯絡專案維護者。
