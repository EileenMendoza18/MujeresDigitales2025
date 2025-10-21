import { IsNotEmpty } from "class-validator";
import { CreateUserDTO } from "./create-user.dto";
import * as userEntity from "src/entities/user.entity";

/**
 * @class UpdateUserDTO
 * @extends CreateUserDTO
 * * Data Transfer Object (DTO) para la actualización de la información de un usuario.
 * Extiende de `CreateUserDTO` para reutilizar las validaciones y añade
 * el campo `role` para permitir la actualización del rol del usuario.
 */
export class UpdateUserDTO extends (CreateUserDTO){

    // ROL DEL USUARIO
    // - Campo obligatorio
    // - Debe ser un valor válido del enum `userEntity.Roles` (admin | user)
    @IsNotEmpty()
    role: userEntity.Roles;

}