import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Length, Max, Min} from "class-validator";
import * as userEntity from "src/entities/user.entity";

/**
 * @class CreateUserDTO
 * * Data Transfer Object (DTO) para la creación de un nuevo usuario.
 * Contiene validaciones para los campos esenciales de registro.
 */
export class CreateUserDTO{

    // NOMBRE DEL USUARIO
    // - Campo obligatorio
    // - No puede estar vacio
    @ApiProperty({ example: 'Jefferson Pulido', description: 'Nombre completo del usuario' })
    @IsNotEmpty({message: 'El nombre no puede ir vacio'})
    name:string; 
    
    // CORREO ELECTRÓNICO DEL USUARIO
    // - Campo obligatorio
    // - No puede ir vacio
    // - Debe tener formato de correo valido 
    @ApiProperty({ example: 'jp@gmail.com', description: 'Email valido del usuario' })
    @IsNotEmpty({message: 'El email no puede ir vacio'})
    @IsEmail()
    email:string; 

    // CONTRASEÑA DEL USUARIO
    // - Campo obligatorio
    // - No puede ir vacio
    // - Debe tener entre 6 y 15 caracteres
     @ApiProperty({ example: '123456', description: 'Contraseña minima de 6 caracteres y maximo 15' })
    @IsNotEmpty({message: 'La contraseña no puede ir vacia'})
    @Length(6,15, {message: 'La contraseña debe tener un minimo de 6 y maximo de 15 caracteres'})
    password: string;

    // EDAD DEL USUARIO (opcional)
    // - Campo opcional
    // - Debe ser un numero entero (sin decimales)
    // - Edad minima: 18 años
    // - Edad maxima: 100 años

     @ApiProperty({ example: '23', description: 'Edad del usuario' })
    @IsOptional()
    @IsInt({message: 'La edad debe ser un valor numerico'})
    @Min(18,{message: 'La edad minimo permitida es de 18 años'})
    @Max(100,{message: 'La edad maxima permitida es de 100 años'})
    age? : number;

    @ApiProperty({ example: 'admin', description: 'Rol del usuario', required: false })
    @IsOptional()
    @IsString()
    role?: userEntity.Roles;
}