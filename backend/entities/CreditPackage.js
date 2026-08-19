const { EntitySchema } = require("typeorm");

const CreditPackage = new EntitySchema({
  name: "CreditPackage",
  tableName: "credit_packages",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    name: {
      type: "varchar",
      length: 100,
      nullable: false,
      unique: true,
    },
    credit_amount: {
      type: "integer",
      nullable: false,
    },
    price: {
      type: "integer",
      nullable: false,
    },
    created_at: {
      type: "timestamp",
      createDate: true,
    },
  },
  checks: [
    {
      name: "CHK_credit_packages_credit_amount",
      expression: '"credit_amount" >= 0',
    },
    {
      name: "CHK_credit_packages_price",
      expression: '"price" >= 0',
    },
  ],
});

module.exports = { CreditPackage };
