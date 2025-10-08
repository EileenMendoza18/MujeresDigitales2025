import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedUsersValidator1759930977950 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const users = [
            {name: 'Ana Maria', email: 'anamaria@example.com',  password: '123455', age: 25 }, /*password: '12345',  Esto nos dara error por no cumplir con la longitud de la contraseña. 
                                                                                                Al cambiar la longitud a una valida, ya nos dejara hacer la migracion de los usuarios nuevos, 
                                                                                                siguiendo el id desde el ultimo que hayamos creado incluso si ha sido eliminado 
                                                                                                */ 
            {name: 'Luis Gónzalez', email: 'luisgonzalez@example.com', password: '123456', age: 30 },
        ];

        /*[^\s@]+ -- esto busca uno o más caracteres que no sean espacio en blanco (\s) ni @
        @ --Debe haber exactamente un símbolo arroba.
        [^\s@]+ -- Después del @, busca uno o más caracteres válidos (sin espacios ni otro @).
        \. -- Debe haber un punto literal.
        [^\s@]+ -- Finalmente, debe haber uno o más caracteres válidos (sin espacios ni @).
        $ -- Indica el final del texto.
        */
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        for (const user of users) {
            if (user.password.length < 6 || user.password.length > 10) {
                throw new Error(`La contraseña de ${user.email} no cumple con la longitud (6-10 caracteres).`);
            }

            if (!emailRegex.test(user.email)) {
                throw new Error(` El correo ${user.email} no es válido.`);
            }
            await queryRunner.query(
                `INSERT INTO user (name, email, password, age)
                VALUES (?, ?, ?, ?)`,
                [user.name, user.email, user.password, user.age]
            );

        }

    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        
            DELETE FROM user WHERE email IN ('anamaria@example.com', 'luisgonzalez@example.com')
            
        `)
    }

}
