const { EntitySchema } = require("typeorm");

const CreditPurchase = new EntitySchema({
  name: "CreditPurchase",
  tableName: "credit_purchases",
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
    credit_package_id: {
      type: "uuid",
      nullable: false,
    },

    purchased_credits: {
      type: "integer",
      nullable: false,
    },
    price_paid: {
      type: "integer",
      nullable: false,
    },
    purchase_at: {
      type: "timestamp",
      createDate: true,
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
    credit_package: {
      type: "many-to-one",
      target: "CreditPackage",
      joinColumn: { name: "credit_package_id" },
      nullable: false,
      onDelete: "RESTRICT",
    },
  },
});

module.exports = { CreditPurchase };
