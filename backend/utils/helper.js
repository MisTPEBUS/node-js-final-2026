export const UserRole = Object.freeze({
  USER: "USER",
  COACH: "COACH",
  STAFF: "STAFF",
  ADMIN: "ADMIN",
});

export const PASSWORD_ERROR_MSG =
  "密碼不符合規則，需要包含英文數字大小寫，最短8個字，最長16個字";

export const REQUEST_NULL_MSG = "欄位未填寫正確";
export const REQUEST_TYPE_ERROR_MSG = "欄位未填寫正確";
export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,16}$/;
export const LOGIN_ERROR_MSG = "使用者不存在或密碼輸入錯誤";
