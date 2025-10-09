import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDTO } from 'src/dto/create-products.dto';
import { UpdateProductDTO } from 'src/dto/update-products.dto';
import { Product } from 'src/entities/product.entity';
import { ILike, Or, Repository } from 'typeorm';

@Injectable()
export class ProductsService {

    constructor(
    
        @InjectRepository(Product)
        private productRepo:Repository<Product>
    
    ){}

    productsAll(){
        return this.productRepo.find();
    }
    
    async productOne(busqueda: string) { // Recibe solo la cadena de búsqueda
        const valorNormalizado = String(busqueda).toLowerCase();
        const busquedaNumerica = parseFloat(valorNormalizado);

        const orConditions = [
            { name: ILike(`%${valorNormalizado}%`) },
            { category: ILike(`%${valorNormalizado}%`) },
            { marca: ILike(`%${valorNormalizado}%`) },
        ];

        
        if (!isNaN(busquedaNumerica)) {

            orConditions.push({ id: busquedaNumerica }as any);
            orConditions.push({ price: busquedaNumerica } as any);

        }

        const productFind = await this.productRepo.find({

            where: orConditions

        });

        if (!productFind || productFind.length === 0) {

            throw new NotFoundException(`Producto no encontrado para el término "${busqueda}"`);

        }

        return productFind;
    }

    create(newProduct: CreateProductDTO){
    
       const productCreated = this.productRepo.create(newProduct);
        return this.productRepo.save(productCreated);

    }



    async update(busqueda:string, updateProduct: UpdateProductDTO){
    
            await this.productRepo.update(busqueda, updateProduct)
            return this.productOne(busqueda);
        }
    
    async softDelete(id: string) {

        const result = await this.productRepo.update(id, {
            active: false, // Cambia el estado a 'eliminado'

        });

        if (result.affected === 0) {
            
            throw new NotFoundException(`Producto con ID ${id} no encontrado`);
        }

        return { message: `Producto con ID ${id} marcado como inactivo` };
    }

}