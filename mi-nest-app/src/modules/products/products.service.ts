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
    
    // src/producto-usuario/producto-usuario.service.ts

// ... (otros métodos) ...

remove(busqueda: searchProductsUsersDTO) {
    
    // 1. CONSOLIDAR y encontrar el USUARIO (Permite buscar por email o nombre)
    const allUsers = [...this.usersService.findAll(), ...this.users].filter(u => u != null);
    const user = allUsers.find(u =>
        u.email.toLowerCase() === busqueda.usuario.toLowerCase() ||
        u.name.toLowerCase() === busqueda.usuario.toLowerCase()
    );

    if (!user) {
        // Lanza 401 si el usuario no existe.
        throw new UnauthorizedException("Este usuario no existe");
    }
    
    // 2. CONSOLIDAR y encontrar el PRODUCTO (Valida que el producto exista)
    const products = [...this.productsService.productsAll(), ...this.products].filter(p => p != null);
    const product = products.find(p =>
        p.name.toLowerCase() === busqueda.product.toLowerCase()
    );

    if (!product) {
        // Lanza 401 si el producto no existe en ninguna fuente.
        throw new UnauthorizedException("Este producto no existe");
    }

    // 3. ENCONTRAR el ÍNDICE de la ASOCIACIÓN EXACTA (Usando el nombre real del usuario)
    const productUserIndex = this.producto_usuario.findIndex((pro) =>
        // Debe coincidir el nombre del usuario ENCONTRADO (user.name) 
        // con el campo 'usuario' de la asociación
        pro.usuario.toLowerCase() === user.name.toLowerCase() &&
        
        // Debe coincidir el nombre del producto ENVIADO (busqueda.product) 
        // con el campo 'producto' de la asociación
        pro.producto.toLowerCase() === busqueda.product.toLowerCase()
    );

    if (productUserIndex === -1) {
        // Lanza 404 si la combinación de usuario y producto no está asociada.
        throw new NotFoundException(`La asociación entre ${user.name} y ${product.name} no fue encontrada.`);
    }

    // 4. ELIMINAR la asociación encontrada
    this.producto_usuario.splice(productUserIndex, 1);
    
    // 5. Devolver éxito
    return { delete: true, mensaje: `Asociación eliminada: ${user.name} - ${product.name}` };
}

}