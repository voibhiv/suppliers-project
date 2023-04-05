import { MigrationInterface, QueryRunner } from 'typeorm';

export class default1680727543093 implements MigrationInterface {
  name = 'default1680727543093';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying(255) NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
  }
}
