import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedAtToUser1758723456789 implements MigrationInterface {
    name = 'AddCreatedAtToUser1758723456789'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Déjà appliqué manuellement
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_at"`);
    }
}
