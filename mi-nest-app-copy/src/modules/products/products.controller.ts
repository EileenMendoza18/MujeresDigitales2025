import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from 'src/dto/create-products.dto';
import { UpdateProductDTO } from 'src/dto/update-products.dto';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService){}  
    
    @Get()
    productAll(){
        return this.productsService.productsAll();
    }

    @Get(':busqueda')

    productOne(@Param('busqueda') busqueda: string){
        return this.productsService.productOne(busqueda);
    }

    @Post()
    create(@Body()body: CreateProductDTO){
        return this.productsService.create(body);
    }

    @Put(':busqueda')
    update(@Param('busqueda') busqueda:string, @Body() body: UpdateProductDTO){
        return this.productsService.update(busqueda,body)
    }
    
    @Delete(':busqueda')
    
    remove(@Param('busqueda') busqueda:string){
        return this.productsService.softDelete(busqueda);
    }
}
