import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throwError } from 'rxjs';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UpdateUserDTO } from 'src/dto/update-user.dto';
import { User } from 'src/entities/user.entity';
import { IUser,IProducts } from 'src/interfaces';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {

    constructor(

        @InjectRepository(User)
        private usersRepo:Repository<User>

    ){}
    /**
     * findOne: Method to find Multipler register to user repository
     * @returns IUser[]- Multipler register
     */
    findAll(){
        return this.usersRepo.find();
    }  
    
    /**
     * findOne: Method to find unique register to user repository
     * @param id - {string} - Id for recognize user
     * @returns IUser- Unique register
     */
    
    async findOne(id:number){

        const userFind=await this.usersRepo.findOne({where: {id}})
        if (!userFind) throw new NotFoundException(`Este usuario no ha sido encontrado, intentelo nuevamente`)
        return userFind
    
    }
    create(newUser: CreateUserDTO){
        const userCreated = this.usersRepo.create(newUser);
        return this.usersRepo.save(userCreated);
    }
    async update(id:number, updateUser: UpdateUserDTO){

        await this.usersRepo.update(id, updateUser)
        return this.findOne(id);
    }
    async remove(id: number) {

        const result = await this.usersRepo.delete(id);
        if (result.affected===0)  throw new NotFoundException(`Usuario con ${id} no encontrado`)
        return{delete:`El usuario con id ${id} fue eliminado correctamente`}
    }

}
