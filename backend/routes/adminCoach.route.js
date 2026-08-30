import express from "express";
import isAuth from "../middlewares/isAuth.js";
import authorize from "../middlewares/authorize.js";
import validate from "../middlewares/validate.js";
import adminCoachController from "../controllers/adminCoach.controller.js";
import {
  createCoachSchema,
  updateCoachSchema,
} from "../schemas/adminCoach.schemas.js";
import { UserRole } from "../utils/helper.js";

const router = express.Router();

router.post(
  "/:userId",
  validate(createCoachSchema),
  adminCoachController.createCoach,
);
router.get(
  "/",
  isAuth,
  authorize(UserRole.COACH),
  adminCoachController.getCoachProfile,
);
router.put(
  "/",
  isAuth,
  authorize(UserRole.COACH),
  validate(updateCoachSchema),
  adminCoachController.updateCoachProfile,
);
router.get("/courses", isAuth, authorize(UserRole.COACH));

export default router;
