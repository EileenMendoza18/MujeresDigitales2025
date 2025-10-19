import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
// import { ProductoUsuarioModule } from './modules/producto-usuario/producto-usuario.module';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  // IMPORTS: Configuración global y módulos de funcionalidad
  imports: [
    // 1. Configuración de Variables de Entorno
    // Carga las variables de entorno y las hace accesibles globalmente.
    ConfigModule.forRoot({isGlobal:true}),
    // 2. Configuración de la Conexión a la Base de Datos (TypeORM)
    // Configura la conexión a MySQL de manera asíncrona, usando ConfigService para
    // obtener los parámetros (host, port, credentials, database) de las variables de entorno.
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
        autoLoadEntities: true,// Carga automáticamente las entidades
        synchronize: false, // Importante: 'false' en producción. Controla el esquema de la DB mediante migraciones.

      }),
    }),
    // 3. Módulos de la Aplicación
    // Integración de los módulos de funcionalidad creados para la aplicación.
    UsersModule, 
    ProductsModule, 
    // ProductoUsuarioModule, 
    AuthModule
  ],
    controllers: [
      AppController],
    providers: [
      AppService],
})
export class AppModule {}
