import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from 'src/dto/login.dto';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/dto/create-user.dto';

@Controller('auth')
export class AuthController {

    constructor (private readonly authService:AuthService){}
    @Post('register')
    register(@Body() data: CreateUserDTO){
        return this.authService.register(data);
    }

    @Post('login')
    async login(@Body() data: LoginDTO){
        return this.authService.login(data);
    }
}
