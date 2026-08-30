import express from "express";
import validate from "../middlewares/validate.js";
import userController from "../controllers/user.controller.js";
import {
  loginSchema,
  signupSchema,
  updatePasswordSchema,
  updateProfileSchema,
} from "../schemas/user.schema.js";
import isAuth from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/signup", validate(signupSchema), userController.signup);
router.post("/login", validate(loginSchema), userController.login);
router.get("/profile", isAuth, userController.getUserProfile);
router.put(
  "/profile",
  isAuth,
  validate(updateProfileSchema),
  userController.updateName,
);
router.put(
  "/password",
  isAuth,
  validate(updatePasswordSchema),
  userController.updatePassword,
);
//M5
router.get("/credit-package", isAuth, userController.getCreditPurchases);
//M5 修改既有路由
router.get("/courses", isAuth, userController.getCourses);

export default router;
