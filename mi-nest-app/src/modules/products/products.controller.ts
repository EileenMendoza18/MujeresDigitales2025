import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from 'src/dto/create-products.dto';
import { UpdateProductDTO } from 'src/dto/update-products.dto';

@Controller('products')
export class ProductsController {

    constructor(private readonly ProductsService: ProductsService){}  
    
    @Get()
    productAll(){
        return this.ProductsService.productsAll();
    }

    @Get(':busqueda')

    productOne(@Param('busqueda') busqueda: string ){
        return this.ProductsService.productsOne(busqueda);
    }

    @Post()
    create(@Body()body: CreateProductDTO){
        return this.ProductsService.create(body);
    }

    @Put(':busqueda')
    update(@Param('busqueda') busqueda:string, @Body() body: UpdateProductDTO){
        return this.ProductsService.update(('busqueda'),body)
    }
    
    @Delete(':busqueda')
    
    remove(@Param('busqueda') busqueda:string){
        return this.ProductsService.remove(('busqueda'));
    }
}
