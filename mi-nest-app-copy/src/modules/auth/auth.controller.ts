import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { LoginDTO } from 'src/dto/login.dto';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { JwtAuthGuard } from './jwt.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * @class AuthController
 * * Controlador que maneja las rutas relacionadas con la autenticación de usuarios.
 * Ruta base: `/auth`
 */
@ApiTags('Auth')
@Controller('/api/auth')
export class AuthController {

    // Inyección de dependencia del servicio de autenticación
    constructor (private readonly authService:AuthService){}
    /**
     * Endpoint para el registro de nuevos usuarios.
     * Ruta: `POST /auth/register`
     * @param data DTO con los datos del nuevo usuario.
     * @returns Resultado del registro.
     */
    @Post('register')
    @ApiOperation({ summary: 'Registra un usuario' })
    @ApiResponse({ status: 200, description: 'Usuario registrado con exito en BD y nos devuelve el usuario' })
    register(@Body() data: CreateUserDTO){
        return this.authService.register(data);
    }

    /**
     * Endpoint para la autenticación y generación de JWT.
     * Ruta: `POST /auth/login`
     * @param data DTO con las credenciales de login (email y password).
     * @returns Objeto con el token de acceso (`accesToken`).
     */
    @Post('login')
    @ApiOperation({ summary: 'Inicia la sesion de un usuario' })
    @ApiResponse({ status: 200, description: 'Usuario logueado con exito y devuelve el JWT Token' })
    @ApiResponse({ status: 401, description: 'Credenciales invalidas' })
    async login(@Body() data: LoginDTO){
        return this.authService.login(data);
    }
    /**
     * Endpoint para obtener el perfil del usuario autenticado.
     * Requiere JWT válido (protegido por `JwtAuthGuard`).
     * Ruta: `GET /auth/profile`
     * @param req Objeto de la petición que contiene la información del usuario (inyectada por el guard/strategy).
     * @returns Datos del usuario autenticado.
     */
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    @ApiOperation({ summary: 'Devuelve la informacion del usuario' })
    @ApiResponse({ status: 200, description: 'Informacion del usuario' })
    getProfile(@Request() req){
        return req.user;
    }
}
