import express from "express";
import creditPackageController from "../controllers/credit-package.controller.js";
import isAuth from "../middlewares/isAuth.js";
import validate from "../middlewares/validate.js";
import {
  createCreditPackageSchema,
  deleteCreditPackageSchema,
  purchaseCreditPackageSchema,
} from "../schemas/credit-package.schema.js";

const router = express.Router();

router.get("/", creditPackageController.getCreditPages);
router.post(
  "/",
  validate(createCreditPackageSchema),
  creditPackageController.createCreditPackage,
);
// M5
router.post(
  "/:creditPackageId",
  isAuth,
  validate(purchaseCreditPackageSchema),
  creditPackageController.purchaseCreditPackage,
);
router.delete(
  "/:creditPackageId",
  validate(deleteCreditPackageSchema),
  creditPackageController.deleteCreditPackage,
);

export default router;
