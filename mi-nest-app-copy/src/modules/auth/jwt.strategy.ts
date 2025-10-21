import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt'

/**
 * @class JwtStrategy
 * @extends PassportStrategy(Strategy, 'jwt')
 * * Estrategia de Passport para validar tokens JWT.
 * Es responsable de extraer el token, verificar la firma y validar el payload.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    /**
     * Constructor que configura la estrategia de JWT.
     * @param configService Servicio para acceder a variables de entorno.
     */
    constructor(private configService: ConfigService){
        super({
            // Extrae el JWT del encabezado 'Authorization' como 'Bearer Token'
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // Permite que el token caduque (no lo ignora)
            ignoreExpiration: false,
            // Clave secreta para verificar la firma del token
            // secretOrKey: process.env.JWT_SECRET_KEY
            secretOrKey: configService.get<string>('JWT_SECRET_KEY')
        })
    }

    /**
     * Método de validación del payload del JWT.
     * Se ejecuta después de la verificación del token.
     * @param payload El objeto decodificado del JWT.
     * @returns Un objeto que será adjuntado a `req.user`.
     */
    async validate(payload: any){
        return {
            userId: payload.sub, email:payload.email, role: payload.role
        }
    }
}