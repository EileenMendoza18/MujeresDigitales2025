import { IsEmail, IsInt, IsNotEmpty, IsOptional, Length, Max, Min} from "class-validator";

export class CreateUserDTO{
    @IsNotEmpty({message: 'El nombre no puede ir vacio'})
    name:string; 
    
    @IsNotEmpty({message: 'El email no puede ir vacio'})
    @IsEmail()
    email:string; 
    
    @IsNotEmpty({message: 'La contraseña no puede ir vacia'})
    @Length(6,15, {message: 'La contraseña debe tener un minimo de 6 y maximo de 15 caracteres'})
    password: string;

    @IsOptional()
    @IsInt({message: 'La edad debe ser un valor numerico'})
    @Min(18,{message: 'La edad minimo permitida es de 18 años'})
    @Max(100,{message: 'La edad maxima permitida es de 100 años'})
    age? : number;
}