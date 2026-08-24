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

export default router;
