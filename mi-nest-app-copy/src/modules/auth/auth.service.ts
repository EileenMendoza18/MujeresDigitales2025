import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from 'src/dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { runInThisContext } from 'vm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor (
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private jwtService: JwtService,
    ) {}

    async register(data:CreateUserDTO ){
        const hashedPassword= await bcrypt.hash(data.password,10);
        const userCreated = this.userRepo.create({...data, password: hashedPassword});
        await this.userRepo.save(userCreated);
        return {message: 'Usuario registrado con exito', user: {id:userCreated.id, email: userCreated.email}}
    }

    async login(data:LoginDTO){

        const user = await this.userRepo.findOne({where: {email:data.email}})

        if(!user){

            throw new UnauthorizedException("Las credenciales son invalidas");

        }

        const isPaddwordValid= await bcrypt.compare(data.password, user.password)

        if (!isPaddwordValid){

            throw new UnauthorizedException ("Las credenciales son invalidas");

        }

        const payloadToken = {sub:user.id, name:user.name, email:user.email, role: user.role };
        const token = await this.jwtService.signAsync(payloadToken)
        
        return {

            accesToken: token

        }

    }

    

}
