import { MigrationInterface, QueryRunner } from "typeorm";

export class default1679632124837 implements MigrationInterface {
    name = 'default1679632124837'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company_user" ADD "active" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company_user" DROP COLUMN "active"`);
    }

}
