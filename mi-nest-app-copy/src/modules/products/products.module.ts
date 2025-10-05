import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService] // Exporta ProductsService para que otros módulos puedan usarlo
})
export class ProductsModule {}
