import { In } from "typeorm";
import dataSource from "../db/data-source.js";
import { Coach } from "../entities/Coach.js";
import { CoachSkill } from "../entities/CoachSkill.js";
import { Course } from "../entities/Course.js";
import { CourseBooking } from "../entities/CourseBooking.js";
import { Skill } from "../entities/Skill.js";
import { User } from "../entities/User.js";
import {
  BadRequestError,
  ConflictError_409,
  UnauthorizedError,
} from "../utils/AppError.js";
import { UserRole } from "../utils/helper.js";

const coachRepo = dataSource.getRepository(Coach);
const coachSkillRepo = dataSource.getRepository(CoachSkill);

const coachService = {
  async createCoach(
    userId,
    { experience_years, description, profile_image_url },
  ) {
    return dataSource.transaction(async (transactionalEntityManager) => {
      const userRepo = transactionalEntityManager.getRepository(User);
      const coachRepo = transactionalEntityManager.getRepository(Coach);

      const user = await userRepo.findOne({
        where: { id: userId },

        lock: {
          mode: "pessimistic_write",
        },
      });

      if (!user) {
        throw new BadRequestError("使用者不存在");
      }
      const existingCoach = await coachRepo.findOneBy({ user_id: userId });

      if (existingCoach || user.role == UserRole.COACH) {
        throw new ConflictError_409("使用者已經是教練");
      }

      const coach = coachRepo.create({
        user_id: userId,
        experience_years: experience_years,
        description: description,
        profile_image_url: profile_image_url?.trim() || null,
      });

      await coachRepo.save(coach);

      user.role = UserRole.COACH;
      await userRepo.save(user);

      return {
        user: {
          name: user.name,
          role: user.role,
        },
        coach,
      };
    });
  },
  async getCoachById(userId) {
    const coach = await coachRepo.findOne({
      where: {
        user_id: userId,
      },
      select: {
        id: true,
        experience_years: true,
        description: true,
        profile_image_url: true,
      },
    });

    if (!coach) {
      throw new UnauthorizedError("使用者尚未成為教練");
    }

    const coachSkills = await coachSkillRepo.find({
      where: {
        coach_id: coach.id,
      },
      select: {
        skill_id: true,
      },
    });

    return {
      ...coach,
      skill_ids: coachSkills.map((s) => s.skill_id),
    };
  },
  async updateCoachProfileByUserId(userId, coachData) {
    const { experience_years, description, profile_image_url, skill_ids } =
      coachData;

    if (new Set(skill_ids).size !== skill_ids.length) {
      //陣列ID重複
      throw new BadRequestError("欄位未填寫正確");
    }
    return dataSource.transaction(async (transactionalEntityManager) => {
      const coachRepo = transactionalEntityManager.getRepository(Coach);
      const coachSkillRepo =
        transactionalEntityManager.getRepository(CoachSkill);
      const skillRepo = transactionalEntityManager.getRepository(Skill);

      const coach = await coachRepo.findOne({
        where: {
          user_id: userId,
        },
        lock: {
          mode: "pessimistic_write",
        },
      });

      if (!coach) {
        throw new UnauthorizedError("使用者尚未成為教練");
      }

      const skills = await skillRepo.find({
        where: {
          id: In(skill_ids),
        },
        select: {
          id: true,
        },
      });

      if (skills.length !== skill_ids.length) {
        //id不存在
        throw new BadRequestError("欄位未填寫正確");
      }

      coach.experience_years = experience_years;
      coach.description = description;
      coach.profile_image_url = profile_image_url;

      await coachRepo.save(coach);

      await coachSkillRepo.delete({
        coach_id: coach.id,
      });

      await coachSkillRepo.insert(
        skill_ids.map((skillId) => ({
          coach_id: coach.id,
          skill_id: skillId,
        })),
      );

      return {
        id: coach.id,
        experience_years: coach.experience_years,
        description: coach.description,
        profile_image_url: coach.profile_image_url,
        skill_ids,
      };
    });
  },
};

export default coachService;
