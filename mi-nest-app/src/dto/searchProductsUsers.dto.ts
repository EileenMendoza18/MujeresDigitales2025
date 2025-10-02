import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";


export class searchProductsUsersDTO{

    @IsNotEmpty()
    usuario: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(10)
    product: string;
    
    id?: number;

}