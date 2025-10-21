import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/**
 * Alias de tipo para los roles permitidos en la aplicación.
 */
export type Roles = 'admin' | 'user'

/**
 * Enumeración para los roles, proporcionando una referencia más segura.
 */
export enum RolesEnum {
    ADMIN = 'admin',
    USER = 'user'
}
/**
 * @class User
 * * Entidad TypeORM que mapea la tabla 'user' en la base de datos.
 * Contiene la información de los usuarios, incluyendo su rol.
 */
@Entity()
export class User {
    // ID del usuario, clave primaria autoincremental
    @PrimaryGeneratedColumn()
    id:number;

    // Nombre del usuario, campo obligatorio
    @Column({ nullable: false})
    name:string;

    // Correo electrónico del usuario, campo obligatorio y único
    @Column({nullable:false, unique: true})
    email:string;

    // Contraseña del usuario (debe estar hasheada)
    @Column()
    password:string;

    // Edad del usuario, campo opcional
    @Column({nullable:true})
    age?: number;

    // Rol del usuario, con valor por defecto 'user'
    @Column({default: 'user'})
    role: Roles;
}