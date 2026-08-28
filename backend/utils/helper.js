export const UserRole = Object.freeze({
  USER: "USER",
  COACH: "COACH",
  STAFF: "STAFF",
  ADMIN: "ADMIN",
});

export const PASSWORD_ERROR_MSG =
  "必須同時包含英文大寫、英文小寫、數字，長度 8～16 字。";

export const REQUEST_NULL_MSG = "任一必填欄位缺漏或為空";
export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,16}$/;
