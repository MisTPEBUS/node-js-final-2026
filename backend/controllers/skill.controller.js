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

  async deleteSkill(req, res) {
    const { skillId } = req.validated.params;

    await skillService.deleteAsync(skillId);

    return responseHelper.ok(res, null);
  },
};

export default skillController;
