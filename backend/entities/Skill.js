import { EntitySchema } from "typeorm";

const Skill = new EntitySchema({
  name: "Skill",
  tableName: "skills",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    name: {
      type: "varchar",
      length: 50,
      nullable: false,
      unique: true,
    },
    created_at: {
      type: "timestamp",
      createDate: true,
    },
  },
});
export { Skill };
