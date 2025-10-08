import { IsEmail, IsNotEmpty, Length} from "class-validator";

export class LoginDTO{

    @IsNotEmpty({message: 'El email no puede ir vacio'})
    @IsEmail()
    email: string;

    @IsNotEmpty({message: 'La contraseña no puede ir vacia'})
    @Length(6,15, {message: 'La contraseña debe tener un minimo de 6 y maximo de 15 caracteres'})
    password: string;    

}