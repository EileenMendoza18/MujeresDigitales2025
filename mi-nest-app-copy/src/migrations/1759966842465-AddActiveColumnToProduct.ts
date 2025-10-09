import { MigrationInterface, QueryRunner } from "typeorm";

export class AddActiveColumnToProduct1759966842465 implements MigrationInterface {
    name = 'AddActiveColumnToProduct1759966842465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`active\` tinyint NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`active\``);
    }

}
