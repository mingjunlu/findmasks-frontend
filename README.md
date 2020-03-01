# 口罩咧？
健保特約藥局、衛生所口罩庫存查詢地圖，資料來源為保險署提供之開放資料。

## 下載並安裝相依套件
```bash
git clone https://github.com/mingjunlu/findmasks-frontend.git
cd findmasks-frontend
npm install
```

## 設定環境變數
在 `findmasks-frontend` 資料夾中新增一個 `.env` 檔案，並參考下方範例修改內容：
```
MAPBOX_TOKEN=pk.eyJ1IjoiZDIzNTc5PleaSEBeAwarE2s3OGU2bThiSISafAKetOkeN250MmU0MiJ9.DET8IkWRT1ySRM2mePvjcA
GIST_URL=https://gist.githubusercontent.com/mingjunlu/20310975a61fd8bbd5c36905c1aaaa25/raw/places.geojson
ENDPOINT=http://your.api.endpoint
```
* MAPBOX_TOKEN：Mapbox access token，[註冊 Mapbox 帳號](https://www.mapbox.com/signup)後可取得（上方範例為無效 token，請記得替換）
* GIST_URL：口罩剩餘數量資料網址（格式：GeoJson）
* ENDPOINT：後端 API 端點網址，沒有的話可以使用 `GIST_URL` 的網址代替

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
* 原始資料來源：[健保特約機構口罩剩餘數量明細清單](https://data.nhi.gov.tw/Datasets/DatasetDetail.aspx?id=656)
* 各方資訊彙整：[口罩供需資訊平台](https://g0v.hackmd.io/gGrOI4_aTsmpoMfLP1OU4A)
