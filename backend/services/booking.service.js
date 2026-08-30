import { IsNull } from "typeorm";
import dataSource from "../db/data-source.js";
import { Course } from "../entities/Course.js";
import { CourseBooking } from "../entities/CourseBooking.js";
import { CreditPurchase } from "../entities/CreditPurchase.js";
import { User } from "../entities/User.js";
import { BadRequestError } from "../utils/AppError.js";
const bookingRepo = dataSource.getRepository(CourseBooking);
const bookingService = {
  //M5
  async bookCourseById(userId, courseId) {
    await dataSource.transaction(async (manager) => {
      const courseRepo = manager.getRepository(Course);
      const bookingRepo = manager.getRepository(CourseBooking);
      const purchaseRepo = manager.getRepository(CreditPurchase);
      const userRepo = manager.getRepository(User);

      const course = await courseRepo.findOne({
        where: {
          id: courseId,
        },
        lock: {
          mode: "pessimistic_write",
        },
      });

      if (!course) {
        throw new BadRequestError("ID錯誤");
      }

      const existingBooking = await bookingRepo.findOneBy({
        user_id: userId,
        course_id: courseId,
      });

      if (existingBooking) {
        throw new BadRequestError("已經報名過此課程");
      }

      await userRepo.findOne({
        where: {
          id: userId,
        },
        lock: {
          mode: "pessimistic_write",
        },
      });

      const purchases = await purchaseRepo.findBy({
        user_id: userId,
      });

      const purchasedCredits = purchases.reduce(
        (total, purchase) => total + Number(purchase.purchased_credits),
        0,
      );

      const creditUsage = await bookingRepo.countBy({
        user_id: userId,
        cancelled_at: IsNull(),
      });

      if (purchasedCredits - creditUsage <= 0) {
        throw new BadRequestError("已無可使用堂數");
      }

      const participants = await bookingRepo.countBy({
        course_id: courseId,
        cancelled_at: IsNull(),
      });

      if (participants >= course.max_participants) {
        throw new BadRequestError("已達最大參加人數，無法參加");
      }

      const booking = bookingRepo.create({
        user_id: userId,
        course_id: courseId,
      });

      await bookingRepo.save(booking);
    });
  },
  async cancelCourseById(userId, courseId) {
    const result = await bookingRepo.update(
      {
        user_id: userId,
        course_id: courseId,
        cancelled_at: IsNull(),
      },
      {
        cancelled_at: new Date(),
      },
    );

    if (result.affected !== 1) {
      throw new BadRequestError("ID錯誤");
    }
  },
};

export default bookingService;
