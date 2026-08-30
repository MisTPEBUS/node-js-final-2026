export const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

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

export const getCourseStatus = (startAt, endAt, now) => {
  const startTime = new Date(startAt).getTime();
  const endTime = new Date(endAt).getTime();
  const nowTime = now.getTime();

  if (nowTime < startTime) {
    return "尚未開始";
  }

  if (nowTime >= endTime) {
    return "已結束";
  }

  return "進行中";
};
