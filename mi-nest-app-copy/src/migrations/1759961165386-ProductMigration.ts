import { MigrationInterface, QueryRunner } from "typeorm";

// Esta migracion crea la tabla product en la base de datos.
// Define la estructura base que almacenara la informacion de los productos

export class ProductMigration1759961165386 implements MigrationInterface {
    name = 'ProductMigration1759961165386'

    // Crea la tabla product con los campos:
    //  - id: clave primaria autoincremental.
    //  - name: nombre del producto (no nulo).
    //  - description: descripcion del producto (no nulo).
    //  - price: precio del producto (entero, no nulo).
    //  - category: categoria del producto (no nulo).
    //  - marca: marca del producto (no nulo).

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`category\` varchar(255) NOT NULL, \`marca\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    // Se ejecuta al revertir la migracion.
    // Elimina la tabla product si existe en la base de datos.

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`product\``);
    }

}
