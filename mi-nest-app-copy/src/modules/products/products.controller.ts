import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from 'src/dto/create-products.dto';
import { UpdateProductDTO } from 'src/dto/update-products.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ParseUpperTrimPipe } from 'src/common/pipes/parse-uppertrim.pipe';
import { RolesGuard } from '../auth/roles.guard';
import { RolesEnum } from 'src/entities/user.entity';
import { Roles } from '../auth/roles.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * @class ProductsController
 * * Controlador que maneja todas las peticiones HTTP dirigidas a la ruta '/products'.
 * Actúa como la capa de presentación, recibiendo las peticiones del cliente,
 * validando el cuerpo (DTOs) y delegando la lógica de negocio al ProductsService.
 */
@ApiTags('Products')
@Controller('/api/products')
export class ProductsController {

    // INYECCIÓN DE DEPENDENCIAS: ProductsService
    // El controlador depende del servicio para ejecutar cualquier lógica de negocio o DB.
    constructor(private readonly productsService: ProductsService){}  
    
    /**
     * Endpoint para obtener la lista completa de productos.
     * Ruta: `GET /products`
     * @returns Lista de todos los productos.
     */
    @Get()
    @ApiOperation({ summary: 'Obtener todos los productos' })
    @ApiResponse({ status: 200, description: 'Lista de productos retornados desde BD' })
    productAll(){
        return this.productsService.productsAll();
    }

    /**
     * Endpoint para realizar una búsqueda flexible de productos.
     * Ruta: `GET /products/:busqueda`
     * @param busqueda Término de búsqueda (ID, nombre, categoría, etc.).
     * @returns Lista de productos que coinciden con el término de búsqueda.
     */
    @Get(':busqueda')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Obtener el producto por filtro' })
    @ApiResponse({ status: 200, description: 'Producto retornado desde BD' })
    @ApiResponse({ status: 404, description: 'Producto NO encontrado desde BD' })
    // Aplica ParseUpperTrimPipe al parámetro 'busqueda'
    productOne(@Param('busqueda', ParseUpperTrimPipe) busqueda: string){
        return this.productsService.productOne(busqueda);
    }

    /**
     * Endpoint para crear un nuevo producto.
     * Ruta: `POST /products`
     * Protegido: Requiere autenticación JWT y rol de 'admin'.
     * @param body DTO con los datos del nuevo producto.
     * @returns El producto creado.
     */
    @Post()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Crear un producto' })
    @ApiResponse({ status: 201, description: 'Producto creado exitosamente en BD' })
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(RolesEnum.ADMIN)
    create(@Body()body: CreateProductDTO){
        return this.productsService.create(body);
    }

    /**
     * Endpoint para actualizar completamente un producto.
     * Ruta: `PUT /products/:busqueda`
     * Protegido: Requiere autenticación JWT y rol de 'admin'.
     * @param busqueda ID del producto a actualizar.
     * @param body DTO con los nuevos datos del producto.
     * @returns El producto actualizado.
     */
    @Put(':busqueda')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Actualiza un producto' })
    @ApiResponse({ status: 200, description: 'Producto actualizado exitosamente en BD' })
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(RolesEnum.ADMIN)
    update(@Param('busqueda') busqueda:string, @Body() body: UpdateProductDTO){
        return this.productsService.update(busqueda,body)
    }

    /**
     * Endpoint para realizar una eliminación lógica (Soft Delete) de un producto.
     * Ruta: `DELETE /products/:id`
     * Protegido: Requiere autenticación JWT y rol de 'admin'.
     * @param id ID del producto a "eliminar".
     * @returns Mensaje de confirmación.
     */
    @Delete(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Inactiva un producto' })
    @ApiResponse({ status: 200, description: 'Producto inactivado exitosamente en BD' })
    @ApiResponse({ status: 404, description: 'Producto NO encontrado desde BD' })
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(RolesEnum.ADMIN)
    // ParseIntPipe asegura que el 'id' sea un número entero
    remove(@Param('id', ParseIntPipe) id:number){
            // Nota: Se utiliza el nombre 'softDelete' en el servicio para claridad

        return this.productsService.softDelete(id);
    }
}
