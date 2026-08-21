import path from "node:path";
import { fileURLToPath } from "node:url";
import { DataSource } from "typeorm";
import config from "../config/index.js";
import { User } from "../entities/User.js";
import { Skill } from "../entities/Skill.js";
import { CreditPackage } from "../entities/CreditPackage.js";
import { CreditPurchase } from "../entities/CreditPurchase.js";
import { Coach } from "../entities/Coach.js";
import { CoachSkill } from "../entities/CoachSkill.js";
import { Course } from "../entities/Course.js";
import { CourseBooking } from "../entities/CourseBooking.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const dataSource = new DataSource({
  type: "postgres",
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  synchronize: config.db.synchronize,
  ssl: config.db.ssl,
  entities: [
    User,
    Skill,
    CreditPackage,
    CreditPurchase,
    Coach,
    CoachSkill,
    Course,
    CourseBooking,
  ],
  migrations: [path.join(__dirname, "migrations", "*.js")],
});

export default dataSource;
