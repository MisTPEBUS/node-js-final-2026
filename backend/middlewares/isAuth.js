import jwt from "jsonwebtoken";
import config from "../config/index.js";
import { UnauthorizedError } from "../utils/AppError.js";
import dataSource from "../db/data-source.js";
import { User } from "../entities/User.js";

/**
 * JWT 守門員：驗 Authorization header 的 Bearer token
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const isAuth = async function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("請先登入");
  }

  const token = authHeader.slice(7).trim();
  if (!token) {
    throw new UnauthorizedError("請先登入");
  }
  let decoded;
  try {
    decoded = jwt.verify(token, config.jwt.secretKey);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new UnauthorizedError("Token 已過期");
    }
    throw new UnauthorizedError("無效的 token");
  }
  if (!decoded || typeof decoded !== "object" || !decoded.id || !decoded.role) {
    throw new UnauthorizedError("無效的 token");
  }
  const userRepo = dataSource.getRepository(User);
  const user = await userRepo.findOneBy({ id: decoded.id });
  if (!user) {
    throw new UnauthorizedError("無效的 token");
  }
  req.user = {
    id: user.id,
    role: user.role,
  };
  return next();
};

export default isAuth;
