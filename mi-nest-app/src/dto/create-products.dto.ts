import { IsEmail, IsIn, IsNotEmpty, IsNumber, IsPositive, IsString, Length, MaxLength, Min, MinLength } from "class-validator";

export class CreateProductDTO{
    @IsNotEmpty({ message: 'El nombre es obligatorio'})
    @IsString({ message: 'El nombre debe ser un texto' })
    name:string; 
    
    @IsNotEmpty({ message: 'La descrpcion es obligatoria'})
    @IsString({ message: 'La descripcion debe ser un texto' })
    @Length(20, 100, { message: 'La descripcion debe tener entre 20 y 100 caracteres' })
    description:string; 
    
    @IsNotEmpty({ message: 'Debe ingresar un precio obligatorio' })
    @IsNumber({maxDecimalPlaces: 2}, {message: 'El precio debe ser un número con máximo dos decimales'})
    @IsPositive({message: 'El precio debe ser un número positivo mayor que 0'})
    @Min(500,{message: 'El precio minimo permitido para un prodcuto es de: 500 pesos'})
    price: number;

    @IsString({ message: 'La categoría debe ser un texto' })
    @IsNotEmpty({ message: 'La categoría es obligatoria'})
    @Length(3, 30, { message: 'La categoría debe tener entre 3 y 30 caracteres' })
    @IsIn(['Electrónica', 'Ropa', 'Alimentos', 'Hogar', 'Otros'], { 
    message: 'La categoría debe ser una de las siguientes: Electrónica, Ropa, Alimentos, Hogar, Otros' })
    category: string;

  // Marca
    @IsString({ message: 'La marca debe ser un texto' })
    @IsNotEmpty({ message: 'La marca es obligatoria' })
    @Length(4, 30, { message: 'La marca debe tener entre 4 y 30 caracteres' })
    marca: string;    
    

    
}