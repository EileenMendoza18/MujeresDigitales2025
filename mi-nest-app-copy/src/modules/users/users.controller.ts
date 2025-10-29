import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UpdateUserDTO } from 'src/dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesEnum } from 'src/entities/user.entity';
import {  ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
/**
 * @class UsersController
 * * Controlador que gestiona las operaciones CRUD para la entidad User.
 * Ruta base: `/users`
 * Protegido globalmente por `JwtAuthGuard` y `RolesGuard` a nivel de clase.
 * Las rutas requieren el rol de 'admin'.
 */

@ApiTags('Users')
@ApiBearerAuth()
@Controller('/api/users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    // Inyección de dependencia del servicio de usuarios
    constructor(private readonly usersService: UsersService){}  

    /**
     * Endpoint para obtener todos los usuarios.
     * Ruta: `GET /users`
     * Requiere: Rol de 'admin'.
     * @returns Lista de todos los usuarios.
     */
    @Get()
    @ApiOperation({ summary: 'Obtener todos los usuarios' })
    @ApiResponse({ status: 200, description: 'Lista de usuarios retornados desde BD' })
    @Roles(RolesEnum.ADMIN)
    findAll(){
        return this.usersService.findAll();
    }

    /**
     * Endpoint para obtener un usuario por su ID.
     * Ruta: `GET /users/:id`
     * Requiere: Rol de 'admin'.
     * @param id ID del usuario.
     * @returns El usuario encontrado.
     */
    @Get(`:id`)
    @ApiOperation({ summary: 'Obtener el usuario por ID' })
    @ApiResponse({ status: 200, description: 'Usuario encontrado desde BD' })
    @ApiResponse({ status: 404, description: 'Usuario NO encontrado desde BD' })
    @Roles(RolesEnum.ADMIN)
    findOne(@Param('id', ParseIntPipe) id:number){

        return this.usersService.findOne(id);
    }

    /**
     * Endpoint para crear un nuevo usuario.
     * Ruta: `POST /users`
     * Requiere: Rol de 'admin'.
     * @param body DTO con los datos del nuevo usuario.
     * @returns El usuario creado.
     */
    @Post()
    @ApiOperation({ summary: 'Crear un nuevo usuario' })
    @ApiResponse({ status: 201, description: 'Usuario creado exitosamente en BD' })
    @Roles(RolesEnum.ADMIN)
    create(@Body() body : CreateUserDTO){
        return this.usersService.create(body);
    }

    /**
     * Endpoint para actualizar un usuario por su ID.
     * Ruta: `PUT /users/:id`
     * Requiere: Rol de 'admin'.
     * @param id ID del usuario a actualizar.
     * @param body DTO con los datos a actualizar (incluye rol).
     * @returns El usuario actualizado.
     */
    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un usuario existente' })
    @ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente en BD' })
    @Roles(RolesEnum.ADMIN)
    update(@Param('id', ParseIntPipe) id:number, @Body() body: UpdateUserDTO){
        return this.usersService.update(id,body)
    }

    /**
     * Endpoint para eliminar un usuario por su ID (eliminación física).
     * Ruta: `DELETE /users/:id`
     * Requiere: Rol de 'admin'.
     * @param id ID del usuario a eliminar.
     * @returns Mensaje de confirmación.
     */
    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un usuario' })
    @ApiResponse({ status: 200, description: 'Usuario eliminado de BD' })
    @ApiResponse({ status: 404, description: 'Usuario NO encontrado desde BD' })
    @Roles(RolesEnum.ADMIN)
    remove(@Param('id', ParseIntPipe) id:number){
        return this.usersService.remove(id);
    }
}
