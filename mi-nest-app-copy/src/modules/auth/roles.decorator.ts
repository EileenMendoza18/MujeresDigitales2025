import { SetMetadata } from "@nestjs/common";

/**
 * Clave de metadato utilizada para almacenar los roles requeridos.
 */
export const ROLES_KEY = 'roles';
/**
 * @function Roles
 * * Decorador personalizado para establecer metadatos de los roles requeridos
 * en un controlador o manejador de ruta. Utilizado por `RolesGuard`.
 * @param roles Array de strings con los roles permitidos (e.g., 'admin', 'user').
 * @returns Decorador de método/clase.
 */
export const Roles=(...roles: string[]) => SetMetadata(ROLES_KEY,roles)