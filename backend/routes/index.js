import express from "express";
import healthCheckRoute from "./healthCheck.route.js";

const v1Routes = express.Router();

v1Routes.use("/healthcheck", healthCheckRoute);

export default v1Routes;
