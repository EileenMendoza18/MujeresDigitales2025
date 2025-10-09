import { MigrationInterface, QueryRunner } from "typeorm";

// Esta migracion se encarga de insertar datos iniciales (semilla o seed)
// en la tabla user, su objetivo es precargar usuarios base que 
// puedan utilizarse para pruebas o configuraciones iniciales del sistema
export class SeedUsers1759757005744 implements MigrationInterface {

    // Este metodo se ejecuta cuando se aplica la migracion
    // Inserta dos registros en la tabla user con datos de ejemplo.
    public async up(queryRunner: QueryRunner): Promise<void> {
    
        await queryRunner.query(`
            
            INSERT INTO user(name, email, password, age)
            VALUES('Ana López', 'ana@example.com', '12345', 25),
            ('Luis Gómez', 'luis@example.com', '12345', 30)
        
            
        `)

    }

    // Este metodo revierte los cambios realizados por el metodo up()
    // En este caso, elimina los registros insertados previamente 
    // usando el correo electronico como criterio de identificacion

    public async down(queryRunner: QueryRunner): Promise<void> {
    
        await queryRunner.query(`
        
            DELETE FROM user WHERE email IN ('ana@example.com', 'luis@example.com')
            
        `)
    
    }

}
