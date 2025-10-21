import { HttpException, HttpStatus } from "@nestjs/common";

/**
 * @class BussionesException
 * @extends HttpException
 * * Excepción personalizada utilizada para errores de lógica de negocio o validación.
 * Siempre retorna un código de estado HTTP 400 (BAD_REQUEST) y un formato de error estándar.
 */

export class BussionesException extends HttpException {
    /**
     * Constructor de la excepción.
     * @param message Mensaje descriptivo del error de negocio.
     */
    constructor(message: string ) {
        // Llama al constructor de HttpException con un objeto de respuesta y el estado HTTP.
        super({error: 'BusinessError', message}, HttpStatus.BAD_REQUEST)
    }
}