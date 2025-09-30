import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /*Endpoint de ruta localhost:3000/status que me responde hola mundo*/
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /*Endpoint de ruta localhost:3000/status que me responde el estado de mi aplicacion*/ 
  @Get('status')
  getStatus(): {status:string , fecha: Date | string} {
    return this.appService.getStatus();
  }
}
