import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles.decorator";
import { BussionesException } from "src/common/exceptions/bussiness.exception";

/**
 * @class RolesGuard
 * @implements CanActivate
 * * Guard de autorización que verifica si el rol del usuario autenticado
 * tiene permiso para acceder a una ruta, basado en el decorador `@Roles()`.
 */
@Injectable()
export class RolesGuard implements CanActivate {
    // Inyección de Reflector para leer metadatos (el decorador @Roles)
    constructor (private reflector: Reflector) {}
    /**
     * Lógica de activación del guard.
     * @param context Contexto de ejecución para acceder a los metadatos y la petición.
     * @returns `true` si el acceso es permitido, lanza una excepción en caso contrario.
     */
    canActivate(context: ExecutionContext): boolean {
        // Obtiene los roles requeridos de los metadatos de la clase o el método
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY,[
            context.getHandler(),
            context.getClass(),
        ])

        // Si no hay roles requeridos, permite el acceso
        if (!requiredRoles) return true;

        // Obtiene el objeto 'user' de la petición (inyectado por el JwtStrategy)
        const {user} = context.switchToHttp().getRequest();

        // Si no hay usuario (lo cual debería ser cubierto por JwtAuthGuard), lanza Forbidden
        if (!user) throw new ForbiddenException('Usuario no autenticado')
    
        // Verifica si el rol del usuario está incluido en la lista de roles requeridos
        if (!requiredRoles.includes(user.role)){
            // Lanza una excepción de negocio si el rol no tiene permisos
            throw new BussionesException('Su tipo de rol no tiene permisos para acceder a esta ruta ')
        }

        return true;
    }
}