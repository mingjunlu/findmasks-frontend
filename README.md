# 口罩咧？
健保特約藥局、衛生所口罩庫存查詢地圖，資料來源為保險署提供之開放資料。

## 下載並安裝相依套件
```bash
git clone https://github.com/mingjunlu/findmasks-frontend.git
cd findmasks-frontend
npm install
```

## 設定環境變數
在 `findmasks-frontend` 資料夾中新增一個 `.env.local` 檔案，並參考下方範例輸入內容：
```
REACT_APP_ENDPOINT=https://findmasks.herokuapp.com/places
REACT_APP_MAPBOX_TOKEN=your.own.mapbox.access.token
```
* REACT_APP_ENDPOINT：API 端點網址，提供健保特約藥局與衛生所資訊
* REACT_APP_MAPBOX_TOKEN：使用 Mapbox 地圖套件時必備的通行證，[註冊 Mapbox 帳號](https://www.mapbox.com/signup)後可取得

## 檢查程式語法錯誤
```bash
npm run lint
```

## 啟動開發伺服器
```bash
npm start
```

## 編譯、打包、輸出
```bash
npm run build
```

## 相關資源
* API 文件：[「口罩咧？」API 使用說明](https://hackmd.io/@mingjunlu/findmasks-api-docs)
* 資料來源：[健保特約機構口罩剩餘數量明細清單](https://data.nhi.gov.tw/Datasets/DatasetDetail.aspx?id=656)、[全民健康保險特約院所固定服務時段](https://data.nhi.gov.tw/Datasets/DatasetDetail.aspx?id=441)
* 各方資訊彙整：[口罩供需資訊平台](https://g0v.hackmd.io/gGrOI4_aTsmpoMfLP1OU4A)
