import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getStatus(): {status:string , fecha: Date | string} {
    return {status:`ok`, fecha: new Date().toISOString()}
}}
