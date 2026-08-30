import express from "express";
import courseController from "../controllers/course.controller.js";

const route = new express.Router();

route.get("/", courseController.getOngoingCourses);

export default route;
