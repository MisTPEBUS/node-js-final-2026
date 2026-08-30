import express from "express";
import uploadController from "../controllers/upload.controller.js";
import isAuth from "../middlewares/isAuth.js";
import uploadSingleImage from "../middlewares/uploadImage.js";

const router = express.Router();

router.post("/", isAuth, uploadSingleImage, uploadController.uploadImage);

export default router;
