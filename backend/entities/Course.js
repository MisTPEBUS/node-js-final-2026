import { EntitySchema } from "typeorm";

const Course = new EntitySchema({
  name: "Course",
  tableName: "courses",
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
    skill_id: {
      type: "uuid",
      nullable: false,
    },
    name: {
      type: "varchar",
      length: 100,
      nullable: false,
    },
    description: {
      type: "text",
      nullable: false,
    },
    start_at: {
      type: "timestamp",
      nullable: false,
    },
    end_at: {
      type: "timestamp",
      nullable: false,
    },
    max_participants: {
      type: "integer",
      nullable: false,
    },
    meeting_url: {
      type: "varchar",
      length: 2048,
      nullable: false,
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
      type: "many-to-one",
      target: "User",
      joinColumn: { name: "user_id" },
      nullable: false,
      onDelete: "RESTRICT",
    },
    skill: {
      type: "many-to-one",
      target: "Skill",
      joinColumn: { name: "skill_id" },
      nullable: false,
      onDelete: "RESTRICT",
    },
  },
  indices: [
    {
      name: "IDX_courses_user_start_at",
      columns: ["user_id", "start_at"],
    },
    {
      name: "IDX_courses_time_range",
      columns: ["start_at", "end_at"],
    },
    {
      name: "IDX_courses_skill_id",
      columns: ["skill_id"],
    },
  ],
  checks: [
    {
      name: "CHK_courses_max_participants",
      expression: '"max_participants" >= 0',
    },
  ],
});

export { Course };
