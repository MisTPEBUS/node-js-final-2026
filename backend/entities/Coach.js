const { EntitySchema } = require("typeorm");
const Coach = new EntitySchema({
  name: "Coach",
  tableName: "coaches",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    user_id: {
      type: "uuid",
      nullable: false,
    },
    experience_years: {
      type: "integer",
      nullable: false,
      default: 0,
    },
    description: {
      type: "text",
      nullable: false,
    },
    profile_image_url: {
      type: "varchar",
      length: 2048,
      nullable: true,
    },
    created_at: {
      type: "timestamp",
      createDate: true,
    },
    updated_at: {
      type: "timestamp",
      updateDate: true,
    },
  },
  relations: {
    user: {
      type: "one-to-one",
      target: "User",
      joinColumn: { name: "user_id" },
      nullable: false,
      onDelete: "RESTRICT",
    },
  },
  checks: [
    {
      name: "CHK_coaches_experience_years",
      expression: '"experience_years" >= 0',
    },
  ],
});

module.exports = { Coach };
