import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throwError } from 'rxjs';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UpdateUserDTO } from 'src/dto/update-user.dto';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

/**
 * @class UsersService
 * * Servicio que contiene la lógica de negocio para las operaciones CRUD de la entidad User.
 */
@Injectable()
export class UsersService {

    constructor(

        // Inyección del repositorio de TypeORM para la entidad User
        @InjectRepository(User)
        private usersRepo:Repository<User>

    ){}
    /**
     * @method findAll
     * Obtiene todos los registros de usuarios.
     * @returns Promise<User[]> Lista de todos los usuarios.
     */
    findAll(){
        return this.usersRepo.find();
    }  
    
    /**
     * @method findOne
     * Obtiene un usuario por su ID.
     * @param id ID numérico para reconocer al usuario.
     * @returns Promise<User> El usuario encontrado.
     * @throws NotFoundException si el usuario no es encontrado.
     */
    async findOne(id:number){

        const userFind=await this.usersRepo.findOne({where: {id}})
        if (!userFind) throw new NotFoundException(`Este usuario no ha sido encontrado, intentelo nuevamente`)
        return userFind
    
    }
    /**
     * @method create
     * Crea y guarda un nuevo usuario (sin hashear la contraseña aquí, se asume en otra parte del flujo).
     * NOTA: La lógica de registro de `AuthService` es la que hashea la contraseña.
     * @param newUser DTO de creación de usuario.
     * @returns Promise<User> El usuario guardado.
     */
    create(newUser: CreateUserDTO){
        const userCreated = this.usersRepo.create(newUser);
        return this.usersRepo.save(userCreated);
    }
    /**
     * @method update
     * Actualiza la información de un usuario, incluyendo el hasheo de la nueva contraseña.
     * @param id ID del usuario a actualizar.
     * @param updateUser DTO con los datos a actualizar.
     * @returns Promise<User> El usuario actualizado.
     */
    async update(id:number, updateUser: UpdateUserDTO){
        // Hashea la nueva contraseña
        const hashedPassword = await bcrypt.hash(updateUser.password, 10)
        // Actualiza el registro con los datos y la nueva contraseña hasheada
        await this.usersRepo.update(id, {...updateUser, password: hashedPassword});
        // Devuelve el usuario actualizado
        return this.findOne(id);
    }
    /**
     * @method remove
     * Elimina físicamente un usuario de la base de datos (Hard Delete).
     * @param id ID del usuario a eliminar.
     * @returns Mensaje de éxito.
     * @throws NotFoundException si el usuario no existe.
     */
    async remove(id: number) {

        const result = await this.usersRepo.delete(id);
        // Verifica si alguna fila fue afectada
        if (result.affected===0)  throw new NotFoundException(`Usuario con ${id} no encontrado`)
        return{delete:`El usuario con id ${id} fue eliminado correctamente`}
    }

}
