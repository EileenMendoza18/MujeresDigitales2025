import { IsEmail, IsNotEmpty, IsNumber, IsPositive, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateUserDTO{
    @IsNotEmpty()
    name:string; 
    
    @IsNotEmpty()
    @IsEmail()
    email:string; 
    
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(10)
    password: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive({message: 'La edad debe ser un número positivo mayor que 0'})
    @Min(18,{message: 'La edad minimo permitida es de 18 años'})
    @Max(100,{message: 'La edad maxima permitida es de 100 años'})
    age : number;
}