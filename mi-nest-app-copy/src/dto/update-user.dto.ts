import { IsEmail, IsInt, IsNotEmpty, IsOptional, Length, Max, Min } from "class-validator";
import { CreateUserDTO } from "./create-user.dto";
import * as userEntity from "src/entities/user.entity";

/**
 * @class UpdateUserDTO
 * @extends CreateUserDTO
 * * Data Transfer Object (DTO) para la actualización de la información de un usuario.
 * Extiende de `CreateUserDTO` para reutilizar las validaciones y añade
 * el campo `role` para permitir la actualización del rol del usuario.
 */
export class UpdateUserDTO {

    // ROL DEL USUARIO
    // - Campo obligatorio
    // - Debe ser un valor válido del enum `userEntity.Roles` (admin | user)
    @IsNotEmpty()
    role: userEntity.Roles;

    @IsOptional()
    name?:string; 
        
    
    @IsOptional()
    @IsEmail()
    email?:string; 
    
    @IsOptional()
    @Length(6,15, {message: 'La contraseña debe tener un minimo de 6 y maximo de 15 caracteres'})
    password?: string;
    
    @IsOptional()
    @IsInt({message: 'La edad debe ser un valor numerico'})
    @Min(18,{message: 'La edad minimo permitida es de 18 años'})
    @Max(100,{message: 'La edad maxima permitida es de 100 años'})
    age? : number;

}