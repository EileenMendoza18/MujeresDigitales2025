import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { timestamp } from "rxjs";

/**
 * @class AllExceptionsFilter
 * @implements ExceptionFilter
 * * Filtro global de excepciones que captura todas las excepciones no manejadas
 * y las formatea en una respuesta JSON uniforme.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter{
    /**
     * Método principal del filtro de excepciones.
     * @param exception La excepción que ha sido lanzada (puede ser de cualquier tipo).
     * @param host El ArgumentsHost que proporciona acceso al contexto de ejecución (Request/Response).
     */
    catch(exception: unknown, host: ArgumentsHost) {
        // Obtiene el contexto HTTP (request/response) de la ejecución actual.
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        // Determina el código de estado HTTP.
        // Si es una HttpException, usa su estado; de lo contrario, usa 500 (Internal Server Error).
        const status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
        // Determina el cuerpo de la respuesta de la excepción.
        // Si es una HttpException, usa su respuesta; de lo contrario, usa la excepción cruda.
        const message = exception instanceof HttpException
            ? exception.getResponse()
            : exception;

        // Envía la respuesta JSON con el formato estandarizado
        response.status(status).json({
            success: false,
            statusCode: status,
            path: request.url,
            timestamp: new Date().toISOString(),
            message

        })

    }
    

}