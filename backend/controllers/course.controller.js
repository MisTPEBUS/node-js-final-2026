//M5
import bookingService from "../services/booking.service.js";
import courseService from "../services/course.service.js";
import responseHelper from "../utils/responseHelper.js";

const courseController = {
  async getOngoingCourses(req, res) {
    const courses = await courseService.getOngoingCourses();

    return responseHelper.ok(res, courses);
  },
  //M5
  async bookCourse(req, res) {
    await bookingService.bookCourseById(
      req.user.id,
      req.validated.params.courseId,
    );

    return responseHelper.created(res, null);
  },
};

export default courseController;
