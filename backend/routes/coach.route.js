import express from "express";
import coachController from "../controllers/coach.controller.js";
import validate from "../middlewares/validate.js";
import { coachIdSchema, getCoachesSchema } from "../schemas/coach.schema.js";

const route = new express.Router();

route.get("/", validate(getCoachesSchema), coachController.getCoaches);
route.get(
  "/:coachId/courses",
  validate(coachIdSchema),
  coachController.getCoachCourses,
);
route.get(
  "/:coachId",
  validate(coachIdSchema),
  coachController.getCoachDetail,
);

export default route;
