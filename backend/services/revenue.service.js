import dataSource from "../db/data-source.js";
import { Course } from "../entities/Course.js";
import { CourseBooking } from "../entities/CourseBooking.js";
import { CreditPackage } from "../entities/CreditPackage.js";
import { months } from "../utils/helper.js";

const bookingRepo = dataSource.getRepository(CourseBooking);
const creditPackageRepo = dataSource.getRepository(CreditPackage);

const revenueService = {
  //M6
  async getMonthlyRevenueByUserId(userId, month) {
    const now = new Date();
    const monthIndex = months.indexOf(month);
    const startAt = new Date(now.getFullYear(), monthIndex, 1);
    const endAt = new Date(now.getFullYear(), monthIndex + 1, 1);

    const bookingTotal = await bookingRepo
      .createQueryBuilder("booking")
      .innerJoin(Course, "course", "course.id = booking.course_id")
      .select("COUNT(*)", "course_count")
      .addSelect("COUNT(DISTINCT booking.user_id)", "participants")
      .where("course.user_id = :userId", { userId })
      .andWhere("booking.cancelled_at IS NULL")
      .andWhere("booking.created_at >= :startAt", { startAt })
      .andWhere("booking.created_at < :endAt", { endAt })
      .getRawOne();

    const creditPackages = await creditPackageRepo.find();

    const totalPrice = creditPackages.reduce(
      (total, creditPackage) => total + Number(creditPackage.price),
      0,
    );

    const totalCredits = creditPackages.reduce(
      (total, creditPackage) => total + Number(creditPackage.credit_amount),
      0,
    );

    const courseCount = Number(bookingTotal.course_count);
    const participants = Number(bookingTotal.participants);
    const revenue =
      totalCredits === 0
        ? 0
        : Math.floor((courseCount * totalPrice) / totalCredits);

    return {
      total: {
        revenue,
        participants,
        course_count: courseCount,
      },
    };
  },
};

export default revenueService;
