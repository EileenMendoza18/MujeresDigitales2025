import { IsEmail, IsIn, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";


export class searchProductsUsersDTO {
  @IsNotEmpty()
  @IsString()
  usuario: string;

  @IsNotEmpty()
  @IsString()
  producto: string;
}
