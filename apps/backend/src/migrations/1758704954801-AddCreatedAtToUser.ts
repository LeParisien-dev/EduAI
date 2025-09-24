import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedAtToUser17587XXXXXXXX implements MigrationInterface {
    name = 'AddCreatedAtToUser17587XXXXXXXX'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Déjà appliqué manuellement dans Neon
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_at"`);
    }
}
