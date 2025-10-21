import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

/**
 * @class UsersModule
 * * Módulo encargado de la gestión de usuarios.
 */
@Module({
  imports:[TypeOrmModule.forFeature([User])],// Registra el repositorio de User 
  controllers: [UsersController],// Controlador de usuarios
  providers: [UsersService],// Servicio de lógica de negocio de usuarios
  exports: [UsersService] // Exporta UsersService para que otros módulos puedan usarlo
})
export class UsersModule {} 
