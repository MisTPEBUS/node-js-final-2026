import express from "express";
import healthCheckRoute from "./healthCheck.route.js";
import skillRoute from "./skill.route.js";
import creditPackageRoute from "./credit-package.route.js";
import userRoute from "./user.route.js";
import adminCoachRoute from "./adminCoach.route.js";
import coachRoute from "./coach.route.js";
import courseRoute from "./courses.route.js";

const v1Routes = express.Router();

v1Routes.use("/healthcheck", healthCheckRoute);
v1Routes.use("/api/coaches/skill", skillRoute);
v1Routes.use("/api/credit-package", creditPackageRoute);
v1Routes.use("/api/users", userRoute);
v1Routes.use("/api/admin/coaches", adminCoachRoute);
v1Routes.use("/api/coaches", coachRoute);
v1Routes.use("/api/courses", courseRoute);
export default v1Routes;
