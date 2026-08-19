const { DataSource } = require("typeorm");
const config = require("../config");
const { User } = require("../entities/User");
const { Skill } = require("../entities/Skill");
const { CreditPackage } = require("../entities/CreditPackage");
const { CreditPurchase } = require("../entities/CreditPurchase");
const { Coach } = require("../entities/Coach");
const { CoachSkill } = require("../entities/CoachSkill");
const { Course } = require("../entities/Course");
const { CourseBooking } = require("../entities/CourseBooking");

function toBoolean(value) {
  if (typeof value === "boolean") return value;
  return String(value).toLowerCase() === "true";
}

const dataSource = new DataSource({
  type: "postgres",
  host: config.get("db.host"),
  port: Number(config.get("db.port")),
  username: config.get("db.username"),
  password: config.get("db.password"),
  database: config.get("db.database"),
  synchronize: toBoolean(config.get("db.synchronize")),
  ssl: toBoolean(config.get("db.ssl")),
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
});

module.exports = dataSource;
