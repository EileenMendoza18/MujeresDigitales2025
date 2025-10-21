import { IsEmail, IsNotEmpty, Length} from "class-validator";

/**
 * @class LoginDTO
 * * Data Transfer Object (DTO) para la autenticación de usuarios (login).
 * Solo requiere email y password con validaciones básicas.
 */
export class LoginDTO{

    // Correo electrónico
    @IsNotEmpty({message: 'El email no puede ir vacio'})
    @IsEmail()
    email: string;

    // Contraseña
    @IsNotEmpty({message: 'La contraseña no puede ir vacia'})
    @Length(6,15, {message: 'La contraseña debe tener un minimo de 6 y maximo de 15 caracteres'})
    password: string;    

}