import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
/**
 * @class AppController
 * * Controlador principal que maneja las rutas a nivel raíz de la aplicación.
 */
@Controller()
export class AppController {
  // Inyección de dependencia del servicio de aplicación
  constructor(private readonly appService: AppService) {}

  /**
     * Endpoint de ruta localhost:3000/ que responde un saludo básico.
     * Ruta: `GET /`
     * @returns Mensaje "Hello World!".
     */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

    /**
     * Endpoint de ruta localhost:3000/status que responde el estado de la aplicación.
     * Ruta: `GET /status`
     * @returns Objeto con el estado y la fecha actual.
     */  @Get('status')
  getStatus(): {status:string , fecha: Date | string} {
    return this.appService.getStatus();
  }
}
