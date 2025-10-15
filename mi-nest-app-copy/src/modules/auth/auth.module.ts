import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
    secret: process.env.JWT_SECRET_KEY,
    signOptions: { expiresIn: ((process.env.JWT_EXPIRES_IN as string) || '1h') as any }
    })
    
  ],
  providers: [AuthService],
  controllers: [AuthController ]
})
export class AuthModule {}
