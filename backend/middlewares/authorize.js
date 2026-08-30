import { UnauthorizedError } from "../utils/AppError.js";

const authorize = (roles = []) => {
  const allowedRoles = Array.isArray(roles) ? roles : [roles];
  return (req, res, next) => {
    if (!req.user) {
      throw new UnauthorizedError("無效的 token");
    }
    if (!allowedRoles.includes(req.user.role)) {
      throw new UnauthorizedError("使用者尚未成為教練");
    }
    return next();
  };
};

export default authorize;
