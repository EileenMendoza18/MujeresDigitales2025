import { Injectable, NotFoundException } from '@nestjs/common';
import { IProducts } from 'src/interfaces';

@Injectable()
export class ProductsService {

    private products:IProducts[]=[

        {id: 1, name: "Bizcocho de chocolate", description: "Bizcocho dulce a base de chocolate blanco", price: 5000, category: "pasteleria", marca:"Twinkies" },
        {id: 2, name: "Galletas de avena", description: "Galletas saludables a base de avena y pasas", price: 3000, category: "pasteleria", marca:"Oreo" },
        {id: 3, name: "Pan integral", description: "Pan saludable a base de harina integral", price: 4000, category: "panaderia", marca:"Bimbo" },
        {id: 4, name: "Pan de yuca", description: "Pan tradicional a base de yuca y queso", price: 3500, category: "panaderia", marca:"Yupi" },
        {id: 5, name: "Muffin de arandanos", description: "Muffin dulce a base de ar andanos y chocolate blanco", price: 4500, category: "pasteleria", marca:"Dunkin" },
    ]

    productsAll(): IProducts[]{
        return this.products;
    }

    productsOne(busqueda:string): IProducts[]{

        const valorNormalizado= String(busqueda).toLowerCase();

        const productFind= this.products.filter((product) =>
        
            String(product.id).toLowerCase()===valorNormalizado ||
            String(product.name).toLowerCase()===valorNormalizado ||
            String(product.price).toLowerCase()===valorNormalizado ||
            String(product.category).toLowerCase()===valorNormalizado ||
            String(product.marca).toLowerCase()===valorNormalizado 
        );
        if (!productFind.length) {
            throw new NotFoundException(`Producto no encontrado, intente nuevamente`);
        }
        return productFind;
    }

    create(product:Omit<IProducts, 'id'>): IProducts{
    
        const newId=this.products.length >0
            ? this.products[this.products.length -1].id + 1
            : 1;
            
        const newProduct: IProducts={
    
                id:newId, ...product
            }
    
            this.products.push(newProduct);
            return newProduct;
    }


    update(busqueda:string, newProduct:Omit<IProducts, 'id'>): IProducts{
    

        const valorNormalizado= String(busqueda).toLowerCase();

        const product= this.products.find((product) =>
        
            String(product.id).toLowerCase()===valorNormalizado ||
            String(product.name).toLowerCase()===valorNormalizado ||
            String(product.price).toLowerCase()===valorNormalizado ||
            String(product.category).toLowerCase()===valorNormalizado ||
            String(product.marca).toLowerCase()===valorNormalizado 
        );
        if (!product) throw new NotFoundException(`Producto no encontrado, intente nuevamente`);
        Object.assign(product,newProduct);
        return product;

    }
    
    remove(busqueda: string) {
    

        const valorNormalizado= String(busqueda).toLowerCase();

        const product= this.products.findIndex((product) =>
        
            String(product.id).toLowerCase()===valorNormalizado ||
            String(product.name).toLowerCase()===valorNormalizado ||
            String(product.category).toLowerCase()===valorNormalizado ||
            String(product.marca).toLowerCase()===valorNormalizado 
        );
        this.products.splice(product,1)
        return{delete:true}
    }

}