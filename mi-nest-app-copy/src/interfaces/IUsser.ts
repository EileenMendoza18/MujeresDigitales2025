import { Roles } from "src/entities/user.entity";

/**
 * @type IUser
 * * Interfaz de tipo para la estructura de datos de un Usuario.
 */
export type IUser = {
    id:number, 
    name?:string, 
    email?:string, 
    password?: string, 
    age?: number,
    role?: Roles,
};
