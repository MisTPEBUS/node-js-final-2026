import express from "express";
import creditPackageController from "../controllers/credit-package.controller.js";
import validate from "../middlewares/validate.js";
import {
  createCreditPackageSchema,
  deleteCreditPackageSchema,
} from "../schemas/credit-package.schema.js";

const router = express.Router();

router.get("/", creditPackageController.getCreditPages);
router.post(
  "/",
  validate(createCreditPackageSchema),
  creditPackageController.createCreditPackage,
);
router.delete(
  "/:creditPackageId",
  validate(deleteCreditPackageSchema),
  creditPackageController.deleteCreditPackage,
);

export default router;
