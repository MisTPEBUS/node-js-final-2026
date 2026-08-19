const { EntitySchema } = require("typeorm");

const User = new EntitySchema({
  name: "User",
  tableName: "users",
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
    },
    email: {
      type: "varchar",
      length: 320,
      nullable: false,
      unique: true,
    },
    password: {
      type: "varchar",
      length: 255,
      nullable: false,
      select: false,
    },
    role: {
      type: "varchar",
      length: 20,
      nullable: false,
      default: "USER",
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
});

module.exports = { User };
