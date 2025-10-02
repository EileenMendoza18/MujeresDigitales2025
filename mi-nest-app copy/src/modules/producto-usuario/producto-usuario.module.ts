import { Module } from '@nestjs/common';
import { ProductoUsuarioController } from './producto-usuario.controller';
import { ProductoUsuarioService } from './producto-usuario.service';
import { UsersModule } from '../users/users.module';     // Asegúrate de que exista y exporte UsersService
import { ProductsModule } from '../products/products.module'; // Asegúrate de que exista y exporte ProductsService

@Module({
  imports: [UsersModule, ProductsModule],
  controllers: [ProductoUsuarioController],
  providers: [ProductoUsuarioService]
})
export class ProductoUsuarioModule {}
