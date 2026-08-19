const { EntitySchema } = require("typeorm");

const CourseBooking = new EntitySchema({
  name: "CourseBooking",
  tableName: "course_bookings",
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
    course_id: {
      type: "uuid",
      nullable: false,
    },
    created_at: {
      type: "timestamp",
      createDate: true,
    },
    cancelled_at: {
      type: "timestamp",
      nullable: true,
      default: null,
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
    course: {
      type: "many-to-one",
      target: "Course",
      joinColumn: { name: "course_id" },
      nullable: false,
      onDelete: "RESTRICT",
    },
  },
});

module.exports = { CourseBooking };
