import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParseUpperTrimPipe } from 'src/common/pipes/parse-uppertrim.pipe';
import { CreateProductDTO } from 'src/dto/create-products.dto';
import { UpdateProductDTO } from 'src/dto/update-products.dto';
import { Product } from 'src/entities/product.entity';
import { ILike,  Repository } from 'typeorm';

// Este servicio maneja toda la logica relacionada con la entidad Product.
// Proporciona metodos para:
//  - Obtener todos los productos.
//  - Buscar productos por diferentes criterios.
//  - Crear nuevos productos.
//  - Actualizar productos existentes.
//  - Realizar una eliminacion logica (soft delete).
// Utiliza TypeORM para comunicarse con la base de datos mediante un repositorio.

@Injectable()
export class ProductsService {

    // Inyección del repositorio de TypeORM para la entidad Product.
     // Permite el acceso directo a la base de datos (DB) para todas las operaciones.

    
    constructor(
    
        @InjectRepository(Product)
        private productRepo:Repository<Product>,
    
        private readonly parseUpperPipe: ParseUpperTrimPipe,
    ){}


    
     // METODO: productsAll()
    
    // Devuelve una lista con todos los productos registrados
    // en la base de datos, sin filtros ni condiciones.

    productsAll(){
        return this.productRepo.find();
    }

    // METODO: productOne(busqueda)
    // Objetivo: Realizar una búsqueda flexible utilizando múltiples campos (OR logic).
    // El término de búsqueda puede coincidir con: ID, precio, nombre, categoría, marca o estado 'activo'/'inactivo'.
    
    async productOne(busqueda: string) { 

        // 1. Preprocesamiento del término de búsqueda
        const valorNormalizado = await this.parseUpperPipe.transform(busqueda);
        const busquedaNumerica = Number(valorNormalizado);

        // 2. Definición de las condiciones OR
        // Se utiliza un array de objetos en el 'where' de TypeORM, lo cual
        // es interpretado como una operación OR. Se usa 'any[]' para permitir la
        // inclusión de objetos parciales con 'as any' en los campos numéricos.
        const orConditions: any[] =[
            // Búsqueda de texto (coincidencia parcial, insensible a mayúsculas)
            { name: ILike(`%${valorNormalizado}%`) },
            { category: ILike(`%${valorNormalizado}%`) },
            { marca: ILike(`%${valorNormalizado}%`) }
        ];
        // 3. Filtro por estado activo/inactivo (búsqueda de cadenas 'activo'/'inactivo')
        if (valorNormalizado === 'ACTIVO') {
            orConditions.push({ active: true });
        } else if (valorNormalizado === 'INACTIVO') {
            orConditions.push({ active: false });
    }

        // 4. Filtro por valores numéricos (ID y Price)
        if (!isNaN(busquedaNumerica)) {
            // Se usa 'as any' para evitar el error de tipado (TS2559) con TypeORM
            // al construir condiciones parciales en un array.
            orConditions.push({ id: busquedaNumerica }as any);
            orConditions.push({ price: busquedaNumerica } as any);

        }

        // 5. Ejecución de la búsqueda
        const productFind = await this.productRepo.find({
            // Aplica todas las condiciones como OR
            where: orConditions

        });

       // 6. Manejo de excepciones
        if (!productFind || productFind.length === 0) {

            throw new NotFoundException(`Producto no encontrado para el término "${busqueda}"`);

        }

        return productFind;
    }

    // MÉTODO: create(newProduct)
     // Objetivo: Crear y persistir un nuevo producto.
    // Utiliza el DTO para asegurar la validación de los datos de entrada.
    create(newProduct: CreateProductDTO){
        // 1. Crea una instancia de la entidad Product (no guardada aún)
       const productCreated = this.productRepo.create(newProduct);
       // 2. Guarda la instancia en la base de datos 
       return this.productRepo.save(productCreated);

    }


    // MÉTODO: update(busqueda, updateProduct)
    // Objetivo: Actualizar los campos de un producto específico.
    async update(busqueda:string, updateProduct: UpdateProductDTO){
            // 1. Ejecuta la actualización en la DB usando el ID (busqueda) y el DTO
            await this.productRepo.update(busqueda, updateProduct)
            // 2. Devuelve el producto actualizado utilizando el método de búsqueda
            return this.productOne(busqueda);
        }
    
    // MÉTODO: softDelete(id)
    // Objetivo: Realizar una eliminación lógica (soft delete) cambiando el campo 'active' a 'false'.
    // No elimina el registro físicamente de la base de datos.
    
    async softDelete(id: number) {

        // 1. Actualiza el campo 'active'
        const result = await this.productRepo.update(id, {
            active: false, // Cambia el estado a 'inactivo'

        });
        // 2. Manejo de excepciones (si affected es 0, el ID no existía)
        if (result.affected === 0) {

            throw new NotFoundException(`Producto con ID ${id} no encontrado`);
        }

        return { message: `Producto con ID ${id} marcado como inactivo` };
    }

}