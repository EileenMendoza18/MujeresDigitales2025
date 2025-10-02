import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class LoginDTO{

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(10)
    password: string;    

}