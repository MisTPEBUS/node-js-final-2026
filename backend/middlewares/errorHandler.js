import { ZodError } from "zod";
import responseHelper from "../utils/responseHelper.js";

// 捕捉 JSON 解析錯誤
const jsonErrorHandler = (err, req, res, next) => {
  if (!(err instanceof SyntaxError) || err.type !== "entity.parse.failed") {
    return next(err);
  }

  console.warn(`[${req.method}] ${req.originalUrl} -> 400:  JSON Error`);

  return responseHelper.fail(res, 400, "傳入的 JSON 格式錯誤，請格式是否正確");
};

// middleware 全域錯誤處理
const errorHandler = (err, req, res, next) => {
  console.log(`[errorHandler] response headers sent: ${res.headersSent}`);
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ZodError) {
    const message = err.issues[0]?.message ?? "欄位未填寫正確";

    return responseHelper.sendError(res, 400, message);
  }

  const statusCode = err.statusCode || 500;

  if (statusCode >= 500) {
    console.error(`[${req.method}] ${req.originalUrl}`, err);

    return responseHelper.serverError(res);
  }

  console.warn(
    `[${req.method}] ${req.originalUrl} -> ${statusCode}: ${err.message}`,
  );

  return responseHelper.sendError(
    res,
    statusCode,
    err.message || "請求處理失敗",
    err.errors,
  );
};

export { jsonErrorHandler, errorHandler };
