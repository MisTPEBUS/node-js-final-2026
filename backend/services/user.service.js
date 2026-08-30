import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/index.js";
import dataSource from "../db/data-source.js";
import { User } from "../entities/User.js";
import { BadRequestError, ConflictError_409 } from "../utils/AppError.js";
import { LOGIN_ERROR_MSG, UserRole } from "../utils/helper.js";

const userRepo = dataSource.getRepository(User);
const userService = {
  async createAsync({ name, email, password }) {
    const existing = await userRepo.findOneBy({
      email: email.trim().toLowerCase(),
    });

    if (existing) {
      throw new ConflictError_409("Email 已被使用");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userRepo.create({
      name,
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      role: UserRole.USER,
    });

    return await userRepo.save(user);
  },

  async loginAsync({ email, password }) {
    const Email = email.trim().toLowerCase();
    const user = await userRepo.findOne({
      where: { email: Email },
      select: {
        id: true,
        name: true,
        password: true,
        role: true,
      },
    });

    if (!user) {
      throw new BadRequestError(LOGIN_ERROR_MSG);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestError(LOGIN_ERROR_MSG);
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      config.jwt.secretKey,
      { expiresIn: config.jwt.expiresDay },
    );

    return {
      token,
      user: {
        name: user.name,
      },
    };
  },
  getUserById(userId) {
    return userRepo.findOneBy({ id: userId });
  },
  async updateNameById(userId, newName) {
    const user = await userRepo.findOneBy({ id: userId });
    if (user.name == newName) {
      throw BadRequestError("使用者名稱未變更");
    }
    const result = await userRepo.update({ id: userId }, { name: newName });

    if (result.affected !== 1) {
      throw new BadRequestError("更新使用者資料失敗");
    }

    return newName;
  },
  async updatePasswordById(
    userId,
    { password, new_password, confirm_new_password },
  ) {
    //新密碼不能與舊密碼相同
    if (password === new_password) {
      throw new BadRequestError("新密碼不能與舊密碼相同");
    }
    //新密碼與驗證新密碼不一致
    if (new_password !== confirm_new_password) {
      throw new BadRequestError("新密碼與驗證新密碼不一致");
    }

    const user = await userRepo.findOne({
      where: {
        id: userId,
      },
      select: {
        id: true,
        password: true,
      },
    });

    // 舊密碼比對錯誤 → 400「密碼輸入錯誤」
    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    if (!passwordIsCorrect) {
      throw new BadRequestError("密碼輸入錯誤");
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);

    const result = await userRepo.update(
      {
        id: userId,
      },
      {
        password: hashedPassword,
      },
    );

    if (result.affected !== 1) {
      throw new BadRequestError("更新使用者資料失敗");
    }
  },
};

export default userService;
