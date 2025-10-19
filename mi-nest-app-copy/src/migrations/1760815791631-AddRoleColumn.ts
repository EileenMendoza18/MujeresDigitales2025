import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleColumn1760815791631 implements MigrationInterface {
    name = 'AddRoleColumn1760815791631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`role\` varchar(255) NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
    }

}
