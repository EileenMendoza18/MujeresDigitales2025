import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { searchProductsUsersDTO } from 'src/dto/searchProductsUsers.dto';
import { IProducts, IUser } from 'src/interfaces';
import { IUProductsUsers } from 'src/interfaces/IUProductsUsers';
import { ICreateUsersProducts } from 'src/interfaces/ICreateUsersProducts';

@Injectable()
export class ProductoUsuarioService {

    private users: IUser []=[
            {id: 1, name: 'Laura', email: 'laura@gmail.com', password: 'laura123', age: 18},
            {id: 2, name: 'Jhonatan', email: 'jhonatan@gmail.com',  password: 'jhonatan123' },
            {id: 3, name: 'Lucia', email: 'lucia@gmail.com', password: 'lucia123', age: 18},
            {id: 4, name: 'Wendy', email: 'wendy@gmail.com',  password: 'wendy123' }
        ]

    private products:IProducts[]=[
    
            {id: 1, name: "Bizcocho de fresa", description: "Bizcocho dulce a base de salsa de fresa", price: 5000, category: "pasteleria", marca:"Twinkies" },
            {id: 2, name: "Galletas de chocolate", description: "Galletas dulces a base de salsa de chocolate", price: 3000, category: "pasteleria", marca:"Oreo" },
            {id: 3, name: "Pan navideño", description: "Pan navideño a base de harina y frutillas", price: 4000, category: "panaderia", marca:"Bimbo" },
            {id: 4, name: "Pan de queso", description: "Pan tradicional a base de queso", price: 3500, category: "panaderia", marca:"Yupi" },
            {id: 5, name: "Muffin de fresas", description: "Muffin dulce a base de fresas y chocolate negro", price: 4500, category: "pasteleria", marca:"Dunkin" },
    ]

    private producto_usuario: IUProductsUsers[]=
    [   //En caso de utilizar el @Query:  http://localhost:4000/producto-usuario?usuario=laura@gmail.com&product=Bizcocho de fresa
        {id:1, usuario: 'Laura', producto: 'Bizcocho de fresa'},
        //En caso de utilizar el @Query: http://localhost:4000/producto-usuario?usuario=jhonatan@gmail.com&product=Pan de queso
        {id: 2, usuario: 'Jhonatan', producto: 'Pan de queso'},
    ]

    // constructor (
    //     private readonly usersService:UsersService,
    //     private readonly productsService:ProductsService
    // ){}


    productsUsersAll(): IUProductsUsers[]{
        return this.producto_usuario;
    }

    // busqueda individual por id, usuario o producto- TERMINADO
    productsUsersOne(busqueda:string): IUProductsUsers[]{
    
            const valorNormalizado= String((busqueda.trim())).toLowerCase();
    
            const productUserFind= this.producto_usuario.filter((productUser) =>
            
                String(productUser.id).toLowerCase()===valorNormalizado ||
                String(productUser.usuario).toLowerCase()===valorNormalizado ||
                String(productUser.producto).toLowerCase()===valorNormalizado
            );
            if (!productUserFind.length) {
                throw new NotFoundException(`Busqueda no encontrada, intente nuevamente`);
            }
            return productUserFind;
        }


    
    create(dto:searchProductsUsersDTO):  IUProductsUsers {
         //en el caso de poder enlazar los usuarios del modulo de usuarios = [...this.usersService.findAll(), ...this.users];
              
            console.log("DTO recibido en create:", dto, JSON.stringify(dto));


        const busquedaUsuarioNormalizada = dto.usuario.trim().toLowerCase();


        const user = this.users.find(
        // ⭐ Buscamos el valor de entrada (productUserAssociation.usuario)
        u => u.name.toLowerCase() === busquedaUsuarioNormalizada || 
             u.email.toLowerCase() === busquedaUsuarioNormalizada
    );


        if (!user) {
            throw new NotFoundException(`Usuario "${dto.usuario}" no encontrado, ingrese un usuario válido.`);
        }


        const product = this.products.find(
            p => p.name.toLowerCase() === dto.producto.toLowerCase()
        );

        if (!product) {
            // Se usa NotFoundException porque la entidad producto no se encontró.
            throw new NotFoundException(`Producto "${ dto.producto}" no encontrado.`);
        }

        // Normalizar el nombre del usuario para el almacenamiento si se buscó por email

        const newId=this.producto_usuario.length >0
            ? this.producto_usuario[this.producto_usuario.length -1].id + 1
            : 1;
            
        const newProductUser: IUProductsUsers={
    
                id:newId,
                usuario: user.name,
                producto: product.name,
            }
    
            this.producto_usuario.push(newProductUser);
            return newProductUser;
    }


    // update(busqueda:searchProductsUsersDTO, newProductUser:Omit<IUProductsUsers, 'id'>): IUProductsUsers{
    
        
    //     const allUsers=[...this.usersService.findAll(), ...this.users];
    //     const allProducts = [...this.productsService.productsAll(), ...this.products];

    //     const user = allUsers.find(u=>u.email==busqueda.usuario)
        
    //         if(!user){
        
    //             throw new NotFoundException("Este usuario no existe");
        
    //         }

    //         const product=allProducts.find(p=>p.name==busqueda.producto
    //         );

    //         if(!product){

    //             throw new NotFoundException(`Este producto "${busqueda.producto}" no existe`);
    //         }

    //         const productOriginal = allProducts.find(p => p.name == busqueda.producto);
    //         if (!productOriginal) {
    //             throw new NotFoundException(`El producto original "${busqueda.producto}" no existe.`);
    //         }

    //         if (newProductUser.producto) {
    //             const productNuevo = allProducts.find(p => p.name == newProductUser.producto);
    //         if (!productNuevo) {
    //             throw new NotFoundException(`El nuevo producto "${newProductUser.producto}" no existe y no puede ser asignado.`);
    //             }
    //         }
            

    //         const productUser= this.producto_usuario.find((pro) =>
        
    //                 pro.usuario.toLowerCase() === user.name.toLowerCase() &&
    //                 pro.producto.toLowerCase() === busqueda.producto.toLowerCase()
    //             );

    //             if (!productUser) {
    //                 throw new NotFoundException(`Producto del usuario no encontrado, intente nuevamente`);
    //             }
    //             Object.assign(productUser,newProductUser);
    //             return productUser;

    //             // return{ usuario_producto: `El usuario ${user.name} con email ${user.email} tiene el producto ${product.name} con precio de ${product.price}`,
                    
    //             //     user: {id:user.id, name:user.name, email:user.email},
    //             //     accesToken: `fake-token-${user.id}-${Date.now()}`}
                    
            

    
        

    // }
    
    // remove(busqueda:searchProductsUsersDTO) {
        

        
    // constructor (private readonly usersService:UsersService,private readonly productsService:ProductsService){}

    // Search(search:searchProductsUsersDTO){

        
    //     const users=this.usersService.findAll();
    //     const user = users.find(user=>
    //         user.email==search.email)
        
    //         if(!user){
        
    //             throw new UnauthorizedException("Este usuario no existe");
        
    //         } else {
    //             const products=this.productsService.productsAll();
    //             const product=products.find(product=>
    //                 product.name==search.product
    //             )

    //             if(!product){

    //                 throw new UnauthorizedException("Este producto no existe");
    //             }



    //             return{ usuario_producto: `El usuario ${user.name} con email ${user.email} tiene el producto ${product.name} con precio de ${product.price}`,
                    
    //                 user: {id:user.id, name:user.name, email:user.email},
    //                 accesToken: `fake-token-${user.id}-${Date.now()}`}
                    
    //         }

    // }

} // }
