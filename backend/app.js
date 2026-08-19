const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 404 錯誤
app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    message: "無此路由",
  });
  return;
});

// 全域錯誤處理
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    status: statusCode === 500 ? "error" : "failed",
    message: err.message || "伺服器錯誤",
  });
});

module.exports = app;
