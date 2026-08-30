import express from "express";
import isAuth from "../middlewares/isAuth.js";
import authorize from "../middlewares/authorize.js";
import validate from "../middlewares/validate.js";
import adminCoachController from "../controllers/adminCoach.controller.js";
import {
  createCoachSchema,
  createCourseSchema,
  getCourseSchema,
  updateCoachSchema,
  updateCourseSchema,
} from "../schemas/adminCoach.schemas.js";
//M6
import { revenueSchema } from "../schemas/coach.schema.js";
import { UserRole } from "../utils/helper.js";

const router = express.Router();
router.post(
  "/courses",
  isAuth,
  authorize(UserRole.COACH),
  validate(createCourseSchema),
  adminCoachController.createCourse,
);
router.get(
  "/courses/:courseId",
  isAuth,
  validate(getCourseSchema),
  adminCoachController.getCoachCourseDetail,
);
router.put(
  "/courses/:courseId",
  isAuth,
  validate(updateCourseSchema),
  adminCoachController.updateCoachCourse,
);

router.get(
  "/courses",
  isAuth,
  authorize(UserRole.COACH),
  adminCoachController.getCoachCourses,
);

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
//M6
router.get(
  "/revenue",
  isAuth,
  authorize(UserRole.COACH),
  validate(revenueSchema),
  adminCoachController.getMonthlyRevenue,
);

export default router;
