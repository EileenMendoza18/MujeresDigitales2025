import { Module } from '@nestjs/common';
import { ProductoUsuarioController } from './producto-usuario.controller';
import { ProductoUsuarioService } from './producto-usuario.service';
import { UsersModule } from '../users/users.module';     
import { ProductsModule } from '../products/products.module'; 

@Module({
  imports: [UsersModule, ProductsModule],
  controllers: [ProductoUsuarioController],
  providers: [ProductoUsuarioService]
})
export class ProductoUsuarioModule {}
