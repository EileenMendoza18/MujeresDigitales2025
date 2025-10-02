import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { ProductoUsuarioService } from './producto-usuario.service';
import { IUProductsUsers } from 'src/interfaces/IUProductsUsers';
import { searchProductsUsersDTO } from 'src/dto/searchProductsUsers.dto';
 @Controller('producto-usuario')
export class ProductoUsuarioController {

    constructor (
        private readonly productsUsuarioService:ProductoUsuarioService){}
    
    
    @Get()
    productUsersAll(){
            return this.productsUsuarioService.productsUsersAll();
        }
    
    @Get(':busqueda')
    
    productsUsersOne(@Param('busqueda') busqueda: string ){
            return this.productsUsuarioService.productsUsersOne(busqueda);
        }
    
    @Post()
        create(@Body()body:  Omit<IUProductsUsers, 'id'>){
            return this.productsUsuarioService.create(body);
        }
    
    @Put()
    update(
        @Query('usuario') usuario: string, 
        @Query('product') product: string, 
        @Body() body:   Omit<IUProductsUsers, 'id'>){
            const busqueda: searchProductsUsersDTO = { usuario, product };
            return this.productsUsuarioService.update(busqueda,body)
        }
        
    // @Delete()
        
    //     remove(@Query('usuario') usuario: string, @Query('product') product: string){
    //         const busqueda: searchProductsUsersDTO = { usuario, product };
    //         return this.productsUsuarioService.remove(busqueda);
    //     }

}
