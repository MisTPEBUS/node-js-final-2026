import coachService from "../services/coach.service.js";
import responseHelper from "../utils/responseHelper.js";

const coachController = {
  async getCoaches(req, res) {
    const coaches = await coachService.getPublicCoaches(req.validated.query);

    return responseHelper.ok(res, coaches);
  },
  async getCoachDetail(req, res) {
    const coach = await coachService.getPublicCoachById(
      req.validated.params.coachId,
    );

    return responseHelper.ok(res, coach);
  },
  async getCoachCourses(req, res) {
    const courses = await coachService.getPublicCoachCoursesById(
      req.validated.params.coachId,
    );

    return responseHelper.ok(res, courses);
  },
};

export default coachController;
