import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product{

    // ID DEL PRODUCTO
    // - Llave primaria (Primary Key)
    // - Se genera automáticamente de forma incremental

    @PrimaryGeneratedColumn()
    id:number;

    // NOMBRE DEL PRODUCTO
    // - No puede ser nulo
    // - Tipo de dato: texto (string)

    @Column({nullable:false})
    name:string; 
    
    // DESCRIPCION DEL PRODUCTO
    // - No puede ser nulo
    // - Tipo de dato: texto (string)

    @Column({nullable:false}) 
    description:string; 

    // PRECIO DEL PRODUCTO
    // - No puede ser nulo
    // - Tipo de dato: numerico
        
    @Column({nullable:false})
    price: number;

    // CATEGORIA DEL PRODUCTO
    // - No puede ser nulo
    // - Tipo de dato: texto (string)
    
    @Column({nullable:false})  
    category: string;

    // MARCA DEL PRODUCTO
    // - No puede ser nulo
    // - Tipo de dato: texto (string)
    
    @Column({nullable:false})
    marca: string;    

    // ESTADO DEL PRODUCTO
    // - Tipo de dato: booleano
    // - Indica si el producto está activo (true) o inactivo (false)

    @Column({ nullable: true })
    active: boolean;

}