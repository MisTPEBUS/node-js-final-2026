const success = (res, statusCode, data = null) =>
  res.status(statusCode).json({
    status: "success",
    data,
  });

const sendError = (res, statusCode, message, errors = null) => {
  const body = {
    status: "failed",
    message,
  };

  if (errors) {
    body.errors = errors;
  }

  return res.status(statusCode).json(body);
};

const serverError = (res) =>
  res.status(500).json({
    status: "error",
    message: "系統發生未預期的錯誤",
  });

/**
 * @example
 * // 200：查詢成功，data 可放任意回傳資料
 * return responseHelper.ok(res, { user });
 *
 * @example
 * // 201：建立成功
 * return responseHelper.created(res, { message: "註冊成功" });
 *
 * @example
 * // 400：請求內容不符合規格
 * return responseHelper.badRequest(res, "email 與 password 為必填欄位");
 *
 * @example
 * // 401：尚未登入或驗證失敗
 * return responseHelper.unauthorized(res, "請先登入");
 *
 * @example
 * // 403：已登入但沒有權限
 * return responseHelper.forbidden(res, "使用者尚未成為教練");
 *
 * @example
 * // 404：找不到指定資源
 * return responseHelper.notFound(res, "找不到使用者");
 *
 */
const responseHelper = {
  ok: (res, data) => success(res, 200, data),
  created: (res, data) => success(res, 201, data),
  noContent: (res) => res.status(204).send(),
  sendError,
  serverError,
};

export default responseHelper;
