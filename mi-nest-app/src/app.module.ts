import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ProductoService } from './modules/producto/producto.service';
import { ProductoController } from './modules/producto/producto.controller';
import { ProductoModule } from './modules/producto/producto.module';
import { ProductoUsuarioModule } from './modules/producto-usuario/producto-usuario.module';

@Module({
  imports: [UsersModule, ProductoModule, ProductoUsuarioModule],
  controllers: [AppController, ProductoController],
  providers: [AppService, ProductoService],
})
export class AppModule {}
