import { LessThanOrEqual, MoreThan } from "typeorm";
import dataSource from "../db/data-source.js";
import { Course } from "../entities/Course.js";
import { CourseBooking } from "../entities/CourseBooking.js";
import { CreditPurchase } from "../entities/CreditPurchase.js";
import { Skill } from "../entities/Skill.js";
import { BadRequestError } from "../utils/AppError.js";
import { getCourseStatus } from "../utils/helper.js";

const courseRepo = dataSource.getRepository(Course);
const bookingRepo = dataSource.getRepository(CourseBooking);
const creditPurchaseRepo = dataSource.getRepository(CreditPurchase);

const skillRepo = dataSource.getRepository(Skill);

const courseService = {
  async getCoachCoursesByUserId(userId) {
    const now = new Date();

    const courses = await courseRepo.find({
      where: { user_id: userId },
      order: { start_at: "ASC" },
    });
    if (courses.length === 0) return [];

    const rows = await bookingRepo
      .createQueryBuilder("b")
      .select("b.course_id", "course_id")
      .addSelect("COUNT(*)", "count")
      .where("b.course_id IN (:...ids)", { ids: courses.map((c) => c.id) })
      .andWhere("b.cancelled_at IS NULL")
      .groupBy("b.course_id")
      .getRawMany();
    const countMap = new Map(rows.map((r) => [r.course_id, Number(r.count)]));
    return courses.map((c) => ({
      id: c.id,
      name: c.name,
      status: getCourseStatus(c.start_at, c.end_at, now),
      start_at: c.start_at,
      end_at: c.end_at,
      max_participants: c.max_participants,
      meeting_url: c.meeting_url,
      participants: countMap.get(c.id) ?? 0,
    }));
  },
  async createCourseByUserId(
    userId,
    {
      skill_id,
      name,
      description,
      start_at,
      end_at,
      max_participants,
      meeting_url,
    },
  ) {
    const skill = await skillRepo.findOneBy({
      id: skill_id,
    });

    if (!skill) {
      throw new BadRequestError("欄位未填寫正確");
    }

    const course = courseRepo.create({
      user_id: userId,
      skill_id,
      name,
      description,
      start_at: new Date(start_at),
      end_at: new Date(end_at),
      max_participants,
      meeting_url,
    });

    return courseRepo.save(course);
  },
  async getCoachCourseDetailById(userId, courseId) {
    const course = await courseRepo.findOne({
      where: {
        id: courseId,
        user_id: userId,
      },
      relations: {
        skill: true,
      },
    });

    if (!course) {
      throw new BadRequestError("課程不存在");
    }

    return {
      id: course.id,
      name: course.name,
      description: course.description,
      start_at: course.start_at,
      end_at: course.end_at,
      max_participants: course.max_participants,
      skill_name: course.skill.name,
      skill_id: course.skill_id,
      meeting_url: course.meeting_url,
    };
  },
  async updateCoachCourseById(
    userId,
    courseId,
    {
      skill_id,
      name,
      description,
      start_at,
      end_at,
      max_participants,
      meeting_url,
    },
  ) {
    const course = await courseRepo.findOneBy({
      id: courseId,
      user_id: userId,
    });

    if (!course) {
      throw new BadRequestError("課程不存在");
    }

    const skill = await skillRepo.findOneBy({ id: skill_id });

    if (!skill) {
      throw new BadRequestError("欄位未填寫正確");
    }

    course.skill_id = skill_id;
    course.name = name;
    course.description = description;
    course.start_at = new Date(start_at);
    course.end_at = new Date(end_at);
    course.max_participants = max_participants;
    course.meeting_url = meeting_url;

    return courseRepo.save(course);
  },
  async getOngoingCourses() {
    const now = new Date();

    const courses = await courseRepo.find({
      where: {
        start_at: LessThanOrEqual(now),
        end_at: MoreThan(now),
      },
      relations: {
        user: true,
        skill: true,
      },
      order: {
        start_at: "ASC",
      },
    });

    return courses.map((course) => ({
      id: course.id,
      name: course.name,
      description: course.description,
      start_at: course.start_at,
      end_at: course.end_at,
      max_participants: course.max_participants,
      coach_name: course.user.name,
      skill_name: course.skill.name,
    }));
  },

  //M5
  async getCoursesByUserId(userId) {
    const purchases = await creditPurchaseRepo.findBy({
      user_id: userId,
    });

    const bookings = await bookingRepo.find({
      where: {
        user_id: userId,
      },
      relations: {
        course: {
          user: true,
        },
      },
      order: {
        course: {
          start_at: "ASC",
        },
      },
    });

    const purchasedCredits = purchases.reduce(
      (total, purchase) => total + Number(purchase.purchased_credits),
      0,
    );

    const creditUsage = bookings.filter(
      (booking) => booking.cancelled_at === null,
    ).length;

    return {
      credit_remain: purchasedCredits - creditUsage,
      credit_usage: creditUsage,
      course_booking: bookings.map((booking) => ({
        course_id: booking.course_id,
        name: booking.course.name,
        start_at: booking.course.start_at,
        end_at: booking.course.end_at,
        meeting_url: booking.course.meeting_url,
        coach_name: booking.course.user.name,
        cancelled_at: booking.cancelled_at,
      })),
    };
  },
};

export default courseService;
