import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from 'src/dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor (private readonly authService:AuthService){}

    @Post('login')
    async login(@Body() data: LoginDTO){
        return this.authService.login(data);
    }
}
