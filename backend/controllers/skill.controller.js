import responseHelper from "../utils/responseHelper.js";
import skillService from "../services/skill.service.js";

const skillController = {
  async getSkills(req, res) {
    const skills = await skillService.getAll();

    return responseHelper.ok(res, skills);
  },

  async createSkill(req, res) {
    const { name } = req.validated.body;
    const skill = await skillService.createAsync(name);

    return responseHelper.ok(res, {
      id: skill.id,
      name: skill.name,
      createdAt: skill.created_at,
    });
  },
};

export default skillController;
