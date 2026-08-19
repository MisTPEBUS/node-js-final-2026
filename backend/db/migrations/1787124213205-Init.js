/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Init1787124213205 {
    name = 'Init1787124213205'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(320) NOT NULL, "password" character varying(255) NOT NULL, "role" character varying(20) NOT NULL DEFAULT 'USER', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "skills" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_81f05095507fd84aa2769b4a522" UNIQUE ("name"), CONSTRAINT "PK_0d3212120f4ecedf90864d7e298" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "credit_packages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "credit_amount" integer NOT NULL, "price" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_131f34314d8d9d4ae371324b8c0" UNIQUE ("name"), CONSTRAINT "PK_c10750b5b0638b06330b0c09bfd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "credit_purchases" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "credit_package_id" uuid NOT NULL, "purchased_credits" integer NOT NULL, "price_paid" integer NOT NULL, "purchase_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_89d96f2901d625d5879c1bc6f47" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "coaches" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "experience_years" integer NOT NULL DEFAULT '0', "description" text NOT NULL, "profile_image_url" character varying(2048), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_bd9923ac72efde2d5895e118fa" UNIQUE ("user_id"), CONSTRAINT "PK_eddaece1a1f1b197fa39e6864a1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "coach_skills" ("coach_id" uuid NOT NULL, "skill_id" uuid NOT NULL, CONSTRAINT "PK_2bd49bed05a41b002b443729349" PRIMARY KEY ("coach_id", "skill_id"))`);
        await queryRunner.query(`CREATE TABLE "courses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "skill_id" uuid NOT NULL, "name" character varying(100) NOT NULL, "description" text NOT NULL, "start_at" TIMESTAMP NOT NULL, "end_at" TIMESTAMP NOT NULL, "max_participants" integer NOT NULL, "meeting_url" character varying(2048) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_courses_user_start_at" ON "courses"  ("user_id", "start_at") `);
        await queryRunner.query(`CREATE INDEX "IDX_courses_time_range" ON "courses"  ("start_at", "end_at") `);
        await queryRunner.query(`CREATE INDEX "IDX_courses_skill_id" ON "courses"  ("skill_id") `);
        await queryRunner.query(`CREATE TABLE "course_bookings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "course_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "cancelled_at" TIMESTAMP, CONSTRAINT "PK_d8f8109ef28a5fb4bbda2e5d562" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "credit_purchases" ADD CONSTRAINT "FK_e4b42966827f8e07f9880e78310" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "credit_purchases" ADD CONSTRAINT "FK_903582a75a65e42a45ee791d84f" FOREIGN KEY ("credit_package_id") REFERENCES "credit_packages"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coaches" ADD CONSTRAINT "FK_bd9923ac72efde2d5895e118fa8" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coach_skills" ADD CONSTRAINT "FK_ae4a948889774a37fea143a4cb2" FOREIGN KEY ("coach_id") REFERENCES "coaches"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coach_skills" ADD CONSTRAINT "FK_7b390700c43d3db784b14555409" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_a4396a5235f159ab156a6f8b603" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_35e285c3f9c377580f69b01e917" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_bookings" ADD CONSTRAINT "FK_db356d30e68c23856ea0a6cd79d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_bookings" ADD CONSTRAINT "FK_0fa3cabc0a327c50557f304c181" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "course_bookings" DROP CONSTRAINT "FK_0fa3cabc0a327c50557f304c181"`);
        await queryRunner.query(`ALTER TABLE "course_bookings" DROP CONSTRAINT "FK_db356d30e68c23856ea0a6cd79d"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_35e285c3f9c377580f69b01e917"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_a4396a5235f159ab156a6f8b603"`);
        await queryRunner.query(`ALTER TABLE "coach_skills" DROP CONSTRAINT "FK_7b390700c43d3db784b14555409"`);
        await queryRunner.query(`ALTER TABLE "coach_skills" DROP CONSTRAINT "FK_ae4a948889774a37fea143a4cb2"`);
        await queryRunner.query(`ALTER TABLE "coaches" DROP CONSTRAINT "FK_bd9923ac72efde2d5895e118fa8"`);
        await queryRunner.query(`ALTER TABLE "credit_purchases" DROP CONSTRAINT "FK_903582a75a65e42a45ee791d84f"`);
        await queryRunner.query(`ALTER TABLE "credit_purchases" DROP CONSTRAINT "FK_e4b42966827f8e07f9880e78310"`);
        await queryRunner.query(`DROP TABLE "course_bookings"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_courses_skill_id"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_courses_time_range"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_courses_user_start_at"`);
        await queryRunner.query(`DROP TABLE "courses"`);
        await queryRunner.query(`DROP TABLE "coach_skills"`);
        await queryRunner.query(`DROP TABLE "coaches"`);
        await queryRunner.query(`DROP TABLE "credit_purchases"`);
        await queryRunner.query(`DROP TABLE "credit_packages"`);
        await queryRunner.query(`DROP TABLE "skills"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
