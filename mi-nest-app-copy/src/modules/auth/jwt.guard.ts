import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * @class JwtAuthGuard
 * @extends AuthGuard('jwt')
 * * Un Guard de autenticación que utiliza la estrategia 'jwt' de Passport.
 * Protege las rutas asegurando que haya un token JWT válido en el encabezado.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard( 'jwt'){
    
}