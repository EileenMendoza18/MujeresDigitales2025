import { Injectable } from '@nestjs/common';

export type IdProducto = {id : number, name: string, description: string, 
    price: number, category: string, marca: string}; 


@Injectable()
export class ProductoService {

    private productos: IdProducto []= [

        {id:1, name: 'ponimalta', description:'bebida fria y refrescante', price: 2500, category: 'bebidas', marca: 'postobon'},
        {id:2, name: 'papas de tomate', description:'snack de papas crujientes sabor a tomate', price: 2000, category: 'papas', marca: 'productos maria'},
        {id:3, name: 'frasco de cafe', description:'para tus bebidas calientes por la mañana o noche que te llenan de energia', price: 5000, category: 'bebida', marca: 'nescafe'}

    ]

}
