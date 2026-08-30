# HexSchool-Node.js-2026 Fitness Backend API

健身房課程平台後端服務，提供會員、教練、課程、堂數方案、購買、報名、營收統計與選用圖片上傳 API。

API 行為與回應格式以專案根目錄的 `docs/openapi.yaml` 為唯一規格來源；實作里程碑與注意事項請參考 `docs/SPEC.md`。

## 技術棧

- Node.js 24
- Express 5
- PostgreSQL 16
- TypeORM
- Zod
- JSON Web Token
- bcryptjs
- Multer
- Cloudflare R2（選用圖片上傳功能）
- Docker Compose

## 專案架構

```text
backend/
├── config/          # 環境變數驗證與應用程式設定
├── controllers/     # HTTP request/response 處理
├── db/              # TypeORM DataSource 與 migrations
├── entities/        # TypeORM Entity 定義
├── middlewares/     # 認證、授權、驗證、上傳與錯誤處理
├── routes/          # API 路由
├── schemas/         # Zod 請求驗證 schema
├── services/        # 商業邏輯與資料存取
├── utils/           # 共用錯誤、回應與輔助函式
├── app.js           # Express 應用程式組裝
├── server.js        # 資料庫初始化與 HTTP Server 啟動入口
├── Dockerfile
├── package.json
└── package-lock.json
```

服務啟動時會先初始化 TypeORM；資料庫連線成功後才監聽 HTTP port。`GET /healthcheck` 也會實際執行 `SELECT 1`，因此成功回應代表 HTTP Server 與資料庫皆可使用。

## 環境需求

- Node.js 24（建議與 Dockerfile 保持一致）
- npm
- PostgreSQL 16，或可執行 Docker Compose 的 Docker 環境

## 環境變數

後端啟動時會讀取 `backend/.env`。可從專案根目錄的 `.env.example` 建立：

PowerShell：

```powershell
Copy-Item ..\.env.example .\.env
```

Bash：

```bash
cp ../.env.example .env
```

必要設定：

```dotenv
PORT=8080

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=student
DB_PASSWORD=請設定資料庫密碼
DB_DATABASE=fitness
DB_SYNCHRONIZE=true
DB_ENABLE_SSL=false

JWT_SECRET=請設定足夠長且不可公開的亂數字串
JWT_EXPIRES_DAY=30d
```

設定說明：

| 變數 | 用途 |
| --- | --- |
| `PORT` | 後端監聽 port，專案規格固定為 `8080` |
| `DB_HOST` | 本機執行使用 `localhost`；Docker Compose 內使用 `postgres` |
| `DB_PORT` | PostgreSQL port |
| `DB_USERNAME` | PostgreSQL 使用者名稱 |
| `DB_PASSWORD` | PostgreSQL 密碼 |
| `DB_DATABASE` | PostgreSQL 資料庫名稱 |
| `DB_SYNCHRONIZE` | `true` 時由 TypeORM 啟動時同步資料表 |
| `DB_ENABLE_SSL` | 是否啟用資料庫 SSL |
| `JWT_SECRET` | JWT 簽章密鑰，不可提交至版本控制 |
| `JWT_EXPIRES_DAY` | JWT 有效期間，例如 `30d` |

正式環境不建議使用 `DB_SYNCHRONIZE=true`，應改為執行 migrations 管理資料庫結構。

## 安裝與本機啟動

先從專案根目錄啟動 PostgreSQL：

```bash
docker compose up -d postgres
```

接著進入 backend 安裝依賴並啟動開發伺服器：

```bash
cd backend
npm ci
npm run dev
```

正式啟動指令：

```bash
npm start
```

服務預設位置：

- Backend：`http://localhost:8080`
- Healthcheck：`http://localhost:8080/healthcheck`
- Swagger UI：`http://localhost:8081`
- Frontend：`http://localhost:3000`

健康檢查成功時會回傳純文字：

```text
OK
```

## Docker 啟動

在專案根目錄執行：

```bash
docker compose up -d --build backend postgres
```

查看容器狀態與後端日誌：

```bash
docker compose ps
docker compose logs backend
```

Compose 會先等待 PostgreSQL healthcheck 通過，再啟動 backend。PostgreSQL 資料儲存在 `pgData` named volume，重新啟動容器不會清除資料。

容器化注意事項：

- build context 為 `backend/`。
- `DB_HOST` 必須是 Compose service 名稱 `postgres`，不能使用 `localhost`。
- `backend/.dockerignore` 應至少排除 `node_modules` 與 `.env`，避免覆蓋容器依賴或把密鑰寫入映像。
- 不要使用 `docker compose down -v`，除非確定要刪除 PostgreSQL volume 與所有資料。

## 資料庫 Migration

在 `backend/` 目錄執行：

```bash
npm run migration:generate -- ./db/migrations/MigrationName
npm run migration:run
npm run migration:revert
```

若使用 migration，請將 `DB_SYNCHRONIZE` 設為 `false`，並在啟動服務前執行 `npm run migration:run`。

## API 概覽

### 系統

