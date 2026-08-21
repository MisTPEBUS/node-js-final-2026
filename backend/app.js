import express from "express";
import cors from "cors";
import {
  jsonErrorHandler,
  errorHandler,
} from "./middlewares/errorHandler.js";
import v1Routes from "./routes/index.js";
import { NotFoundError } from "./utils/AppError.js";

const app = express();

app.use(cors());
app.use(express.json());

// middleware  JSON解析錯誤
app.use(jsonErrorHandler);

app.use(v1Routes);

// 404 錯誤
app.use((req, res, next) => {
  next(new NotFoundError("無此路由"));
});

// middleware全域錯誤處理
app.use(errorHandler);

export default app;
