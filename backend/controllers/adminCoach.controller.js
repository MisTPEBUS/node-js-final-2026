import coachService from "../services/coach.service.js";
import responseHelper from "../utils/responseHelper.js";

const adminCoachController = {
  async createCoach(req, res) {
    const result = await coachService.createCoach(
      req.validated.params.userId,
      req.validated.body,
    );
    return responseHelper.created(res, result);
  },
  async getCoachProfile(req, res) {
    const coach = await coachService.getCoachById(req.user.id);
    return responseHelper.ok(res, coach);
  },
  async updateCoachProfile(req, res) {
    const result = await coachService.updateCoachProfileByUserId(
      req.user.id,
      req.validated.body,
    );

    return responseHelper.ok(res, result);
  },
};

export default adminCoachController;
