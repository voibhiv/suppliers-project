import { MigrationInterface, QueryRunner } from "typeorm";

export class default1679632715904 implements MigrationInterface {
    name = 'default1679632715904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "supplier_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid, "supplierId" uuid, CONSTRAINT "PK_1fa5a1933561a9d06eb8ca1f6a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "company_user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "company_user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "company_user" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "supplier_user" ADD CONSTRAINT "FK_48ad13ce3465799011f61ad0854" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "supplier_user" ADD CONSTRAINT "FK_64cfd3ac5b73794535c218ecc4a" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supplier_user" DROP CONSTRAINT "FK_64cfd3ac5b73794535c218ecc4a"`);
        await queryRunner.query(`ALTER TABLE "supplier_user" DROP CONSTRAINT "FK_48ad13ce3465799011f61ad0854"`);
        await queryRunner.query(`ALTER TABLE "company_user" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "company_user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "company_user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`DROP TABLE "supplier_user"`);
    }

}
