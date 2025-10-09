import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from 'src/dto/create-products.dto';
import { UpdateProductDTO } from 'src/dto/update-products.dto';

// Controlador que maneja todas las peticiones HTTP dirigidas a la ruta '/products'.
//  Actúa como la capa de presentación, recibiendo las peticiones del cliente,
//  validando el cuerpo (DTOs) y delegando la lógica de negocio al ProductsService.
 
@Controller('products')
export class ProductsController {

    // INYECCIÓN DE DEPENDENCIAS: ProductsService
    // El controlador depende del servicio para ejecutar cualquier lógica de negocio o DB.
    constructor(private readonly productsService: ProductsService){}  
    
    // MÉTODO: GET /products
    // Objetivo: Obtener la lista completa de productos.
    @Get()
    productAll(){
        return this.productsService.productsAll();
    }

    // MÉTODO: GET /products/:busqueda
    // Objetivo: Búsqueda flexible de productos por un término único.
    // El parámetro 'busqueda' se extrae de la URL y se pasa al servicio,
    // donde se aplica la lógica OR (ID, precio, nombre, categoría, etc.).

    @Get(':busqueda')

    productOne(@Param('busqueda') busqueda: string){
        return this.productsService.productOne(busqueda);
    }

    // MÉTODO: POST /products
    // Objetivo: Crear un nuevo producto.
    // Utiliza @Body() y CreateProductDTO para validar los datos de entrada
    // antes de pasarlos al servicio.

    @Post()
    create(@Body()body: CreateProductDTO){
        return this.productsService.create(body);
    }

    // MÉTODO: PUT /products/:busqueda
    // Objetivo: Actualizar completamente un producto por su ID.
    // Utiliza @Param() para obtener el ID del producto a actualizar
    // y @Body() con UpdateProductDTO para obtener los nuevos datos.
    @Put(':busqueda')
    update(@Param('busqueda') busqueda:string, @Body() body: UpdateProductDTO){
        return this.productsService.update(busqueda,body)
    }

    // MÉTODO: DELETE /products/:id
    // Objetivo: Realizar una eliminación lógica (Soft Delete).
    // En lugar de borrar el registro de la DB, el servicio cambia el campo 'active' a 'false'.
    
    @Delete(':busqueda')
    
    remove(@Param('busqueda') busqueda:string){
            // Nota: Se utiliza el nombre 'softDelete' en el servicio para claridad

        return this.productsService.softDelete(busqueda);
    }
}
