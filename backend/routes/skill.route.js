import express from "express";
import skillController from "../controllers/skill.controller.js";
import validate from "../middlewares/validate.js";
import {
  createSkillSchema,
  deleteSkillSchema,
} from "../schemas/skill.schema.js";

const router = express.Router();

router.get("/", skillController.getSkills);
router.post("/", validate(createSkillSchema), skillController.createSkill);
router.delete(
  "/:skillId",
  validate(deleteSkillSchema),
  skillController.deleteSkill,
);

export default router;
