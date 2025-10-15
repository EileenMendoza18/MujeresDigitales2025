import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { LoginDTO } from 'src/dto/login.dto';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { JwtAuthGuard } from './jwt.guard';

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
    
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req){
        return req.user;
    }
}
