import dataSource from "../db/data-source.js";
import { Skill } from "../entities/Skill.js";
import { AppError } from "../utils/AppError.js";

const skillRepo = dataSource.getRepository(Skill);

const skillService = {
  getAll() {
    return skillRepo.find({
      select: {
        id: true,
        name: true,
      },
      order: {
        created_at: "ASC",
      },
    });
  },

  async createAsync(name) {
    const existing = await skillRepo.findOneBy({ name });

    if (existing) {
      throw new AppError(409, "資料重複");
    }

    return await skillRepo.save(skillRepo.create({ name }));
  },
  async deleteAsyncById(skillId) {
    const result = await skillRepo.delete(skillId);

    if (!result.affected) {
      throw new AppError(400, "ID錯誤");
    }
  },
};

export default skillService;
