import { IsBoolean,  IsIn, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Length,  Min,  } from "class-validator";

export class CreateProductDTO{

  // Nombre del producto
  //   Obligatorio
  //   Debe ser un texto
   

    @IsNotEmpty({ message: 'El nombre es obligatorio'})
    @IsString({ message: 'El nombre debe ser un texto' })
    name:string; 
    
    
    //  Descripcion del producto
    //  - Obligatoria
    //  - Debe ser texto
    //  - Longitud entre 20 y 100 caracteres
  
    @IsNotEmpty({ message: 'La descripcion es obligatoria'})
    @IsString({ message: 'La descripcion debe ser un texto' })
    @Length(20, 100, { message: 'La descripcion debe tener entre 20 y 100 caracteres' })
    description:string; 

    // PRECIO DEL PRODUCTO
    // - Campo obligatorio
    // - Debe ser numerico (maximo 2 decimales)
    // - Debe ser positivo y mayor que 0
    // - Precio minimo permitido: 500 pesos

    
    @IsNotEmpty({ message: 'Debe ingresar un precio obligatorio' })
    @IsNumber({maxDecimalPlaces: 2}, {message: 'El precio debe ser un número con máximo dos decimales'})
    @IsPositive({message: 'El precio debe ser un número positivo mayor que 0'})
    @Min(500,{message: 'El precio minimo permitido para un producto es de: 500 pesos'})
    price: number;

    // CATEGORIA DEL PRODUCTO
    // - Campo obligatorio
    // - Debe ser texto
    // - Longitud entre 3 y 30 caracteres
    // - Debe pertenecer a una de las categorias permitidas:
    //   'Panaderia', 'Pasteleria', 'Alimentos', 'Hogar', 'Otros'

    @IsString({ message: 'La categoría debe ser un texto' })
    @IsNotEmpty({ message: 'La categoría es obligatoria'})
    @Length(3, 30, { message: 'La categoría debe tener entre 3 y 30 caracteres' })
    @IsIn(['Panaderia', 'Pasteleria', 'Alimentos', 'Hogar', 'Otros'], { 
    message: 'La categoría debe ser una de las siguientes: Panaderia, Pasteleria, Alimentos, Hogar, Otros' })
    category: string;

    // MARCA DEL PRODUCTO
    // - Campo obligatorio
    // - Debe ser texto
    // - Longitud entre 4 y 30 caracteres

    @IsString({ message: 'La marca debe ser un texto' })
    @IsNotEmpty({ message: 'La marca es obligatoria' })
    @Length(4, 30, { message: 'La marca debe tener entre 4 y 30 caracteres' })
    marca: string;    

    // ESTADO DEL PRODUCTO
    // - Campo obligatorio(true o false)
    // - Debe ser booleano (true = activo, false = inactivo)
    
    @IsNotEmpty({ message: 'El estado del producto es obligatorio (active debe ser true o false)' })
    @IsBoolean({message: 'El estado del producto debe ser un valor boleano'})
    active: boolean;
    
}