| Method | Path | 說明 |
| --- | --- | --- |
| GET | `/healthcheck` | 檢查 HTTP Server 與資料庫狀態 |

### 技能與堂數方案

| Method | Path | 說明 |
| --- | --- | --- |
| GET | `/api/coaches/skill` | 取得技能列表 |
| POST | `/api/coaches/skill` | 新增技能 |
| DELETE | `/api/coaches/skill/:skillId` | 刪除技能 |
| GET | `/api/credit-package` | 取得堂數方案列表 |
| POST | `/api/credit-package` | 新增堂數方案 |
| DELETE | `/api/credit-package/:creditPackageId` | 刪除堂數方案 |
| POST | `/api/credit-package/:creditPackageId` | 購買堂數方案，需登入 |

### 會員

| Method | Path | 說明 |
| --- | --- | --- |
| POST | `/api/users/signup` | 會員註冊 |
| POST | `/api/users/login` | 會員登入並取得 JWT |
| GET | `/api/users/profile` | 取得本人資料，需登入 |
| PUT | `/api/users/profile` | 更新本人名稱，需登入 |
| PUT | `/api/users/password` | 更新本人密碼，需登入 |
| GET | `/api/users/credit-package` | 取得本人購買紀錄，需登入 |
| GET | `/api/users/courses` | 取得本人課表與剩餘堂數，需登入 |

### 教練後台

| Method | Path | 說明 |
| --- | --- | --- |
| POST | `/api/admin/coaches/:userId` | 將指定使用者升級為教練 |
| GET | `/api/admin/coaches` | 取得教練本人資料，需教練身分 |
| PUT | `/api/admin/coaches` | 更新教練本人資料，需教練身分 |
| GET | `/api/admin/coaches/courses` | 取得本人開設的課程，需教練身分 |
| POST | `/api/admin/coaches/courses` | 新增課程，需教練身分 |
| GET | `/api/admin/coaches/courses/:courseId` | 取得本人課程詳情，需登入 |
| PUT | `/api/admin/coaches/courses/:courseId` | 更新本人課程，需登入 |
| GET | `/api/admin/coaches/revenue?month=` | 取得指定月份營收，需教練身分 |

### 公開教練與課程

| Method | Path | 說明 |
| --- | --- | --- |
| GET | `/api/coaches?per=&page=` | 取得教練分頁列表 |
| GET | `/api/coaches/:coachId` | 取得教練詳情 |
| GET | `/api/coaches/:coachId/courses` | 取得指定教練尚未結束的課程 |
| GET | `/api/courses` | 取得全站進行中的課程 |
| POST | `/api/courses/:courseId` | 報名課程，需登入 |
| DELETE | `/api/courses/:courseId` | 取消報名，需登入 |

完整 request schema、response 範例、狀態碼及固定錯誤訊息請以 `docs/openapi.yaml` 為準。

## 認證與回應格式

需登入的 API 使用：

```http
Authorization: Bearer <token>
```

JWT payload 包含 `id`、`role` 與 `exp`。

一般成功回應：

```json
{
  "status": "success",
  "data": {}
}
```

可預期失敗回應：

```json
{
  "status": "failed",
  "message": "錯誤訊息"
}
```

`GET /healthcheck` 是例外，成功時只回傳純文字 `OK`。

## 圖片上傳（選用）

`POST /api/upload` 需要登入，使用 `multipart/form-data`，檔案欄位名稱為 `file`。

限制：

- 僅支援 JPG 與 PNG。
- 單一檔案最大 2 MiB。
- 會同時檢查上傳 MIME type 與實際檔案內容。

啟用 Cloudflare R2 需額外設定：

```dotenv
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_ENDPOINT=
R2_BUCKET_NAME=
R2_PUBLIC_URL=
```

五個變數必須全部設定才會啟用；未完整設定時，API 會回傳 `503 圖片上傳服務尚未設定`。

上傳成功後只會將檔案存至 R2 並回傳 `image_url`，不會建立圖片資料表紀錄，也不會自動更新 `coaches.profile_image_url`。若要將圖片設為教練頭像，前端需再呼叫 `PUT /api/admin/coaches`。

## 測試

自動化測試位於專案根目錄，因此請回到根目錄執行；`backend/package.json` 目前沒有獨立測試套件。

```bash
npm run test:m1
npm run test:m2
npm run test:m3
npm run test:m4
npm run test:m5
npm run test:m6
npm run test:smoke
npm test
```

完整測試需要 backend 已在 `http://localhost:8080` 運作。容器化 smoke test 建議流程：

```bash
docker compose up -d --build backend postgres
npm run test:smoke
```

## 重要規則

- 所有資料必須持久化至 PostgreSQL。
- 日期時間使用 UTC ISO 8601 字串。
- 所有 id 使用 UUID。
- 取消報名採軟刪除，保留原報名紀錄。
- 剩餘堂數與營收皆由既有交易資料即時計算，不另外儲存結果欄位。
- 不可提交 `.env`、JWT secret、資料庫密碼或 R2 金鑰。
