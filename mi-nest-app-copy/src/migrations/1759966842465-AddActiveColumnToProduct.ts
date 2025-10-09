import { MigrationInterface, QueryRunner } from "typeorm";

// Esta migracion tiene como proposito modificar la estructura
// de la tabla product, agregando una nueva columna llamada active.
//
// Dicha columna permitira controlar si un producto esta activo o inactivo
// dentro del sistema.


export class AddActiveColumnToProduct1759966842465 implements MigrationInterface {
    
    // Nombre interno de la migracion. 
    // TypeORM lo utiliza para identificarla y evitar duplicados
    
    name = 'AddActiveColumnToProduct1759966842465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`active\` tinyint NULL`);
    }

    // En este caso, se utiliza una instruccion SQL para alterar la
    // tabla product y agregar una nueva columna llamada active.


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`active\``);
    }

}
