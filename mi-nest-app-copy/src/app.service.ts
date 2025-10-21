import { Injectable } from '@nestjs/common';

/**
 * @class AppService
 * * Servicio que contiene la lógica de negocio para las rutas de aplicación raíz (simples).
 */
@Injectable()
export class AppService {
  /**
     * @method getHello
     * @returns Mensaje de saludo.
     */
  getHello(): string {
    return 'Hello World!';
  }
  /**
     * @method getStatus
     * @returns Objeto con el estado de la aplicación.
     */
  getStatus(): {status:string , fecha: Date | string} {
    return {status:`ok`, fecha: new Date().toISOString()}
}}
