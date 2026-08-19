/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class AddConstraints1787124758300 {
    name = 'AddConstraints1787124758300'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`CREATE INDEX "IDX_credit_purchases_user_purchase_at" ON "credit_purchases"  ("user_id", "purchase_at") `);
        await queryRunner.query(`CREATE INDEX "IDX_coach_skills_skill_id" ON "coach_skills"  ("skill_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_course_bookings_user_cancelled" ON "course_bookings"  ("user_id", "cancelled_at") `);
        await queryRunner.query(`CREATE INDEX "IDX_course_bookings_course_cancelled" ON "course_bookings"  ("course_id", "cancelled_at") `);
        await queryRunner.query(`CREATE INDEX "IDX_course_bookings_course_created_at" ON "course_bookings"  ("course_id", "created_at") `);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "CHK_users_role" CHECK ("role" IN ('USER', 'COACH'))`);
        await queryRunner.query(`ALTER TABLE "credit_packages" ADD CONSTRAINT "CHK_credit_packages_credit_amount" CHECK ("credit_amount" >= 0)`);
        await queryRunner.query(`ALTER TABLE "credit_packages" ADD CONSTRAINT "CHK_credit_packages_price" CHECK ("price" >= 0)`);
        await queryRunner.query(`ALTER TABLE "credit_purchases" ADD CONSTRAINT "CHK_credit_purchases_purchased_credits" CHECK ("purchased_credits" >= 0)`);
        await queryRunner.query(`ALTER TABLE "credit_purchases" ADD CONSTRAINT "CHK_credit_purchases_price_paid" CHECK ("price_paid" >= 0)`);
        await queryRunner.query(`ALTER TABLE "coaches" ADD CONSTRAINT "CHK_coaches_experience_years" CHECK ("experience_years" >= 0)`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "CHK_courses_max_participants" CHECK ("max_participants" >= 0)`);
        await queryRunner.query(`ALTER TABLE "course_bookings" ADD CONSTRAINT "UQ_course_bookings_user_course" UNIQUE ("user_id", "course_id")`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "course_bookings" DROP CONSTRAINT "UQ_course_bookings_user_course"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "CHK_courses_max_participants"`);
        await queryRunner.query(`ALTER TABLE "coaches" DROP CONSTRAINT "CHK_coaches_experience_years"`);
        await queryRunner.query(`ALTER TABLE "credit_purchases" DROP CONSTRAINT "CHK_credit_purchases_price_paid"`);
        await queryRunner.query(`ALTER TABLE "credit_purchases" DROP CONSTRAINT "CHK_credit_purchases_purchased_credits"`);
        await queryRunner.query(`ALTER TABLE "credit_packages" DROP CONSTRAINT "CHK_credit_packages_price"`);
        await queryRunner.query(`ALTER TABLE "credit_packages" DROP CONSTRAINT "CHK_credit_packages_credit_amount"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "CHK_users_role"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_course_bookings_course_created_at"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_course_bookings_course_cancelled"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_course_bookings_user_cancelled"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_coach_skills_skill_id"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_credit_purchases_user_purchase_at"`);
    }
}
