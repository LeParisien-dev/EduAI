import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1758705072866 implements MigrationInterface {
    name = 'Migrations1758705072866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "course" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_2481291d5c97aaff5cf3ce5359c"`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "createdById" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_2481291d5c97aaff5cf3ce5359c" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_2481291d5c97aaff5cf3ce5359c"`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "createdById" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_2481291d5c97aaff5cf3ce5359c" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "created_at"`);
    }

}
