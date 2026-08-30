import express from "express";
//M5
import isAuth from "../middlewares/isAuth.js";
import validate from "../middlewares/validate.js";
import { courseIdSchema } from "../schemas/course.schema.js";
import courseController from "../controllers/course.controller.js";

const route = new express.Router();

route.get("/", courseController.getOngoingCourses);
//M5
route.post(
  "/:courseId",
  isAuth,
  validate(courseIdSchema),
  courseController.bookCourse,
);

route.delete(
  "/:courseId",
  isAuth,
  validate(courseIdSchema),
  courseController.cancelCourse,
);

export default route;
