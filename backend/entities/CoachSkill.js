import { EntitySchema } from "typeorm";

const CoachSkill = new EntitySchema({
  name: "CoachSkill",
  tableName: "coach_skills",
  columns: {
    coach_id: {
      type: "uuid",
      primary: true,
    },
    skill_id: {
      type: "uuid",
      primary: true,
    },
  },
  relations: {
    coach: {
      type: "many-to-one",
      target: "Coach",
      joinColumn: { name: "coach_id" },
      nullable: false,
      onDelete: "CASCADE",
    },
    skill: {
      type: "many-to-one",
      target: "Skill",
      joinColumn: { name: "skill_id" },
      nullable: false,
      onDelete: "CASCADE",
    },
  },
  indices: [
    {
      name: "IDX_coach_skills_skill_id",
      columns: ["skill_id"],
    },
  ],
});

export { CoachSkill };
