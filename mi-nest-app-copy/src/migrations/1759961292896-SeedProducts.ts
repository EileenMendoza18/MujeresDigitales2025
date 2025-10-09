import { MigrationInterface, QueryRunner } from "typeorm";

// Esta migracion se encarga de insertar datos iniciales (semillas)
// en la tabla product

// Su proposito es llenar la base de datos con productos de ejemplo,
// facilitando las pruebas del modulo de productos sin necesidad de
// crear los registros manualmente desde el sistema.

export class SeedProducts1759961292896 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            INSERT INTO product (name, description, price, category, marca)
            VALUES ('Bizcocho de chocolate', 'Bizcocho dulce a base de chocolate blanco', 5000, 'pasteleria', 'Twinkies'),
            ('Galletas de avena', 'Galletas saludables a base de avena y pasas', 3000, 'pasteleria', 'Oreo'),
            ('Pan integral', 'Pan saludable a base de harina integral', 4000, 'panaderia', 'Bimbo'),
            ('Pan de yuca','Pan tradicional a base de yuca y queso', 3500, 'panaderia', 'Yupi'),
            ('Muffin de arandanos', 'Muffin dulce a base de ar andanos y chocolate blanco', 4500, 'pasteleria', 'Dunkin')`
        ); 
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
        
            DELETE FROM product()
            
        `)
        
    }

}
