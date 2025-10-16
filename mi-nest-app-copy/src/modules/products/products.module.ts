import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { ParseUpperTrimPipe } from 'src/common/pipes/parse-uppertrim.pipe';

// Módulo de NestJS que encapsula todas las funcionalidades relacionadas con la gestión de productos.
// Este módulo configura la inyección de dependencias y la conexión de TypeORM para la entidad 'Product'.

@Module({
  // IMPORTS: Módulos requeridos por ProductsModule
  imports:[
     // Conecta la entidad Product con el módulo actual (TypeOrmModule.forFeature).
    // Esto hace que el ProductRepository esté disponible para inyección en el ProductsService.
    TypeOrmModule.forFeature([Product])], 
  // CONTROLLERS: Capa de entrada de peticiones
  // Lista de controladores que manejan las rutas HTTP para este módulo.
  controllers: [ProductsController],
  // PROVIDERS: Servicios y lógica de negocio
  // Componentes que realizan la lógica de negocio y se pueden inyectar en otros (controladores, otros servicios).
  providers: [ProductsService, ParseUpperTrimPipe],
  // EXPORTS: Componentes accesibles desde otros módulos
  // Exporta ProductsService para que otros módulos (como el ApppModule o un módulo de Órdenes)
  // puedan inyectar y utilizar los métodos de lógica de negocio de Product.
  exports: [ProductsService] 
})
export class ProductsModule {}
