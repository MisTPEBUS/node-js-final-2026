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
  migrations: ["db/migrations/*.js"],
});

module.exports = dataSource;
