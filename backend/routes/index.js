import express from "express";
import healthCheckRoute from "./healthCheck.route.js";
import skillRoute from "./skill.route.js";
import creditPackageRoute from "./credit-package.route.js";

const v1Routes = express.Router();

v1Routes.use("/healthcheck", healthCheckRoute);
v1Routes.use("/api/coaches/skill", skillRoute);
v1Routes.use("/api/credit-package", creditPackageRoute);

export default v1Routes;
