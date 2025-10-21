import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { JwtStrategy } from './jwt.strategy';

/**
 * @class AuthModule
 * * Módulo encargado de la lógica de autenticación (registro, login, JWT).
 */
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),// Configuración global de entorno
    TypeOrmModule.forFeature([User]),// Registro del repositorio de la entidad User
    PassportModule.register({defaultStrategy: 'jwt'}),// Configuración de Passport para usar JWT por defecto
    /**
     * Configuración asíncrona de JwtModule para obtener secretos y opciones
     * de las variables de entorno inyectadas por ConfigService.
     */
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(config:ConfigService)=>({
        secret: config.get<string>('JWT_SECRET_KEY'),// Clave secreta para firmar el token
        // Opciones de firma, obtiene tiempo de expiración de entorno o usa '1h' por defecto
        signOptions: { expiresIn: config.get<string>('JWT_EXPIRES_IN' as string) || '1h' as any}

    //     secret: config.get<string>('JWT_SECRET_KEY'),
    // signOptions: { expiresIn: ((process.env.JWT_EXPIRES_IN as string) || '1h') as any }
      })
    })
    
  ],
  providers: [AuthService, UsersService,JwtStrategy ],// Servicios y estrategias de autenticación
  controllers: [AuthController ]// Controlador de autenticación
})
export class AuthModule {}
