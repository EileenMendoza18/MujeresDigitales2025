import { Module } from '@nestjs/common';
import { ProductoUsuarioController } from './producto-usuario.controller';
import { ProductoUsuarioService } from './producto-usuario.service';

@Module({
  controllers: [ProductoUsuarioController],
  providers: [ProductoUsuarioService]
})
export class ProductoUsuarioModule {}
