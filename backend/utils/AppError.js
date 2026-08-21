class AppError extends Error {
  constructor(statusCode, message, errors = null) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.status = statusCode;
    this.errors = errors;
    this.isOperational = true;

    Error.captureStackTrace?.(this, this.constructor);
  }
}

class BadRequestError extends AppError {
  constructor(message = "請求資料錯誤", errors = null) {
    super(400, message, errors);
  }
}

class ValidationError extends AppError {
  constructor(message = "資料驗證失敗", errors = null) {
    super(400, message, errors);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = "請先登入") {
    super(401, message);
  }
}

class ForbiddenError extends AppError {
  constructor(message = "沒有操作權限") {
    super(403, message);
  }
}

class NotFoundError extends AppError {
  constructor(message = "找不到指定資源") {
    super(404, message);
  }
}

export {
  AppError,
  BadRequestError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
};
