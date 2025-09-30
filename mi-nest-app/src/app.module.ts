import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ProductoUsuarioModule } from './modules/producto-usuario/producto-usuario.module';
import { ProductsModule } from './modules/products/products.module';
import { ProductsController } from './modules/products/products.controller';
import { ProductsService } from './modules/products/products.service';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),UsersModule, ProductsModule, ProductoUsuarioModule, ProductsModule],
  controllers: [AppController, ProductsController, ProductsController],
  providers: [AppService, ProductsService],
})
export class AppModule {}
