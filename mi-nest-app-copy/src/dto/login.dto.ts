import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length} from "class-validator";

/**
 * @class LoginDTO
 * * Data Transfer Object (DTO) para la autenticación de usuarios (login).
 * Solo requiere email y password con validaciones básicas.
 */
export class LoginDTO{

    // Correo electrónico
    @ApiProperty({ example: 'jp@gmail.com', description: 'Email valido del usuario' })
    @IsNotEmpty({message: 'El email no puede ir vacio'})
    @IsEmail()
    email: string;

    // Contraseña
    @ApiProperty({ example: '123456', description: 'Contraseña minima de 6 caracteres y maximo 15' })
    @IsNotEmpty({message: 'La contraseña no puede ir vacia'})
    @Length(6,15, {message: 'La contraseña debe tener un minimo de 6 y maximo de 15 caracteres'})
    password: string;    

}