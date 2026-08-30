import courseService from "../services/course.service.js";
import responseHelper from "../utils/responseHelper.js";

const courseController = {
  async getOngoingCourses(req, res) {
    const courses = await courseService.getOngoingCourses();

    return responseHelper.ok(res, courses);
  },
};

export default courseController;
