import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from 'src/dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { runInThisContext } from 'vm';
import { JwtService } from '@nestjs/jwt';

/**
 * @class AuthService
 * * Servicio que contiene la lógica de negocio para el registro y login de usuarios.
 */
@Injectable()
export class AuthService {

    constructor (
        // Inyección del repositorio de TypeORM para la entidad User
        @InjectRepository(User)
        private userRepo: Repository<User>,
        // Inyección del servicio de JWT de NestJS
        private jwtService: JwtService,
    ) {}

    /**
     * Registra un nuevo usuario en la base de datos.
     * 1. Hashea la contraseña.
     * 2. Crea y guarda el nuevo usuario.
     * @param data DTO de creación de usuario.
     * @returns Mensaje de éxito y datos parciales del usuario.
     */
    async register(data:CreateUserDTO ){
        // Hashea la contraseña con un 'salt' de 10 rondas
        const hashedPassword= await bcrypt.hash(data.password,10);
        // Crea la entidad en memoria con la contraseña hasheada
        const userCreated = this.userRepo.create({...data, password: hashedPassword});
        // Guarda la entidad en la base de datos
        await this.userRepo.save(userCreated);
        return {message: 'Usuario registrado con exito', user: {id:userCreated.id, email: userCreated.email}}
    }

    /**
     * Autentica un usuario y genera un token JWT.
     * 1. Busca el usuario por email.
     * 2. Compara la contraseña hasheada.
     * 3. Genera el JWT si las credenciales son válidas.
     * @param data DTO de login.
     * @returns Objeto con el token de acceso.
     * @throws UnauthorizedException si las credenciales son inválidas.
     */
    async login(data:LoginDTO){
        // Busca el usuario por email
        const user = await this.userRepo.findOne({where: {email:data.email}})

        // Verifica si el usuario existe
        if(!user){

            throw new UnauthorizedException("Las credenciales son invalidas");

        }

        // Compara la contraseña proporcionada con el hash almacenado
        const isPaddwordValid= await bcrypt.compare(data.password, user.password)

        // Verifica si la contraseña es válida
        if (!isPaddwordValid){

            throw new UnauthorizedException ("Las credenciales son invalidas");

        }

        // Define el payload para el token JWT
        const payloadToken = {sub:user.id, name:user.name, email:user.email, role: user.role };
        // Genera el token asíncronamente
        const token = await this.jwtService.signAsync(payloadToken)
        
        return {

            accesToken: token

        }

    }

    

}
