import { MigrationInterface, QueryRunner } from "typeorm";

export class default1679691932487 implements MigrationInterface {
    name = 'default1679691932487'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "cpf" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "cnpj" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "cnpj"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "cpf"`);
    }

}
