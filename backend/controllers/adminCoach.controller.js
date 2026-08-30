import coachService from "../services/coach.service.js";
import courseService from "../services/course.service.js";
//M6
import revenueService from "../services/revenue.service.js";
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
  async getCoachCourses(req, res) {
    const courses = await courseService.getCoachCoursesByUserId(req.user.id);
    return responseHelper.ok(res, courses);
  },

  async createCourse(req, res) {
    const course = await courseService.createCourseByUserId(
      req.user.id,
      req.validated.body,
    );

    return responseHelper.created(res, {
      course,
    });
  },
  async getCoachCourseDetail(req, res) {
    const course = await courseService.getCoachCourseDetailById(
      req.user.id,
      req.validated.params.courseId,
    );

    return responseHelper.ok(res, course);
  },
  async updateCoachCourse(req, res) {
    const course = await courseService.updateCoachCourseById(
      req.user.id,
      req.validated.params.courseId,
      req.validated.body,
    );

    return responseHelper.ok(res, {
      course,
    });
  },

  //M6

  async getMonthlyRevenue(req, res) {
    const result = await revenueService.getMonthlyRevenueByUserId(
      req.user.id,
      req.validated.query.month,
    );

    return responseHelper.ok(res, result);
  },
};

export default adminCoachController;
