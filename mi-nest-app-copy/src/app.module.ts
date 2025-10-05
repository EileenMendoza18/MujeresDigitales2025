import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ProductoUsuarioModule } from './modules/producto-usuario/producto-usuario.module';
import { ProductsModule } from './modules/products/products.module';
import { ProductsController } from './modules/products/products.controller';
import { ProductsService } from './modules/products/products.service';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(config:ConfigService)=>({
        type:'mysql',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    UsersModule, 
    ProductsModule, 
    ProductoUsuarioModule, 
    ProductsModule, 
    AuthModule],
  controllers: [
    AppController,
    ProductsController, 
    ProductsController],
  providers: [
    AppService, 
    ProductsService],
})
export class AppModule {}
